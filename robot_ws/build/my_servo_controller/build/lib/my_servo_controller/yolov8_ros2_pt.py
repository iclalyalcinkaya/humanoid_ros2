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

        #self.model = YOLO('/home/rasp/humanoid_ros2/robot_ws/yolov8n_ncnn_model', task='detect')
        self.model = YOLO('yolov8n.pt')

        self.yolov8_inference = Yolov8Inference()

        self.subscription = self.create_subscription(
            Image,
            'rgb_cam/image_raw',
            self.camera_callback,
            1)
        self.subscription 

        self.yolov8_pub = self.create_publisher(Yolov8Inference, "/Yolov8_Inference", 1)
        self.img_pub = self.create_publisher(Image, "/inference_result", 1)
        self.motor_pub = self.create_publisher(GoalPosition, "/goal_position", 1)
        self.locked_id = None
        self.wait_counter = 0
        self.old_lock = []

    def camera_callback(self, data):

        img = bridge.imgmsg_to_cv2(data, "bgr8")
        #results = self.model.track(img, conf=0.6, classes=[0], persist=True, tracker="bytetrack.yaml", stream=True, show_conf=False, save=True, save_frames=True)
        results = self.model.track(img, conf=0.6, classes=[0], persist=True, tracker="botsort.yaml", stream=False, show_conf=False, save=True, save_frames=True)

        self.yolov8_inference.header.frame_id = "inference"
        self.yolov8_inference.header.stamp = self.get_clock().now().to_msg()

        for r in results:            
            boxes = r.boxes
            for box in boxes:
                self.inference_result = InferenceResult()
                b = box.xyxy[0].to('cpu').detach().numpy().copy()  # get box coordinates in (top, left, bottom, right) format
                c = box.cls
                d = box.id
                self.inference_result.class_name = self.model.names[int(c)]
                self.inference_result.top = int(b[0])
                self.inference_result.left = int(b[1])
                self.inference_result.bottom = int(b[2])
                self.inference_result.right = int(b[3])
                if d is not None:
                    self.inference_result.id_n = int(d)
                else:
                    self.inference_result.id_n = -1
                self.yolov8_inference.yolov8_inference.append(self.inference_result)
            """
            if r.boxes.is_track:
                if self.locked_id is not None and not(self.locked_id in r.boxes.id):
                    #self.locked_id = None  # Reset locked ID if it's not in the current frame
                    # move to home position
                    if x is not None:
                        self.wait_counter += 1
                    if x > 1800 or x < 100 or x == None or self.wait_counter > 15:
                        self.wait_counter = 0     
                        self.locked_id = None
                if self.locked_id is None and any(cls == 0 for cls in r.boxes.cls.int()):
                    #sorted_hight_boxes = sorted(zip(r.boxes.id, r.boxes.xywh), key=lambda x: x[1][3], reverse=True)
                    #sorted_lower_mid_boxes = sorted(zip(r.boxes.id, r.boxes.xywh), key=lambda x: x[1][2], reverse=False)
                    sorted_lower_boxes = sorted(zip(r.boxes.id, r.boxes.xyxy), key=lambda x: x[1][3], reverse=True)

                    # lock after moving to home position
                    # self.locked_id = r.boxes.id[-1]
                    self.locked_id = sorted_lower_boxes[0][0]  # Lock the ID of the person with the highest box
                    self.get_logger().info(f"Sorted high boxes: {sorted_lower_boxes}")
                    self.old_lock.append(self.locked_id.item())
                #self.get_logger().info(f"Locked ID: {self.locked_id}")
                #self.get_logger().info(f"Current IDs: {r.boxes.id}")
            else:
                self.get_logger().info("Tracking is not enabled for these boxes.")
            if self.locked_id is not None:
                for i in range(len(r.boxes.id)):
                    if self.locked_id is not None and r.boxes.id[i] == self.locked_id:
                        self.goal_position = GoalPosition()
                        self.goal_position.x, self.goal_position.y, self.goal_position.w, self.goal_position.h = r.boxes.xywh[i]
                        self.motor_pub.publish(self.goal_position)
                        self.get_logger().info(f"Locked person position: ({self.goal_position.x}, {self.goal_position.y}), size: ({self.goal_position.w}, {self.goal_position.h})")
                        break  # Exit the loop after finding the locked ID

            self.get_logger().info(f"Old locked IDs: {self.old_lock}")
            #camera_subscriber.get_logger().info(f"{self.yolov8_inference}")
            """
            if r.boxes.is_track and r.boxes.id is not None:
                # Tensor'u rahat arama yapmak için normal listeye çeviriyoruz
                current_ids = r.boxes.id.tolist()

                # 1. KİLİT DÜŞÜRME (UNLOCK) MANTIĞI
                if self.locked_id is not None:
                    if self.locked_id in current_ids:
                        # Hedef hala ekranda. x koordinatını xywh'den çekelim
                        idx = current_ids.index(self.locked_id)
                        x_center = r.boxes.xywh[idx][0].item()
                        
                        self.wait_counter = 0  # Gördüğümüz için sayacı sıfırla
                        
                        # Ekranın çok kenarlarına gittiyse kilidi bırak
                        if x_center > 1800 or x_center < 100:
                            self.locked_id = None
                            self.wait_counter = 0
                    else:
                        # Hedef ekranda yok, sayacı artır
                        self.wait_counter += 1
                        if self.wait_counter > 15:
                            self.wait_counter = 0
                            self.locked_id = None

                # 2. YENİ HEDEF KİLİTLEME MANTIĞI
                if self.locked_id is None and any(cls == 0 for cls in r.boxes.cls.int()):
                    sorted_lower_boxes = sorted(zip(r.boxes.id, r.boxes.xyxy), key=lambda x: x[1][3], reverse=True)
                    self.locked_id = sorted_lower_boxes[0][0].item()  # Sadece ID değerini float/int olarak al
                    self.get_logger().info(f"Yeni Hedef Kilitlendi: ID {self.locked_id}")
                    self.old_lock.append(self.locked_id)

                # 3. KİLİTLİ HEDEFİN MOTORLARA GÖNDERİLMESİ
                if self.locked_id is not None and self.locked_id in current_ids:
                    idx = current_ids.index(self.locked_id)
                    self.goal_position = GoalPosition()
                    
                    # xywh tensoründen değerleri çekip int'e çevirerek yayınla
                    x, y, w, h = r.boxes.xywh[idx].tolist()
                    self.goal_position.x = int(x)
                    self.goal_position.y = int(y)
                    self.goal_position.w = int(w)
                    self.goal_position.h = int(h)
                    
                    self.motor_pub.publish(self.goal_position)
                    # self.get_logger().info(f"Yayınlanan Pozisyon: ({int(x)}, {int(y)})")
            self.get_logger().info(f"Old locked IDs: {self.old_lock}")

        annotated_frame = results[0].plot()
        img_msg = bridge.cv2_to_imgmsg(annotated_frame)  

        self.img_pub.publish(img_msg)
        self.yolov8_pub.publish(self.yolov8_inference)
        self.yolov8_inference.yolov8_inference.clear()

def main(args=None):
    rclpy.init(args=None)
    camera_subscriber = Camera_subscriber()
    rclpy.spin(camera_subscriber)
    rclpy.shutdown()

if __name__ == '__main__':
    main()