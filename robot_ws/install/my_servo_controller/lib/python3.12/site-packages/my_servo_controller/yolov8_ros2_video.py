#!/usr/bin/env python3

import rclpy
from rclpy.node import Node
from sensor_msgs.msg import Image
from cv_bridge import CvBridge
import cv2

class VideoPublisher(Node):
    def __init__(self):
        super().__init__('video_publisher')
        
        # Publish to the exact topic your YOLO script is subscribed to
        self.publisher_ = self.create_publisher(Image, 'rgb_cam/image_raw', 10)
        
        # Set the path to your video file here
        self.video_path = '/home/rasp/humanoid_ros2/code_yolo/walking7.mp4' 
        self.cap = cv2.VideoCapture(self.video_path)
        self.bridge = CvBridge()
        
        # Publish at approximately 30 FPS (1 / 30 = ~0.033 seconds)
        timer_period = 0.033  
        self.timer = self.create_timer(timer_period, self.timer_callback)

    def timer_callback(self):
        ret, frame = self.cap.read()
        
        if ret:
            # Convert OpenCV image to ROS 2 Image message and publish
            msg = self.bridge.cv2_to_imgmsg(frame, "bgr8")
            self.publisher_.publish(msg)
        else:
            # Optional: Loop the video when it reaches the end
            self.get_logger().info('End of video reached. Restarting...')
            self.cap.set(cv2.CAP_PROP_POS_FRAMES, 0)

def main(args=None):
    rclpy.init(args=args)
    video_publisher = VideoPublisher()
    
    try:
        rclpy.spin(video_publisher)
    except KeyboardInterrupt:
        pass
        
    video_publisher.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()