#/home/rasp/humanoid_ros2/yolo_env/bin/env python3

from ultralytics import YOLO
import rclpy
from rclpy.node import Node
from sensor_msgs.msg import Image
from cv_bridge import CvBridge
from std_msgs.msg import Bool

from servo_interfaces.msg import HeadMove
bridge = CvBridge()

class Camera_subscriber(Node):

    def __init__(self):
        super().__init__('camera_subscriber')

        self.model = YOLO('/home/rasp/humanoid_ros2/robot_ws/yolov8n_ncnn_model', task='detect')
        #self.model = YOLO('yolov8n.pt')

        self.subscription = self.create_subscription(
            Image,
            '/image_raw',
            self.camera_callback,
            1)
        self.subscription 

        self.locked_id = None
        self.wait_counter = 0
        #self.old_lock = []

        self.head_active = True 
        self.head_active_sub = self.create_subscription(Bool, '/head_active', self.head_active_callback, 10)
        
        self.move_motor_pub = self.create_publisher(HeadMove, "/head_move", 10)

        self.frame_width = 640
        self.frame_height = 480

        self.frame_angle_x = 27  # Step size in degrees for the horizontal field of view of the camera
        self.frame_angle_y = 25  # Step size in degrees for the vertical field of view of the camera

        self.center_x = self.frame_width / 2.0
        self.center_y = self.frame_height / 2.0
        
        # Degrees per pixel (eliminates multiple divisions per frame)
        self.deg_per_px_x = self.frame_angle_x / self.frame_width
        self.deg_per_px_y = self.frame_angle_y / self.frame_height

    def head_active_callback(self, msg):
        self.head_active = msg.data

    def camera_callback(self, data):
        if not self.head_active:
            return
        img = bridge.imgmsg_to_cv2(data, "bgr8")
        results = self.model.track(img, conf=0.6, classes=[0], persist=True, tracker="bytetrack.yaml", stream=False, show_conf=False, save=False, save_frames=False, imgsz=[self.frame_height, self.frame_width])
        #results = self.model.track(img, conf=0.6, classes=[0], persist=True, tracker="botsort.yaml", stream=False, show_conf=False, save=True, save_frames=True, imgsz=(self.frame_width, self.frame_height))

        for r in results:            
            if r.boxes.is_track and r.boxes.id is not None:
                # Extract the list of current IDs in the frame
                current_ids = r.boxes.id.tolist()
                sorted_lower_boxes = sorted(zip(r.boxes.id, r.boxes.xyxy), key=lambda x: x[1][3], reverse=True)

                # Unlocking logic for the currently locked target
                if self.locked_id is not None:                    
                    if self.locked_id in current_ids:
                        idx = current_ids.index(self.locked_id)
                        #self.get_logger().info(f"Locked target ID index {idx}")
                        
                        #x_center = r.boxes.xywh[idx][0].item()
                        y_lower = r.boxes.xyxy[idx][3].item()                      

                        # if there is closer object than the locked one, unlock it
                        if self.locked_id != sorted_lower_boxes[0][0].item():
                            if sorted_lower_boxes[0][1][3].item() - y_lower > 50:
                                #self.get_logger().info(f"Closer target detected. Unlocking current target ID {self.locked_id}.")
                                self.locked_id = None                                             
                        
                        # If the target is to far from the center of the frame, unlock it
                        # It only happens if the head can no longer track the target, so we need to unlock it and find a new one
                        #elif (x_center > 600 or x_center < 30) and self.wait_counter != 0:                            
                        #    self.get_logger().info(f"Target ID is too far from the center {self.locked_id}.")
                        #    self.locked_id = None

                        self.wait_counter = 0 
                    else:
                        # Wait for the target to reappear for a few frames before unlocking
                        self.wait_counter += 1
                        if self.wait_counter > 5:
                            self.wait_counter = 0
                            #self.get_logger().info(f"Target ID is disappear {self.locked_id}.")
                            self.locked_id = None

                # Locking to a new target if no target is currently locked
                #self.get_logger().info(f"Current IDs: {current_ids}")
                if self.locked_id is None:
                    self.locked_id = sorted_lower_boxes[0][0].item()  # Sadece ID değerini float/int olarak al
                    self.get_logger().info(f"Yeni Hedef Kilitlendi: ID {self.locked_id}")
                    #self.old_lock.append(self.locked_id)

                # Sending location of the target
                if self.locked_id is not None and self.locked_id in current_ids:
                    idx = current_ids.index(self.locked_id)

                    x= r.boxes.xywh[idx][0].item()
                    y= r.boxes.xywh[idx][1].item()

                    self.get_logger().info(f"Locked Target ID {self.locked_id} Position: ({int(x)}, {int(y)})")
                    error_x = self.center_x - x
                    error_y = self.center_y - y

                    # Ignore movements smaller than 20 pixels
                    if abs(error_x) < 30:
                        error_x = 0.0
                    if abs(error_y) < 20:
                        error_y = 0.0

                    if error_x != 0.0 or error_y != 0.0:
                        move_x = error_x * self.deg_per_px_x
                        move_y = error_y * self.deg_per_px_y
                        
                        motor_goal = HeadMove()
                        motor_goal.pan = int(move_x)
                        motor_goal.tilt = int(move_y)
                        
                        self.move_motor_pub.publish(motor_goal)

                    #self.get_logger().info(f"Goal Position Published: ({int(x)}, {int(y)})")
            #self.get_logger().info(f"Old locked IDs: {self.old_lock}")


def main(args=None):
    rclpy.init(args=None)
    camera_subscriber = Camera_subscriber()
    rclpy.spin(camera_subscriber)
    rclpy.shutdown()

if __name__ == '__main__':
    main()