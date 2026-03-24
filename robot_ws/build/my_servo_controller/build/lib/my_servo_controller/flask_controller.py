#!/home/rasp/Desktop/ROS2/.venv/bin/python3

import rclpy
from rclpy.node import Node
from adafruit_servokit import ServoKit
import time
import threading
from rosbridge_msgs.msg import ConnectedClients
from servo_interfaces.msg import SetMode, SetPwm
from std_msgs.msg import Float64, Bool
import math
from flask import Flask, request, jsonify

# --- FLASK API SETUP ---
app = Flask(__name__)
global_ros_node = None

@app.route('/api/angles', methods=['GET'])
def get_angles():
    if global_ros_node is None:
        return jsonify({"error": "ROS 2 not running"}), 500
    
    # Intelligently return either the simulation angles or the physical angles
    current = global_ros_node.current_angles_sim if global_ros_node.sim_ac else global_ros_node.current_angles
    return jsonify({"status": "success", "angles": current})

@app.route('/api/mode', methods=['POST'])
def set_mode_api():
    if global_ros_node is None:
        return jsonify({"error": "ROS 2 not running"}), 500
    
    data = request.get_json()
    if not data or 'mode' not in data:
        return jsonify({"error": "Missing 'mode' in JSON"}), 400
    
    target_mode = int(data['mode'])
    global_ros_node.trigger_mode_from_api(target_mode)
    
    return jsonify({"status": "success", "message": f"Mode {target_mode} activated!"})
# -----------------------


MOTOR_COUNT = 12
MOTOR_ANGLE_LIMITS = [[0, 180], [0, 180], [0, 180], [0, 180], [0, 180], [0, 180], [0, 180], [0, 180], [0, 180], [0, 180], [0, 180], [0, 180]]
MOTOR_START_ANGLES = {'1': 90,  '2': 90,  '3': 90,  '4': 90,  '5': 90,  '6': 90,  '7': 90,  '8': 90,  '9': 90,  '10': 90, '11': 90, '12': 90}
MODE_ANGLES = {
    1: [10, 81, 40, 90, 90, 170, 100, 60, 80, 90, 90, 90], 
    2: [90, 90, 90, 90, 90, 20, 60, 80, 80, 90, 90, 90], 
    3: [60, 105, 60, 60, 90, 120, 75, 60, 60, 90, 90, 90],
    4: [90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90],
}

GAZEBO_JOINT_MAP = {
    0: "left_shoulder_yaw_joint",
    1: "left_shoulder_roll_joint",
    2: "left_shoulder_pitch_joint",
    3: "left_elbow_joint",
    4: "left_wrist_roll_joint",
    5: "right_shoulder_yaw_joint",
    6: "right_shoulder_roll_joint", 
    7: "right_shoulder_pitch_joint",
    8: "right_elbow_joint",
    9: "right_wrist_roll_joint",
    10: "neck_pan_joint",
    11: "neck_tilt_joint"
    }

