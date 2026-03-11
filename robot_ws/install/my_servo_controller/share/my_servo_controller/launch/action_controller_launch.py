from launch import LaunchDescription
from launch_ros.actions import Node
import os
from ament_index_python import get_package_share_directory

from launch.actions import IncludeLaunchDescription, ExecuteProcess
from launch_xml.launch_description_sources import XMLLaunchDescriptionSource

def generate_launch_description():
    return LaunchDescription([
        Node(
            package='my_servo_controller',
            namespace='',
            executable='action_controller_node',
            name='servo_action_server',
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
            cmd=['/home/rasp/venv/bin/python3', '-m', 'http.server'],
            cwd='/home/rasp/webpages',
            output='screen'
        ),
    ])
