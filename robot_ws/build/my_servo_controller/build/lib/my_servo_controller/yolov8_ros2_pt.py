#~/humanoid_ros2/yolo_env/bin/env python3

from ultralytics import YOLO
import rclpy
from rclpy.node import Node
from sensor_msgs.msg import Image
from cv_bridge import CvBridge

from servo_interfaces.msg import InferenceResult, GoalPosition, Yolov8Inference
bridge = CvBridge()

class Camera_subscriber(Node):

    def __init__(self):
        super().__init__('camera_subscriber')

        self.model = YOLO('/home/rasp/humanoid_ros2/robot_ws/yolov8n_ncnn_model', task='detect')
        #self.model = YOLO('yolov8n.pt')

        self.subscription = self.create_subscription(
            Image,
            'camera/image_raw',
            self.camera_callback,
            1)
        self.subscription 

        self.motor_pub = self.create_publisher(GoalPosition, "/goal_position", 1)
        self.locked_id = None
        self.wait_counter = 0
        self.old_lock = []

    def camera_callback(self, data):

        img = bridge.imgmsg_to_cv2(data, "bgr8")
        results = self.model.track(img, conf=0.6, classes=[0], persist=True, tracker="bytetrack.yaml", stream=False, show_conf=False, save=True, save_frames=True)
        #results = self.model.track(img, conf=0.6, classes=[0], persist=True, tracker="botsort.yaml", stream=False, show_conf=False, save=True, save_frames=True)

        for r in results:            
            if r.boxes.is_track and r.boxes.id is not None:
                # Extract the list of current IDs in the frame
                current_ids = r.boxes.id.tolist()
                sorted_lower_boxes = sorted(zip(r.boxes.id, r.boxes.xyxy), key=lambda x: x[1][3], reverse=True)

                # Unlocking logic for the currently locked target
                if self.locked_id is not None:                    
                    if self.locked_id in current_ids:
                        idx = current_ids.index(self.locked_id)
                        self.get_logger().info(f"Locked target ID index {idx}")
                        
                        x_center = r.boxes.xywh[idx][0].item()
                        y_lower = r.boxes.xyxy[idx][3].item()                      

                        # if there is closer object than the locked one, unlock it
                        if self.locked_id != sorted_lower_boxes[0][0].item():
                            if sorted_lower_boxes[0][1][3].item() - y_lower > 50:
                                self.get_logger().info(f"Closer target detected. Unlocking current target ID {self.locked_id}.")
                                self.locked_id = None                                             
                        
                        # If the target is to far from the center of the frame, unlock it
                        # It only happens if the head can no longer track the target, so we need to unlock it and find a new one
                        elif (x_center > 1800 or x_center < 30) and self.wait_counter != 0:                            
                            self.get_logger().info(f"Target ID is too far from the center {self.locked_id}.")
                            self.locked_id = None

                        self.wait_counter = 0 

                    else:
                        # Wait for the target to reappear for a few frames before unlocking
                        self.wait_counter += 1
                        if self.wait_counter > 5:
                            self.wait_counter = 0
                            self.get_logger().info(f"Target ID is disappear {self.locked_id}.")
                            self.locked_id = None

                # Locking to a new target if no target is currently locked
                #self.get_logger().info(f"Current IDs: {current_ids}")
                if self.locked_id is None:
                    self.locked_id = sorted_lower_boxes[0][0].item()  # Sadece ID değerini float/int olarak al
                    self.get_logger().info(f"Yeni Hedef Kilitlendi: ID {self.locked_id}")
                    self.old_lock.append(self.locked_id)

                # Sending location of the target
                if self.locked_id is not None and self.locked_id in current_ids:
                    idx = current_ids.index(self.locked_id)
                    self.goal_position = GoalPosition()
                    
                    x, y, w, h = r.boxes.xywh[idx].tolist()
                    self.goal_position.x = int(x)
                    self.goal_position.y = int(y)
                    self.goal_position.w = int(w)
                    self.goal_position.h = int(h)
                    
                    self.motor_pub.publish(self.goal_position)
                    # self.get_logger().info(f"Yayınlanan Pozisyon: ({int(x)}, {int(y)})")
            self.get_logger().info(f"Old locked IDs: {self.old_lock}")


def main(args=None):
    rclpy.init(args=None)
    camera_subscriber = Camera_subscriber()
    rclpy.spin(camera_subscriber)
    rclpy.shutdown()

if __name__ == '__main__':
    main()