from ultralytics import YOLO

x, y, w, h = None, None, None, None
locked_id = None
wait_counter = 0
old_lock = []
#model = YOLO('yolov8n.pt')
model = YOLO('/home/rasp/humanoid_ros2/robot_ws/yolov8n_ncnn_model', task='detect')

#model = YOLO('yolov8n-cls.pt')

#model.predict(source='1', save=True, conf=0.5, save_txt=False)

#results = model(source='walking_people.mp4', save=True, conf=0.5, save_txt=False, stream=True)
results = model.track(source='walking7.mp4',save=True, save_frames=True, conf=0.6, stream=True, persist=True, classes=[0], show_conf=False)  # Tracking with default tracker
#results = model.track("https://youtu.be/LNwODJXcvt4", show=True, tracker="bytetrack.yaml")  # with ByteTrack


for result in results:
    #xywh = result.boxes.xywh # center-x, center-y, width, height

    if result.boxes.is_track:
        if locked_id is not None and not(locked_id in result.boxes.id):
            #locked_id = None  # Reset locked ID if it's not in the current frame
            # move to home position
            if x is not None:
                wait_counter += 1
            if x > 1800 or x < 100 or x == None or wait_counter > 15:
                wait_counter = 0     
                locked_id = None

        if locked_id is None and any(cls == 0 for cls in result.boxes.cls.int()):
            #sorted_hight_boxes = sorted(zip(result.boxes.id, result.boxes.xywh), key=lambda x: x[1][3], reverse=True)
            #sorted_lower_mid_boxes = sorted(zip(result.boxes.id, result.boxes.xywh), key=lambda x: x[1][2], reverse=False)
            sorted_lower_boxes = sorted(zip(result.boxes.id, result.boxes.xyxy), key=lambda x: x[1][3], reverse=True)
            print(f"result.boxes.xyxy: {result.boxes.xyxy}")
            #print(f"Sorted lower boxes: {sorted_lower_boxes}")
            # lock after moving to home position
            # locked_id = result.boxes.id[-1]
            locked_id = sorted_lower_boxes[0][0]  # Lock the ID of the person with the highest box
            old_lock.append(locked_id.item())
        #print(f"Locked ID: {locked_id}")
        #print(f"Current IDs: {result.boxes.id}")
    else:
        print("Tracking is not enabled for these boxes.")
    if locked_id is not None:
        for i in range(len(result.boxes.id)):
            if locked_id is not None and result.boxes.id[i] == locked_id:
                x, y, w, h = result.boxes.xywh[i]
                print(f"Locked person position: ({x}, {y}), size: ({w}, {h})")
                break  # Exit the loop after finding the locked ID

    #print(result.orig_shape) (1080, 1920)
    print(f"Old locked IDs: {old_lock}")
#print(xywh)
#print(xywhn)
#print(names)
