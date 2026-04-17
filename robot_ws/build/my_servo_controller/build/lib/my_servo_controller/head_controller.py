import rclpy
from rclpy.node import Node

from servo_interfaces.msg import GoalPosition
from servo_interfaces.msg import HeadMove

class Goal_subscriber(Node):
    def __init__(self):
        super().__init__('goal_subscriber')
        self.subscription = self.create_subscription(
            GoalPosition,
            'goal_position',
            self.goal_callback,
            10)
        self.subscription

        self.move_motor_pub = self.create_publisher(HeadMove, "/head_move", 10)

        self.frame_width = 1920
        self.frame_height = 1080

        self.frame_angle_x = 60  # Assuming a horizontal field of view of 60 degrees
        self.frame_angle_y = 45  # Assuming a vertical field of view of 45 degrees

    def goal_callback(self, data):
        self.get_logger().info(f"Received goal position: ({data.x}, {data.y}), size: ({data.w}, {data.h})")
        move_x = ((self.frame_width // 2 - data.x)/(self.frame_width/2))*self.frame_angle_x/2  # Convert to degrees, assuming the camera's field of view is 180 degrees
        move_y = ((self.frame_height // 2 - data.y)/(self.frame_height/2))*self.frame_angle_y/2  # Convert to degrees
        #(1080, 1920)
        motor_goal = HeadMove()
        motor_goal.pan = move_x
        motor_goal.tilt = move_y
        self.move_motor_pub.publish(motor_goal)

def main(args=None):
    rclpy.init(args=None)
    goal_subscriber = Goal_subscriber()
    rclpy.spin(goal_subscriber)
    rclpy.shutdown()

if __name__ == '__main__':
    main()