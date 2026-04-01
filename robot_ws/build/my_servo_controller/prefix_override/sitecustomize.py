import sys
if sys.prefix == '/usr':
    sys.real_prefix = sys.prefix
    sys.prefix = sys.exec_prefix = '/home/rasp/humanoid_ros2/robot_ws/install/my_servo_controller'
