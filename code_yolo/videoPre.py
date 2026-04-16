from ultralytics import YOLO

locked_id = None

model = YOLO('yolov8n.pt')
#model = YOLO('yolov8n-cls.pt')

#model.predict(source='1', save=True, conf=0.5, save_txt=False)

#results = model(source='walking_people.mp4', save=True, conf=0.5, save_txt=False, stream=True)
results = model.track(source='walking_people.mp4', save_frames=True, stream=True, persist=True, classes=[0])  # Tracking with default tracker
#results = model.track("https://youtu.be/LNwODJXcvt4", show=True, tracker="bytetrack.yaml")  # with ByteTrack


for result in results:
    #xywh = result.boxes.xywh # center-x, center-y, width, height

    if result.boxes.is_track:
        if locked_id is not None and not(locked_id in result.boxes.id):
            locked_id = None  # Reset locked ID if it's not in the current frame
            # move to home position
        if locked_id is None and any(cls == 0 for cls in result.boxes.cls.int()):
            sorted_hight_boxes = sorted(zip(result.boxes.id, result.boxes.xywh), key=lambda x: x[1][3], reverse=True)
            sorted_lower_boxes = sorted(zip(result.boxes.id, result.boxes.xywh), key=lambda x: x[1][2], reverse=False)

            # lock after moving to home position
            # locked_id = result.boxes.id[-1]
            locked_id = sorted_lower_boxes[0][0]  # Lock the ID of the person with the highest box
        print(f"Locked ID: {locked_id}")
        print(f"Current IDs: {result.boxes.id}")
    else:
        print("Tracking is not enabled for these boxes.")

    for i in range(len(result.boxes.id)):
        if locked_id is not None and result.boxes.id[i] == locked_id:
            x, y, w, h = result.boxes.xywh[i]
            print(f"Locked person position: ({x}, {y}), size: ({w}, {h})")
            break  # Exit the loop after finding the locked ID

    #print(result.orig_shape) (1080, 1920)

#print(xywh)
#print(xywhn)
#print(names)
