import sys
if sys.prefix == '/usr':
    sys.real_prefix = sys.prefix
    sys.prefix = sys.exec_prefix = '/home/rasp/humanoid/robot_ws/install/ros_gz_h1_controller'
