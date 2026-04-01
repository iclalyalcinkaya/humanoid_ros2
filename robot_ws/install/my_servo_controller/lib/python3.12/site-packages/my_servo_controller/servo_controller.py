#!/usr/bin/python

import rclpy
from rclpy.node import Node
from adafruit_servokit import ServoKit
from servo_interfaces.srv import MotorAngle
import json
import os
from time import sleep
from rclpy.executors import MultiThreadedExecutor

MOTOR_COUNT = 14 # Updated to 14 motors
ANGLE_FILE = "angle.json" # File to store the dictionary of all motor angles

def load_angles():
    """Loads a dictionary of all motor angles. Creates defaults if missing."""
    if not os.path.exists(ANGLE_FILE):
        return {str(i): 90 for i in range(1, MOTOR_COUNT + 1)}
    
    try:
        with open(ANGLE_FILE, "r") as f:
            return json.load(f)
    except:
        return {str(i): 90 for i in range(1, MOTOR_COUNT + 1)}

def save_angles(angles_dict):
    with open(ANGLE_FILE, "w") as f:
        json.dump(angles_dict, f, indent=4)

class ServoControllerNode(Node):
    def __init__(self):
        super().__init__('servo_controller_node')
        self.get_logger().info("Servo Controller Node has been started.")
        self.kit = ServoKit(channels=16, frequency=50)
        self.service_ = self.create_service(MotorAngle, 'move_servo', self.move_servo_callback)  # Service to handle servo movement requests

    def move_servo_callback(self, request, response):
        motor_num = request.motor_num - 1
        target_position = request.target_position
        all_angles = load_angles()
        current_an = all_angles.get(str(motor_num+1), 90)

        if 0 <= motor_num < MOTOR_COUNT and 0 <= target_position <= 180:
            
            Kp = request.kp
            Ki = request.ki
            Kd = request.kd
            Ts = 0.1 # Time step in seconds

            error_1 = 0.0     
            In_1 = 0.0    
            error = target_position - current_an

            while abs(error) != 0: 
                Pn = Kp * error
                In = In_1 + (Ki * error * Ts)
                Dn = Kd * (error - error_1) / Ts
                
                control = int(Pn + In + Dn)
                
                if control == 0 and abs(error) > 0:
                    control = 1 if error > 0 else -1
                
                current_an = max(0, min(180, current_an + control))
                
                self.kit.servo[motor_num].angle = current_an
                
                In_1 = In
                error_1 = error
                error = target_position - current_an    
                sleep(Ts)

            self.get_logger().info(f"Motor {motor_num+1} moved to {target_position} degrees with PID values Kp={Kp}, Ki={Ki}, Kd={Kd}.")
            all_angles[str(motor_num+1)] = target_position
            save_angles(all_angles)
            response.is_set = True
        else:
            self.get_logger().info(f"Invalid request: motor_num={motor_num}, target_position={target_position}")
            response.is_set = False
        
        return response

def main(args=None):
    rclpy.init(args=args)
    node = ServoControllerNode()
    executor = MultiThreadedExecutor()
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