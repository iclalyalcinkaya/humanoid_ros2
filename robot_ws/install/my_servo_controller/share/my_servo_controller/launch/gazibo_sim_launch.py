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
            executable='gazibo_sim_node',
            name='gazibo_sim_server',
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
            cmd=['python3', '-m', 'http.server'],
            cwd='../webpages',
            output='screen'
        ),
    ])
