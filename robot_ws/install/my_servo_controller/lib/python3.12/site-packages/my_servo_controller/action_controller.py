#!/usr/bin/python

import rclpy
from rclpy.node import Node
from rclpy.action import ActionServer, CancelResponse, GoalResponse
from rclpy.executors import MultiThreadedExecutor
from adafruit_servokit import ServoKit
from servo_interfaces.action import MotorAngle
from rclpy.callback_groups import ReentrantCallbackGroup
from std_msgs.msg import Bool, Float64
from rosbridge_msgs.msg import ConnectedClients
import json
import os
import time
import math


MOTOR_COUNT = 12
MOTOR_ANGLE_LIMITS = [[0, 180], [0, 180], [0, 180], [0, 180], [0, 180], [0, 180], [0, 180], [0, 180], [0, 180], [0, 180], [0, 180], [0, 180]]
MOTOR_START_ANGLES = {'1': 90, '2': 90, '3': 90, '4': 90, '5': 90, '6': 90, '7': 90, '8': 90, '9': 90, '10': 90, '11': 90, '12': 90}

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

class ServoActionServer(Node):
    def __init__(self):
        super().__init__('servo_action_server')
        self.get_logger().info("Servo Action Server has been started.")
        self.kit = ServoKit(channels=16, frequency=50)
        self.action_cb_group = ReentrantCallbackGroup() #So callbacks can work parallelly
        self.first_id = None
        self.active_client_id = None
        self.old_leng = 0
        self.current_angles = MOTOR_START_ANGLES.copy() #Starts with default angles
        self.current_angles_sim = MOTOR_START_ANGLES.copy()
        self.sim_ac = False
        
        self.gazebo_pubs = {}
        for motor_idx, joint_name in GAZEBO_JOINT_MAP.items():
            topic_name = f'/h1/{joint_name}/cmd_pos'
            self.gazebo_pubs[motor_idx] = self.create_publisher(Float64, topic_name, 10)
        
        self.simulation_sub = self.create_subscription(
            Bool, 
            '/sim_active', 
            self.sim_active_callback, 
            10
        )

        self._action_server = ActionServer( 
            self,
            MotorAngle,
            'move_servo',
            execute_callback=self.execute_callback,
            goal_callback=self.goal_callback,
            cancel_callback=self.cancel_callback,
            callback_group=self.action_cb_group
        )

        self._client_sub = self.create_subscription( #Rosbridge server client information
            ConnectedClients,
            '/connected_clients',
            self.listener_callback,
            10
        )
    
    def sim_active_callback(self, msg):
        self.sim_ac = msg.data

    def listener_callback(self, msg): #To learn if the old Rosbridge client still active
        if self.active_client_id is not None:
            if not any(client.connection_time.sec == self.active_client_id for client in msg.clients):
                self.get_logger().warn("Active client dropped. Halting robot.")
                self.active_client_id = None

    def goal_callback(self, goal_request): #Checks the client id and accept or rejects goals
        incoming_id = goal_request.client_id
        if self.active_client_id is None:
            self.active_client_id = incoming_id
            self.get_logger().info(f"Control locked to new client: {incoming_id}")
            self.get_logger().info(f"Goal request: Motor {goal_request.motor_num+1} to {goal_request.target_position}")
            return GoalResponse.ACCEPT

        elif self.active_client_id == incoming_id:
            self.get_logger().info(f"Goal request: Motor {goal_request.motor_num+1} to {goal_request.target_position}")
            return GoalResponse.ACCEPT

        else:
            self.get_logger().warn(f"Goal rejected: Rejected robot id {incoming_id}")
            return GoalResponse.REJECT

    def cancel_callback(self, goal_handle):
        self.get_logger().info("Cancel request accepted")
        return CancelResponse.ACCEPT

    def execute_callback(self, goal_handle):
        request = goal_handle.request
        feedback_msg = MotorAngle.Feedback()
        result = MotorAngle.Result()

        motor_num = request.motor_num #- 1
        target_position = float(request.target_position)

        if(self.sim_ac):
            current_an = float(self.current_angles_sim[str(motor_num+1)])
        else:
            current_an = float(self.current_angles[str(motor_num+1)])
        
        min_angle, max_angle = MOTOR_ANGLE_LIMITS[motor_num]

        #Checks the goal limits
        if 0 <= motor_num < MOTOR_COUNT and min_angle <= target_position <= max_angle:
            Ts = 0.1
            error = target_position - current_an        
            if(request.speed):
                Step = request.speed
            else:                
                Kp, Ki, Kd = request.kp, request.ki, request.kd
            
            while abs(error) > 0.1:
                if goal_handle.is_cancel_requested or self.active_client_id is None:
                    goal_handle.canceled()
                    self.get_logger().info(f'Goal canceled by client: Motor {motor_num+1} -> {target_position}')
                    result.success = False
                    return result

                if(request.speed):
                    #If step is to big take smaller step
                    if abs(error) < abs(Step) and abs(Step) != 1:
                        Step = error
                    if error*Step < 0:
                        Step *= -1
                else:
                    Step = Kp * error #+ Ki * integral + Kd * derivative #Simple P controller, can be extended to PID if needed

                current_an = max(min_angle, min(max_angle, current_an + Step)) #To stay between angle limits
                if(self.sim_ac):
                    if motor_num in self.gazebo_pubs:
                        msg = Float64()
                        # Convert 0-180 (UI) to -pi/2 to pi/2 (Gazebo)
                        msg.data = math.radians(current_an - 90.0) 
                        self.gazebo_pubs[motor_num].publish(msg)
                        self.current_angles_sim[str(motor_num+1)] = int(current_an)
                        #self.get_logger().info(f"error: {error}, step: {Step}, degree: {current_an}, rad: {msg.data}")
                else: 
                    self.kit.servo[motor_num].angle = current_an 
                    self.current_angles[str(motor_num+1)] = int(current_an)
                
                feedback_msg.current_position = int(current_an)
                goal_handle.publish_feedback(feedback_msg) #Send current angle as feedback

                error = target_position - current_an                
                time.sleep(Ts) #wait for motor to move

            goal_handle.succeed()
            self.get_logger().info(f"Goal Succeeded: Motor {motor_num+1} arrived at {int(target_position)}")

            result.success = True
            return result
        #If the goal is out of limits, abort the goal
        else:
            self.get_logger().error(f"Goal Aborted: Motor or Angle out of bounds")
            goal_handle.abort()
            self.active_client_id = None
            result.success = False
            return result

def main(args=None):
    rclpy.init(args=args)
    node = ServoActionServer()
    executor = MultiThreadedExecutor(num_threads=MOTOR_COUNT) 
    executor.add_node(node)
    try:
        executor.spin()
    except KeyboardInterrupt:
        pass
    finally:
        node.destroy_node()
        if rclpy.ok(): #Dont try to shutdown multiple times
            rclpy.shutdown()

if __name__ == '__main__':
    main()