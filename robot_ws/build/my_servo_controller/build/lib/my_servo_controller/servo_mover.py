#!/home/rasp/Desktop/ROS2/.venv/bin/python3

import sys
import rclpy
from rclpy.node import Node
from adafruit_servokit import ServoKit
from servo_interfaces.srv import MotorAngle

MOTOR_COUNT = 14 # Updated to 14 motors

class ServoMoverNode(Node):
    def __init__(self):
        super().__init__('servo_mover_node')
        self.get_logger().info("Servo Mover Node has been started.")
        self.client_ = self.create_client(MotorAngle, 'move_servo')  # Client to call the move_servo service
        while not self.client_.wait_for_service(timeout_sec=1.0):
            self.get_logger().info('service not available, waiting again...')
        self.req = MotorAngle.Request()
        
    def send_request(self, motor_num, target_position, speed):
        self.req.motor_num = motor_num
        self.req.target_position = target_position
        self.req.speed = speed
        self.future = self.client_.call_async(self.req)
        rclpy.spin_until_future_complete(self, self.future)
        return self.future.result()

def main(args=None):
    rclpy.init(args=args)
    node = ServoMoverNode()
    response = node.send_request(int(sys.argv[1]), int(sys.argv[2]),int(sys.argv[3]))
    node.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':    
    main()