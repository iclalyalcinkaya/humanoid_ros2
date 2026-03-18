from setuptools import find_packages, setup
import os
from glob import glob

package_name = 'my_servo_controller'

setup(
    name=package_name,
    version='0.0.0',
    packages=find_packages(exclude=['test']),
    data_files=[
        ('share/ament_index/resource_index/packages',
            ['resource/' + package_name]),
        ('share/' + package_name, ['package.xml']),
        (os.path.join('share', package_name, 'launch'), glob(os.path.join('launch', '*launch.[pxy][yma]*'))),
    ],
    install_requires=['setuptools'],
    zip_safe=True,
    maintainer='rasp',
    maintainer_email='rasp@todo.todo',
    description='TODO: Package description',
    license='TODO: License declaration',
    extras_require={
        'test': [
            'pytest',
        ],
    },
    entry_points={
        'console_scripts': [
            "servo_controller_node = my_servo_controller.servo_controller:main",
            "servo_mover_node = my_servo_controller.servo_mover:main",
            "action_controller_node = my_servo_controller.action_controller:main",
            "gazibo_sim_node = my_servo_controller.gazibo_sim:main",
            "topic_controller_node = my_servo_controller.topic_controller:main"
        ],
    },
)
