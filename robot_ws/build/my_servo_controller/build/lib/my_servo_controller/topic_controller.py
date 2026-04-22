#!/usr/bin/python

import rclpy
from rclpy.node import Node
from adafruit_servokit import ServoKit
import time
import threading
from rosbridge_msgs.msg import ConnectedClients
from servo_interfaces.msg import SetMode, SetPwm, HeadMove
from std_msgs.msg import Float64, Bool
import math

MOTOR_COUNT = 12
MOTOR_ANGLE_LIMITS = [[0, 180], [0, 180], [0, 180], [0, 180], [0, 180], [0, 180], [0, 180], [0, 180], [0, 180], [0, 180], [0, 180], [0, 180]]
MOTOR_START_ANGLES = {'1': 90,  '2': 120,  '3': 90,  '4': 90,  '5': 90,  '6': 90,  '7': 90,  '8': 90,  '9': 90,  '10': 90, '11': 90, '12': 90}
MODE_ANGLES = {
    1: [10, 81, 40, 90, 90, 170, 100, 60, 80, 90, 90, 90], 
    2: [90, 90, 90, 90, 90, 20, 60, 80, 80, 90, 90, 90], 
    3: [60, 105, 60, 60, 90, 120, 75, 60, 60, 90, 90, 90],
    4: [90, 120, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90]
}
MOVE_ORDER = [14, 5, 2, 4, 13, 8, 7, 6, 9, 10, 11, 3] # The conncected order of the servos in the physical robot

GAZEBO_JOINT_MAP = {
    0: "left_shoulder_yaw_joint", #0-110
    1: "left_shoulder_roll_joint",
    2: "left_shoulder_pitch_joint",
    3: "left_elbow_joint",
    4: "left_wrist_roll_joint", #mid 90, - out, + in
    5: "right_shoulder_yaw_joint", #40-180
    6: "right_shoulder_roll_joint", 
    7: "right_shoulder_pitch_joint",
    8: "right_elbow_joint",
    9: "right_wrist_roll_joint", #mid 90, + out, - in
    10: "neck_pan_joint", #mid 130/135
    11: "neck_tilt_joint" #90/100-120
    }

