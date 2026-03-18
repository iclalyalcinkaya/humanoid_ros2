#!/usr/bin/python

import rclpy
from rclpy.node import Node
from adafruit_servokit import ServoKit
import time
import threading
from rosbridge_msgs.msg import ConnectedClients
from servo_interfaces.msg import SetMode
from std_msgs.msg import Float32MultiArray, Float64, Bool
import math

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

class ServoTopicNode(Node):
    def __init__(self):
        super().__init__('servo_topic_server')
        self.get_logger().info("Servo Topic Server has been started.")
        self.kit = ServoKit(channels=16, frequency=50)
        
        self.active_client_id = None
        self.current_angles = MOTOR_START_ANGLES.copy()
        self.current_angles_sim = MOTOR_START_ANGLES.copy()

        self.sim_ac = 1

        self.active_mode = 0
        self.mode_thread = None
        self.speed = 5

        self.gazebo_pubs = {}
        for motor_idx, joint_name in GAZEBO_JOINT_MAP.items():
            topic_name = f'/h1/{joint_name}/cmd_pos'
            self.gazebo_pubs[motor_idx] = self.create_publisher(Float64, topic_name, 10)

        self.client_sub = self.create_subscription(ConnectedClients, '/connected_clients', self.client_sub_callback, 10)
        self.mode_sub = self.create_subscription(SetMode, '/set_mode', self.mode_sub_callback, 10)
        self.cmd_sub = self.create_subscription(Float32MultiArray, '/web_cmd', self.web_cmd_callback, 10)
        self.simulation_sub = self.create_subscription(Bool, '/sim_active', self.sim_active_callback, 10)

    def sim_active_callback(self, msg):
        self.active_mode = 0
        self.sim_ac = 1 if msg.data else 0

    def web_cmd_callback(self, msg):
        if len(msg.data) >= 3:
            motor_num = int(msg.data[0]) - 1
            target_pos = float(msg.data[1])
            self.speed = float(msg.data[2])
            
            # Instantly break any running Mode animation to allow manual control
            if(self.active_mode != -1):
                self.active_mode = 0 
                self.active_mode = -1
            # Spin up a quick thread to move this specific motor
            threading.Thread(target=self.sendMotorGoal, args=(motor_num, target_pos)).start()

    def client_sub_callback(self, msg):
        # Simplified heartbeat monitor
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
            self.active_mode = new_mode
            
            # Start the new mode in a background thread so ROS doesn't freeze
            if self.mode_thread is not None:
                self.mode_thread.join(timeout=0.5)
            self.mode_thread = threading.Thread(target=self.run_mode_sequence, args=(new_mode,))
            self.mode_thread.start()

    def run_mode_sequence(self, mode_num):
        """This runs in the background, allowing time.sleep() without crashing ROS"""
        if mode_num not in MODE_ANGLES: return
        angles = MODE_ANGLES[mode_num]

        # 1. POSE / INITIALIZATION MODE
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
            neck_pitch = angles[10]
            
            while self.active_mode == mode_num:
                L_elbow = 65 if L_elbow == 60 else 60
                L_shoulder_pitch = 50 if L_shoulder_pitch == 60 else 60
                R_elbow = 65 if R_elbow == 60 else 60
                R_shoulder_pitch = 50 if R_shoulder_pitch == 60 else 60
                neck_pitch = 80 if neck_pitch == 90 else 90 
                
                # Move them sequentially (or you could multi-thread these if you want simultaneous movement)
                target_group = {
                    3: L_elbow,
                    8: R_elbow,
                    2: L_shoulder_pitch,
                    7: R_shoulder_pitch,
                    10: neck_pitch
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

        Ts = 0.1
        error = target_position - current_an
        Step = self.speed

        # Loop until it reaches target OR the mode is changed by the user
        while abs(error) > 0.1 and self.active_mode != 0:
            if abs(error) < abs(Step) and abs(Step) != 1:
                Step = int(Step / 2)
            if error < 0 and Step > 0:
                Step *= -1

            current_an = max(min_angle, min(max_angle, current_an + Step))
            if(self.sim_ac):
                if motor_num in self.gazebo_pubs:
                    msg = Float64()
                    # Convert 0-180 (UI) to -pi/2 to pi/2 (Gazebo)
                    msg.data = math.radians(current_an - 90.0) 
                    self.gazebo_pubs[motor_num].publish(msg)
                    self.current_angles_sim[str(motor_num+1)] = int(current_an)
            else: 
                self.kit.servo[motor_num].angle = current_an 
                self.current_angles[str(motor_num+1)] = int(current_an)

            error = target_position - current_an
            time.sleep(Ts) 

        self.get_logger().info(f"Goal Succeeded: Motor {motor_num+1} arrived at {int(target_position)}")
        return True

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
                    if abs(error) < abs(Step) and abs(Step) != 1:
                        Step = 1  # Take a tiny step if we are super close
                    if error < 0 and Step > 0:
                        Step *= -1

                    current_an = max(min_angle, min(max_angle, current_an + Step))

                    if(self.sim_ac):
                        if motor_num in self.gazebo_pubs:
                            msg = Float64()
                            # Convert 0-180 (UI) to -pi/2 to pi/2 (Gazebo)
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

def main(args=None):
    rclpy.init(args=args)
    node = ServoTopicNode()
    try:
        # Standard spin is fine here because Threading handles the blocking loops!
        rclpy.spin(node)
    except KeyboardInterrupt:
        pass
    finally:
        node.active_mode = 0 # Ensure thread dies on Ctrl+C
        node.destroy_node()
        if rclpy.ok(): 
            rclpy.shutdown()

if __name__ == '__main__':
    main()