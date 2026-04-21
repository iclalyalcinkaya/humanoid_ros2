from launch import LaunchDescription
from launch_ros.actions import Node
import os
from ament_index_python import get_package_share_directory

from launch.actions import IncludeLaunchDescription, ExecuteProcess
from launch_xml.launch_description_sources import XMLLaunchDescriptionSource

from launch.actions import AppendEnvironmentVariable

def generate_launch_description():
    html_folder_path = '/home/rasp/humanoid_ros2/webpages'
    return LaunchDescription([
        AppendEnvironmentVariable(
            'PYTHONPATH',
            '/home/rasp/humanoid_ros2/yolo_env/lib/python3.12/site-packages'
        ),
        Node(
            package='my_servo_controller',
            namespace='',
            executable='topic_controller_node',
            name='servo_topic_server',
            output='screen'
        ),
        Node(
            package='my_servo_controller',
            namespace='',
            executable='yolov8_ros2_pt_node',
            name='yolov8_ros2_pt_node',
            output='screen'
        ),
        IncludeLaunchDescription(
            XMLLaunchDescriptionSource(
                os.path.join(
                    get_package_share_directory("rosbridge_server"),
                    "launch/rosbridge_websocket_launch.xml",
                )
            )
        ),
        ExecuteProcess(
            cmd=['python3', '-m', 'http.server', '--directory', html_folder_path],
            #cwd=html_folder_path, #html folder
            output='screen'
        ),
        Node(
            package='usb_cam',
            executable='usb_cam_node_exe',
            name='usb_cam',
            output='screen',
            parameters=[
                {'video_device': '/dev/video0'}, # Kameranın Linux'taki varsayılan adresi
                {'framerate': 10.0},             # Sistemi yormamak için 10 FPS ile sınırlıyoruz
                {'image_width': 640},            # Çözünürlük genişliği
                {'image_height': 480},           # Çözünürlük yüksekliği
                {'pixel_format': 'mjpeg2rgb'}         # Logitech kameralar için en stabil format
            ],
        ),
    ])