class ServoTopicNode(Node):
    def __init__(self):
        super().__init__('servo_topic_server')
        self.get_logger().info("Servo Topic Server has been started.")
        self.kit = ServoKit(channels=16, frequency=50)
        for i in range(MOTOR_COUNT): 
            self.kit.servo[i].actuation_range = 180
            self.kit.servo[i].set_pulse_width_range(500, 2500)
      
        self.active_client_id = None
        self.current_angles = MOTOR_START_ANGLES.copy()
        self.current_angles_sim = MOTOR_START_ANGLES.copy()
        self.i2c_lock = threading.Lock()

        self.sim_ac = False        
        self.active_mode = 0
        self.mode_thread = None
        self.speed = 5
        self.motor_thread = [None] * MOTOR_COUNT
        self.active_motor = [False] * MOTOR_COUNT
        self.gazebo_pubs = {}
        for motor_idx, joint_name in GAZEBO_JOINT_MAP.items():
            topic_name = f'/h1/{joint_name}/cmd_pos'
            self.gazebo_pubs[motor_idx] = self.create_publisher(Float64, topic_name, 10)

        self.client_sub = self.create_subscription(ConnectedClients, '/connected_clients', self.client_sub_callback, 10)
        self.mode_sub = self.create_subscription(SetMode, '/set_mode', self.mode_sub_callback, 10)
        self.cmd_sub = self.create_subscription(SetPwm, '/web_cmd', self.web_cmd_callback, 10)
        self.simulation_sub = self.create_subscription(Bool, '/sim_active', self.sim_active_callback, 10)
        self.head_move = self.create_subscription(HeadMove, '/head_move', self.head_move_callback, 10)
        self.head_active_sub = self.create_subscription(Bool, '/head_active', self.head_active_callback, 10)

        self.pan_min, self.pan_max = MOTOR_ANGLE_LIMITS[2]
        self.tilt_min, self.tilt_max = MOTOR_ANGLE_LIMITS[3]

        self.frame_width = 640
        self.frame_height = 480

        # Values below acts like the Proportional factor in PID
        self.frame_angle_x = 35 
        self.frame_angle_y = 25 

        self.center_x = self.frame_width / 2.0
        self.center_y = self.frame_height / 2.0
        
        # Degrees per pixel (eliminates multiple divisions per frame)
        self.deg_per_px_x = self.frame_angle_x / self.frame_width
        self.deg_per_px_y = self.frame_angle_y / self.frame_height

        self.Kp = 1

        self.head_active = False
        for motor_num in range(MOTOR_COUNT):
            self.kit.servo[motor_num].angle = MODE_ANGLES[4][motor_num] # Ensure physical motors are in the correct starting position
        self.head_active = True

    def head_move_callback(self, msg):
        # Convert the pan and tilt values to motor angles
        if self.head_active and self.motor_thread[10] == None and self.motor_thread[11] == None:
            if self.sim_ac:
                current_pan = self.current_angles_sim['2']
                current_tilt = self.current_angles_sim['3']
            else:
                current_pan = self.current_angles['2']
                current_tilt = self.current_angles['3']
            
            error_x = self.center_x - msg.pan
            error_y = self.center_y - msg.tilt

            # Ignore movements smaller than 20 pixels
            if abs(error_x) < 30:
                error_x = 0.0
            if abs(error_y) < 20:
                error_y = 0.0

            if error_x != 0.0 or error_y != 0.0:
                move_x = error_x * self.deg_per_px_x
                move_y = error_y * self.deg_per_px_y
             
                step_pan = move_x * self.Kp
                step_tilt = move_y * self.Kp

                pan_an = current_pan + int(step_pan)
                tilt_an = current_tilt - int(step_tilt)

                target_pan = min(self.pan_max, max(self.pan_min, pan_an))
                target_tilt = min(self.tilt_max, max(self.tilt_min, tilt_an))

                self.get_logger().info(f"Head Move Received: Pan {int(msg.pan)} -> {target_pan} current pan: {current_pan} | Tilt {int(msg.tilt)} -> {target_tilt} current tilt: {current_tilt}")
                self.write_head_instant(target_pan, target_tilt)

    def head_active_callback(self, msg):
        self.head_active = msg.data

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
        """
        if self.mode_thread is not None:
            self.active_mode = 0
            self.mode_thread.join(timeout=0.5)
        # Spin up a quick thread to move specific motor
        #threading.Thread(target=self.sendMotorGoal, args=(motor_num, target_pos)).start()
        if self.motor_thread[motor_num] is not None:
            self.active_motor[motor_num] = False
            self.motor_thread[motor_num].join(timeout=0.5)
        """
        self.active_mode = 0
        self.active_motor[motor_num] = False

        self.get_logger().info(f"Goal Accepted: Motor {motor_num +1} to {int(target_pos)}")
        self.active_mode = -1
        self.active_motor[motor_num] = True
        self.motor_thread[motor_num] = threading.Thread(target=self.sendMotorGoal, args=(motor_num, target_pos))
        self.motor_thread[motor_num].start()

    def client_sub_callback(self, msg):
        if self.active_client_id is not None:
            if not any(client.connection_time.sec == self.active_client_id for client in msg.clients):
                self.get_logger().warn("Active client dropped.")
                self.active_client_id = None
                #self.active_mode = 0 # This breaks any active sequence loops

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
            self.active_motor = [False] * MOTOR_COUNT # Stop any active motor threads
            self.active_mode = 0 # Stops the background thread
            return
        
        if new_mode == 5:
            self.write_head_instant(MOTOR_START_ANGLES['2'], MOTOR_START_ANGLES['3'])

        elif new_mode != self.active_mode:
            self.get_logger().info(f"Switching to Mode: {new_mode}")
            self.active_mode = 0
            """
            # Start the new mode in a background thread so ROS doesn't freeze
            if self.mode_thread is not None:
                self.mode_thread.join(timeout=0.2)
            for i in range(MOTOR_COUNT):
                if self.motor_thread[i] is not None:
                    # self.get_logger().info(f"{self.active_motor[i]} Stopping Motor {i+1} thread.")
                    self.active_motor[i] = False
                    self.motor_thread[i].join(timeout=0.1)
            """
            for i in range(MOTOR_COUNT):
                self.active_motor[i] = False
            
            self.active_mode = new_mode
            self.mode_thread = threading.Thread(target=self.run_mode_sequence, args=(new_mode,))
            self.mode_thread.start()
            
    def run_mode_sequence(self, mode_num):
        """This runs in the background"""
        if mode_num not in MODE_ANGLES: return
        angles = MODE_ANGLES[mode_num]

        # 1. POSE MODE
        if mode_num == 1:
            self.speed = 5
            for i in range(9, -1, -1):
                if self.active_mode != mode_num: return # Exit if mode changed
                self.sendMotorGoal(i, angles[i])
            self.active_mode = 0 # Return to idle after pose is complete
        else:
            self.speed = 5
            for i in range(10):
                if self.active_mode != mode_num: return
                self.sendMotorGoal(i, angles[i])           
            if mode_num == 4:
                self.active_mode = 0

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
            #neck_pitch = angles[11]
            
            while self.active_mode == mode_num:
                L_elbow = 66 if L_elbow == 60 else 60
                L_shoulder_pitch = 50 if L_shoulder_pitch == 60 else 60
                R_elbow = 66 if R_elbow == 60 else 60
                R_shoulder_pitch = 50 if R_shoulder_pitch == 60 else 60
                #neck_pitch = 90 if neck_pitch == 100 else 100 
                
                target_group = {
                    3: L_elbow,
                    8: R_elbow,
                    2: L_shoulder_pitch,
                    7: R_shoulder_pitch,
                    #11: neck_pitch
                }
                
                # Move them all at the exact same time!
                self.sendMultipleMotorGoals(target_group)

    def sendMotorGoal(self, motor_num, target_angle):
        """Moves the motor in steps."""

        my_thread = threading.current_thread()

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
        while abs(error) > 0.1 and self.active_mode != 0 and (self.active_mode != -1 or self.active_motor[motor_num]):
            if self.mode_thread is not my_thread and self.motor_thread[motor_num] is not my_thread:
                break

            if my_thread is self.mode_thread and self.active_mode == -1:
                break
            
            if abs(error) < abs(Step) and abs(Step) != 1:
                Step = error
            if error*Step < 0:
                Step *= -1
            
            current_an = max(min_angle, min(max_angle, current_an + Step))
            if(self.sim_ac):
                if motor_num in self.gazebo_pubs:
                    msg = Float64()
                    # Convert 0-180 (UI) to -pi/2 to pi/2 (for Gazebo)
                    msg.data = math.radians(current_an - 90.0)                    
                    self.gazebo_pubs[motor_num].publish(msg)
                    self.current_angles_sim[str(motor_num+1)] = int(current_an)
            else: 
                with self.i2c_lock:
                    if motor_num == 9 or motor_num == 11:
                        self.kit.servo[motor_num+2].angle = current_an
                    else:
                        self.kit.servo[motor_num].angle = current_an
                    # self.kit.servo[MOVE_ORDER[motor_num]].angle = current_an 
                self.current_angles[str(motor_num+1)] = int(current_an)
            #self.get_logger().info(f"Motor: {motor_num+1} angle: {current_an}")
            error = target_position - current_an
            time.sleep(Ts)
        if(error == 0):
            if(self.active_mode == -1):
                self.active_motor[motor_num] = False
                self.get_logger().info(f"Goal Succeeded: Motor {motor_num+1} arrived at {int(target_position)}")
            return True
        else:
            self.get_logger().warn(f"Goal Abonded: Motor {motor_num+1} to {int(target_position)}")
            return False

    def sendMultipleMotorGoals(self, targets):
        """Moves multiple motors simultaneously in a single synchronized loop."""
        Ts = 0.05
        #Step = self.speed
        my_thread = threading.current_thread()

        while self.active_mode > 0:
            all_reached = True # Assume done until proven otherwise            

            for motor_num, target_angle in targets.items():
                if self.mode_thread is not my_thread:
                    break
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
                    all_reached = False # At least one motor still needs to move
                    
                    Step = self.speed
                    if abs(error) < abs(Step) and abs(Step) != 1:
                        Step = error
                    if error * Step < 0:
                        Step *= -1

                    current_an = max(min_angle, min(max_angle, current_an + Step))

                    if(self.sim_ac):
                        if motor_num in self.gazebo_pubs:
                            msg = Float64()
                            # Convert 0-180 (UI) to -pi/2 to pi/2 (for Gazebo)
                            msg.data = math.radians(current_an - 90.0) 
                            self.gazebo_pubs[motor_num].publish(msg)
                            self.current_angles_sim[str(motor_num+1)] = int(current_an)
                    else: 
                        with self.i2c_lock:
                            if motor_num == 9 or motor_num == 11:
                                self.kit.servo[motor_num+2].angle = current_an
                            else:
                                self.kit.servo[motor_num].angle = current_an
                                #self.get_logger().info(f"MultiMotorController Motor: {motor_num+1} angle: {current_an}")
                            # self.kit.servo[MOVE_ORDER[motor_num]].angle = current_an 
                        self.current_angles[str(motor_num+1)] = int(current_an)

            if all_reached:
                break
            
            time.sleep(Ts)

    def write_head_instant(self, pan_val, tilt_val):
        # 2. Command Simulation OR Hardware
        if self.sim_ac:
            if 1 in self.gazebo_pubs:
                msg = Float64()
                msg.data = math.radians(pan_val - 90.0) 
                self.gazebo_pubs[1].publish(msg)
                self.current_angles_sim['2'] = int(pan_val)
                
            if 2 in self.gazebo_pubs:
                msg = Float64()
                msg.data = math.radians(tilt_val - 90.0) 
                self.gazebo_pubs[2].publish(msg)
                self.current_angles_sim['3'] = int(tilt_val)
        else:
            with self.i2c_lock:
                self.kit.servo[1].angle = pan_val
                self.kit.servo[2].angle = tilt_val
            self.current_angles['2'] = int(pan_val)
            self.current_angles['3'] = int(tilt_val)


def main(args=None):
    rclpy.init(args=args)
    node = ServoTopicNode()
    try:
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