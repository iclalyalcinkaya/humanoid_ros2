#!/usr/bin/python

import websocket
import json
import sys

#PI_IP = "10.225.237.128" 
"""
def send_mode_to_robot(PI_IP,mode_num):
    # Connect directly to the rosbridge port
    ws = websocket.WebSocket()
    ws.connect(f"ws://{PI_IP}:9090")
    
    # Format the exact ROS 2 message rosbridge expects
    ros2_message = {
        "op": "publish",
        "topic": "/set_mode",
        "msg": {
            "mode": mode_num,
            "client_id": "computer_b_script"
        }
    }
    # Send it and close!
    ws.send(json.dumps(ros2_message))
    ws.close()
    print(f"Sent Mode {mode_num} to the robot!")

send_mode_to_robot("10.225.237.128", 1)
"""
ws = websocket.WebSocket()
ws.connect(f"ws://{sys.argv[1]}:9090")
    
    # Format the exact ROS 2 message rosbridge expects
ros2_message = {
    "op": "publish",
    "topic": "/set_mode",
    "msg": {
        "mode":int(sys.argv[2]),
        "client_id": "computer_b_script"
    }
}
    # Send it and close!
ws.send(json.dumps(ros2_message))
ws.close()
print(f"Sent Mode {sys.argv[2]} to the robot!")