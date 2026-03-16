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
MOTOR_COUNT = 12
MOTOR_ANGLE_LIMITS = [[0, 180], [0, 180], [0, 180], [0, 180], [0, 180], [0, 180], [0, 180], [0, 180], [0, 180], [0, 180], [0, 180], [0, 180]]
MOTOR_START_ANGLES = {'1': 90, '2': 90, '3': 90, '4': 90, '5': 90, '6': 90, '7': 90, '8': 90, '9': 90, '10': 90, '11': 180, '12': 90}

# NEW: Map your 14 motor indices (0-13) to the Gazebo H1 joint names
# You will need to verify the exact joint names in the URDF file
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

class GaziboSimServer(Node):
    def __init__(self):
        super().__init__('gazibo_sim_server')
        self.get_logger().info(f"Servo Action Server started in SIMULATION mode.")
        
        self.action_cb_group = ReentrantCallbackGroup()
        self.first_id = None
        self.active_client_id = None
        self.old_leng = 0
        self.current_angles = MOTOR_START_ANGLES #self.load_angles()
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

        current_an = float(self.current_angles.get(str(motor_num+1), 90))
        min_angle, max_angle = MOTOR_ANGLE_LIMITS[motor_num]
        
        if 0 <= motor_num < MOTOR_COUNT and min_angle <= target_position <= max_angle:
            Kp, Ki, Kd = request.kp, request.ki, request.kd
            Speed = request.speed
            Ts = 0.1
            error = target_position - current_an
            while abs(error) > 0.1:
                if goal_handle.is_cancel_requested or self.active_client_id is None:
                    goal_handle.canceled()
                    self.get_logger().info(f'Goal canceled by client: Motor {motor_num+1} -> {target_position}')
                    result.success = False
                    return result
                
                if(abs(error) < abs(Speed) and abs(Speed) != 1):
                    Speed = 1
                if(error < 0 and Speed > 0):
                    Speed *= -1
                
                current_an = max(min_angle, min(max_angle, current_an + Speed))
                
                if motor_num in self.gazebo_pubs:
                    msg = Float64()
                    # Convert 0-180 (UI) to -pi/2 to pi/2 (Gazebo)
                    msg.data = math.radians(current_an - 90.0) 
                    self.gazebo_pubs[motor_num].publish(msg)
                
                feedback_msg.current_position = int(current_an)
                goal_handle.publish_feedback(feedback_msg)

                self.current_angles[str(motor_num+1)] = int(current_an)
                error = target_position - current_an
                time.sleep(Ts)

            goal_handle.succeed()
            self.get_logger().info(f"Goal Succeeded: Motor {motor_num+1} arrived at {target_position}")
            result.success = True
            return result
            
        else:
            self.get_logger().error(f"Goal Aborted: Motor or Angle out of bounds")
            goal_handle.abort()
            self.active_client_id = None
            result.success = False
            return result

def main(args=None):
    rclpy.init(args=args)
    node = GaziboSimServer()
    executor = MultiThreadedExecutor(num_threads=MOTOR_COUNT) 
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