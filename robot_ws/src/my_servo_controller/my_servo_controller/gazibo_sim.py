#!/usr/bin/python

import rclpy
from rclpy.node import Node
from rclpy.action import ActionServer, CancelResponse, GoalResponse
from rclpy.executors import MultiThreadedExecutor
from servo_interfaces.action import MotorAngle
from rclpy.callback_groups import ReentrantCallbackGroup
from std_msgs.msg import Float64  # NEW: Required for Gazebo
from rosbridge_msgs.msg import ConnectedClients
import math  # NEW: Required for Degree -> Radian conversion
import json
import os
import threading
import time

# --- CONFIGURATION ---
MOTOR_COUNT = 14
ANGLE_FILE = "angle.json"
MOTOR_ANGLE_LIMITS = [[0, 180], [0, 180], [0, 180], [0, 180], [0, 180], [0, 180], [0, 180], [0, 180], [0, 180], [0, 180], [0, 180], [0, 180], [0, 180], [0, 180]]
MOTOR_START_ANGLES = {'1': 90, '2': 90, '3': 90, '4': 90, '5': 90, '6': 90, '7': 90, '8': 90, '9': 90, '10': 90, '11': 180, '12': 90, '13': 90, '14': 90}

# NEW: Map your 14 motor indices (0-13) to the Gazebo H1 joint names
# You will need to verify the exact joint names in the URDF file
GAZEBO_JOINT_MAP = {
    0: "left_shoulder_pitch_joint",
    1: "left_shoulder_roll_joint",
    2: "left_shoulder_yaw_joint",
    3: "left_elbow_joint",
    4: "left_wrist_roll_joint",
    5: "left_wrist_pitch_joint",
    6: "left_wrist_yaw_joint", 
    7: "right_shoulder_pitch_joint",
    8: "right_shoulder_roll_joint",
    9: "right_shoulder_yaw_joint",
    10: "right_elbow_joint",
    11: "right_wrist_roll_joint", 
    12: "right_wrist_pitch_joint",
    13: "right_wrist_yaw_joint"
    }