class FlaskControllerNode(Node):
    def __init__(self):
        super().__init__('flask_controller')
        self.get_logger().info("Flask Controller has been started.")
        self.kit = ServoKit(channels=16, frequency=50)
        
        self.active_client_id = None
        self.current_angles = MOTOR_START_ANGLES.copy()
        self.current_angles_sim = MOTOR_START_ANGLES.copy()

        self.sim_ac = True

        self.active_mode = 0
        self.mode_thread = None
        self.speed = 5
        self.motor_thread = None
        self.old_motor_num = None

        self.gazebo_pubs = {}
        for motor_idx, joint_name in GAZEBO_JOINT_MAP.items():
            topic_name = f'/h1/{joint_name}/cmd_pos'
            self.gazebo_pubs[motor_idx] = self.create_publisher(Float64, topic_name, 10)

        self.client_sub = self.create_subscription(ConnectedClients, '/connected_clients', self.client_sub_callback, 10)
        self.mode_sub = self.create_subscription(SetMode, '/set_mode', self.mode_sub_callback, 10)
        self.cmd_sub = self.create_subscription(SetPwm, '/web_cmd', self.web_cmd_callback, 10)
        self.simulation_sub = self.create_subscription(Bool, '/sim_active', self.sim_active_callback, 10)

    # --- FLASK API TRIGGER METHOD ---
    def trigger_mode_from_api(self, mode_num):
        """Allows Flask to trigger robot movements safely"""
        if mode_num == 0 or mode_num == -1:
            self.get_logger().info("API triggered STOP ALL.")
            self.active_mode = 0 # Instantly breaks background loops
            return
            
        if mode_num != self.active_mode:
            self.get_logger().info(f"API triggered Mode {mode_num}")
            self.active_mode = 0
            
            # Clean up old threads safely
            if self.mode_thread is not None:
                self.mode_thread.join(timeout=0.5)
            if self.motor_thread is not None:
                self.motor_thread.join(timeout=0.5)
                
            self.active_mode = mode_num
            self.mode_thread = threading.Thread(target=self.run_mode_sequence, args=(mode_num,))
            self.mode_thread.start()
    # --------------------------------

    def sim_active_callback(self, msg):
        self.active_mode = 0
        self.sim_ac = msg.data

    def web_cmd_callback(self, msg):
        incoming_id = msg.client_id

        if self.active_client_id is None:
            self.active_client_id = incoming_id
            self.get_logger().info(f"Control locked to new client: {incoming_id}")
        elif self.active_client_id != incoming_id:
            self.get_logger().warn("Mode rejected: Robot is locked by another user.")
            return

        motor_num = msg.motor_num - 1
        target_pos = msg.target_position
        self.speed = msg.speed
            
        # Instantly break any running Mode animation to allow manual control
        if(self.active_mode != -1 or (self.active_mode == -1 and motor_num == self.old_motor_num)):
            self.active_mode = 0                
        
        self.old_motor_num = motor_num
        if self.motor_thread is not None:
            self.motor_thread.join(timeout=0.5)
        self.get_logger().info(f"Goal Accepted: Motor {motor_num +1} to {int(target_pos)}")
        self.active_mode = -1
        self.motor_thread = threading.Thread(target=self.sendMotorGoal, args=(motor_num, target_pos))
        self.motor_thread.start()

    def client_sub_callback(self, msg):
        if self.active_client_id is not None:
            if not any(client.connection_time.sec == self.active_client_id for client in msg.clients):
                self.get_logger().warn("Active client dropped. Halting robot.")
                self.active_client_id = None
                self.active_mode = 0 # This breaks any active sequence loops

    def mode_sub_callback(self, msg):
        incoming_id = msg.client_id
        new_mode = msg.mode

        if self.active_client_id is None:
            self.active_client_id = incoming_id
            self.get_logger().info(f"Control locked to new client: {incoming_id}")
        elif self.active_client_id != incoming_id:
            self.get_logger().warn("Mode rejected: Robot is locked by another user.")
            return

        if new_mode == -1 or new_mode == 0:
            self.get_logger().info("STOP command received.")
            self.active_mode = 0 # Stops the background thread
            return

        if new_mode != self.active_mode:
            self.get_logger().info(f"Switching to Mode: {new_mode}")
            self.active_mode = 0
            
            # Start the new mode in a background thread so ROS doesn't freeze
            if self.mode_thread is not None:
                self.mode_thread.join(timeout=0.5)
            if self.motor_thread is not None:
                self.motor_thread.join(timeout=0.5)
            self.active_mode = new_mode
            self.mode_thread = threading.Thread(target=self.run_mode_sequence, args=(new_mode,))
            self.mode_thread.start()
            
    def run_mode_sequence(self, mode_num):
        """This runs in the background, allowing time.sleep() without crashing ROS"""
        if mode_num not in MODE_ANGLES: return
        angles = MODE_ANGLES[mode_num]

        # 1. POSE MODE
        if mode_num == 1:
            self.speed = 5
            for i in range(11, -1, -1):
                if self.active_mode != mode_num: return # Exit if mode changed
                self.sendMotorGoal(i, angles[i])
        else:
            self.speed = 5
            for i in range(12):
                if self.active_mode != mode_num: return
                self.sendMotorGoal(i, angles[i])

        # 2. WAVE MODE (Continuous)
        if mode_num == 2:
            self.speed = 2
            wave = angles[8]
            while self.active_mode == mode_num:
                wave = 50 if wave == 80 else 80
                self.sendMotorGoal(8, wave)

        # 3. SPEAK MODE (Continuous)
        elif mode_num == 3:
            self.speed = 2
            L_elbow, L_shoulder_pitch = angles[3], angles[2]
            R_elbow, R_shoulder_pitch = angles[8], angles[7]
            neck_pitch = angles[11]
            
            while self.active_mode == mode_num:
                L_elbow = 66 if L_elbow == 60 else 60
                L_shoulder_pitch = 50 if L_shoulder_pitch == 60 else 60
                R_elbow = 66 if R_elbow == 60 else 60
                R_shoulder_pitch = 50 if R_shoulder_pitch == 60 else 60
                neck_pitch = 90 if neck_pitch == 100 else 100 
                
                target_group = {
                    3: L_elbow,
                    8: R_elbow,
                    2: L_shoulder_pitch,
                    7: R_shoulder_pitch,
                    11: neck_pitch
                }
                
                # Move them all at the exact same time!
                self.sendMultipleMotorGoals(target_group, self.speed)

    def sendMotorGoal(self, motor_num, target_angle):
        """Standard blocking function. Moves the motor in steps."""
        target_position = float(target_angle)
        if(self.sim_ac):
            current_an = float(self.current_angles_sim[str(motor_num+1)])
        else:
            current_an = float(self.current_angles[str(motor_num+1)])

        min_angle, max_angle = MOTOR_ANGLE_LIMITS[motor_num]

        if not (0 <= motor_num < MOTOR_COUNT and min_angle <= target_position <= max_angle):
            self.get_logger().error(f"Goal Aborted: Motor {motor_num} or Angle out of bounds")
            return False

        Ts = 0.05
        error = target_position - current_an
        Step = self.speed

        # Loop until it reaches target OR the mode is changed by the user
        while abs(error) > 0.1 and self.active_mode != 0:
            while abs(error) < abs(Step) and abs(Step) != 1:
                Step = int(Step / 2)
            if error*Step < 0:
                Step *= -1
            
            current_an = max(min_angle, min(max_angle, current_an + Step))
            if(self.sim_ac):
                if motor_num in self.gazebo_pubs:
                    msg = Float64()
                    msg.data = math.radians(current_an - 90.0) 
                    self.gazebo_pubs[motor_num].publish(msg)
                    self.current_angles_sim[str(motor_num+1)] = int(current_an)
            else: 
                self.kit.servo[motor_num].angle = current_an 
                self.current_angles[str(motor_num+1)] = int(current_an)

            error = target_position - current_an
            time.sleep(Ts)
            
        if(error == 0):
            if(self.active_mode == -1):
                self.old_motor_num = None
                self.get_logger().info(f"Goal Succeeded: Motor {motor_num+1} arrived at {int(target_position)}")
            return True
        else:
            self.get_logger().warn(f"Goal Abandoned: Motor {motor_num+1} to {int(target_position)}")
            return False

    def sendMultipleMotorGoals(self, targets, speed):
        """Moves multiple motors simultaneously in a single synchronized loop."""
        Ts = 0.1
        Step = self.speed
        while self.active_mode != 0:
            all_reached = True # Assume we are done until proven otherwise
            
            for motor_num, target_angle in targets.items():
                target_position = float(target_angle)
                if(self.sim_ac):
                    current_an = float(self.current_angles_sim[str(motor_num+1)])
                else:
                    current_an = float(self.current_angles[str(motor_num+1)])
                min_angle, max_angle = MOTOR_ANGLE_LIMITS[motor_num]

                # Skip if bounds are wrong
                if not (0 <= motor_num < MOTOR_COUNT and min_angle <= target_position <= max_angle):
                    continue

                error = target_position - current_an
                
                # If this specific motor hasn't reached its target yet
                if abs(error) > 0.1:
                    all_reached = False # We still have moving to do!
                    
                    Step = speed
                    while abs(error) < abs(Step) and abs(Step) != 1:
                        Step = int(Step / 2)
                    if error * Step < 0:
                        Step *= -1

                    current_an = max(min_angle, min(max_angle, current_an + Step))

                    if(self.sim_ac):
                        if motor_num in self.gazebo_pubs:
                            msg = Float64()
                            msg.data = math.radians(current_an - 90.0) 
                            self.gazebo_pubs[motor_num].publish(msg)
                            self.current_angles_sim[str(motor_num+1)] = int(current_an)
                    else: 
                        self.kit.servo[motor_num].angle = current_an 
                        self.current_angles[str(motor_num+1)] = int(current_an)

            # If NO motors triggered the (abs(error) > 0.1) check, we are finished!
            if all_reached:
                break
                
            # Wait once per group step
            time.sleep(Ts)

# --- FLASK BACKGROUND LAUNCHER ---
def run_flask_server():
    # host='0.0.0.0' makes it accessible to any device on your Wi-Fi
    app.run(host='0.0.0.0', port=5000, debug=False, use_reloader=False)
# ---------------------------------

def main(args=None):
    global global_ros_node
    rclpy.init(args=args)
    global_ros_node = FlaskControllerNode()
    
    # --- START FLASK THREAD ---
    flask_thread = threading.Thread(target=run_flask_server, daemon=True)
    flask_thread.start()
    # --------------------------
    
    try:
        rclpy.spin(global_ros_node)
    except KeyboardInterrupt:
        pass
    finally:
        global_ros_node.active_mode = 0 # Ensure thread dies on Ctrl+C
        global_ros_node.destroy_node()
        if rclpy.ok(): 
            rclpy.shutdown()

if __name__ == '__main__':
    main()