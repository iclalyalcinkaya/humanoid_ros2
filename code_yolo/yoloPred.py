from ultralytics import YOLO

model = YOLO('yolov8n.pt')
#model = YOLO('yolov8n-cls.pt')

#model.predict(source='bus.jpg', save=True, conf=0.5, save_txt=False)

results = model.track(source='walk1.jpg', save=True, conf=0.5, save_txt=False, classes=[0])

#print(results)

for result in results:
    xywh = result.boxes.xywh  # center-x, center-y, width, height
    xywhn = result.boxes.xywhn  # normalized
    xyxy = result.boxes.xyxy  # top-left-x, top-left-y, bottom-right-x, bottom-right-y
    xyxyn = result.boxes.xyxyn  # normalized
    names = [result.names[cls.item()] for cls in result.boxes.cls.int()]  # class name of each box
    confs = result.boxes.conf  # confidence score of each box

    if any(cls == 0 for cls in result.boxes.cls.int()):
        print("This is a person")

    #print(result.orig_shape)

#print(result.boxes.cls.int())
print(xywh)
print(f"Current IDs: {result.boxes.id}")
#print(xywhn)
#print(names)