class GaziboSimServer(Node):
    def __init__(self):
        super().__init__('gazibo_sim_server')
        self.get_logger().info(f"Servo Action Server started in SIMULATION mode.")
        
        self.action_cb_group = ReentrantCallbackGroup()
        self.first_id = None
        self.active_client_id = None
        self.old_leng = 0
        self.current_angles = self.load_angles()
        self.file_lock = threading.Lock()

        # NEW: Initialize all the Gazebo publishers
        self.gazebo_pubs = {}
        for motor_idx, joint_name in GAZEBO_JOINT_MAP.items():
            topic_name = f'/h1/{joint_name}/cmd_pos'
            self.gazebo_pubs[motor_idx] = self.create_publisher(Float64, topic_name, 10)

        self._action_server = ActionServer(
            self, MotorAngle, 'move_servo',
            execute_callback=self.execute_callback,
            goal_callback=self.goal_callback,
            cancel_callback=self.cancel_callback,
            callback_group=self.action_cb_group
        )

        self._client_sub = self.create_subscription(
            ConnectedClients, '/connected_clients',
            self.listener_callback, 10
        )

    def listener_callback(self, msg):
        leng = len(msg.clients)
        if(self.first_id is None and leng != 0):
            self.first_id = msg.clients[leng-1].connection_time.sec
            self.old_leng = leng
            self.get_logger().info(f"Working client ID= {self.first_id}")
        elif(self.old_leng != leng):
            self.old_leng = leng
            if not any(client.connection_time.sec == self.first_id for client in msg.clients):
                self.active_client_id = None
                if (leng != 0):
                    self.first_id = msg.clients[leng-1].connection_time.sec
                    self.get_logger().info(f"Working client ID= {self.first_id}")
                else:
                    self.first_id = None

    def goal_callback(self, goal_request):
        incoming_id = goal_request.client_id
        if self.active_client_id is None:
            self.active_client_id = incoming_id
            self.get_logger().info(f"Control locked to new client: {incoming_id}")
            return GoalResponse.ACCEPT
        elif self.active_client_id == incoming_id:
            self.get_logger().info(f"Goal request: Motor {goal_request.motor_num} to {goal_request.target_position}")
            return GoalResponse.ACCEPT
        else:
            self.get_logger().warn(f"Goal rejected: Robot is currently locked by {self.active_client_id}")
            return GoalResponse.REJECT

    def cancel_callback(self, goal_handle):
        return CancelResponse.ACCEPT

    def execute_callback(self, goal_handle):
        request = goal_handle.request
        feedback_msg = MotorAngle.Feedback()
        result = MotorAngle.Result()

        motor_num = request.motor_num - 1
        target_position = float(request.target_position)
        
        if motor_num == 98:
            self.get_logger().info("Dummy goal received. Keeping websocket connection alive.")
            while not goal_handle.is_cancel_requested:
                time.sleep(1.0)
            goal_handle.canceled()
            self.active_client_id = None
            result.success = False
            return result

        current_an = float(self.current_angles.get(str(motor_num+1), 90))
        min_angle, max_angle = MOTOR_ANGLE_LIMITS[motor_num]
        
        if 0 <= motor_num < MOTOR_COUNT and min_angle <= target_position <= max_angle:
            Kp, Ki, Kd = request.kp, request.ki, request.kd
            Ts = 0.1
            error_1 = In_1 = 0.0
            error = target_position - current_an

            while abs(error) > 0.1:
                if goal_handle.is_cancel_requested:
                    goal_handle.canceled()
                    self.get_logger().info(f'Goal canceled by client: Motor {motor_num+1} -> {target_position}')
                    self.save_angles_thread_safe()
                    result.success = False
                    return result

                Pn = Kp * error
                In = In_1 + (Ki * error * Ts)
                Dn = Kd * (error - error_1) / Ts
                control = int(Pn + In + Dn)
                
                if control == 0 and abs(error) > 0:
                    control = 1 if error > 0 else -1
                
                current_an = max(min_angle, min(max_angle, current_an + control))
                
                if motor_num in self.gazebo_pubs:
                    msg = Float64()
                    # Convert 0-180 (UI) to -pi/2 to pi/2 (Gazebo)
                    msg.data = math.radians(current_an - 90.0) 
                    self.gazebo_pubs[motor_num].publish(msg)
                
                feedback_msg.current_position = int(current_an)
                goal_handle.publish_feedback(feedback_msg)

                self.current_angles[str(motor_num+1)] = int(current_an)
                In_1, error_1 = In, error
                error = target_position - current_an
                time.sleep(Ts)

            goal_handle.succeed()
            self.get_logger().info(f"Goal Succeeded: Motor {motor_num+1} arrived at {target_position}")
            self.save_angles_thread_safe()
            result.success = True
            return result
            
        else:
            self.get_logger().error(f"Goal Aborted: Motor or Angle out of bounds")
            goal_handle.abort()
            self.active_client_id = None
            result.success = False
            return result

    def load_angles(self):
        if not os.path.exists(ANGLE_FILE): 
            return MOTOR_START_ANGLES.copy()
        try:
            with open(ANGLE_FILE, "r") as f: 
                return json.load(f)
        except:
            self.get_logger().error("Error occurred while loading angles. Using defaults.") 
            return MOTOR_START_ANGLES.copy()

    def save_angles_thread_safe(self):
        with self.file_lock:
            with open(ANGLE_FILE, "w") as f:
                json.dump(self.current_angles, f, indent=4)

def main(args=None):
    rclpy.init(args=args)
    node = GaziboSimServer()
    executor = MultiThreadedExecutor(num_threads=MOTOR_COUNT+1) 
    executor.add_node(node)
    try:
        executor.spin()
    except KeyboardInterrupt:
        pass
    finally:
        node.destroy_node()
        rclpy.shutdown()

if __name__ == '__main__':
    main()