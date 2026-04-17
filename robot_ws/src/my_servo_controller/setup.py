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
        
        # 1. Launch dosyalarını kopyala (Zaten eklemişsin, harika)
        (os.path.join('share', package_name, 'launch'), glob(os.path.join('launch', '*launch.[pxy][yma]*'))),
        
        # 2. Config/Parametre dosyalarını kopyala (YAML dosyaları için)
        (os.path.join('share', package_name, 'config'), glob(os.path.join('config', '*.yaml'))),
        
        # 3. Gazebo Simülasyon Dosyalarını kopyala (URDF, xacro, world dosyaları)
        (os.path.join('share', package_name, 'urdf'), glob(os.path.join('urdf', '*.*'))),
        (os.path.join('share', package_name, 'worlds'), glob(os.path.join('worlds', '*.*'))),
        
        # 4. Flask Web Arayüzü Dosyalarını kopyala (HTML, CSS, JS)
        (os.path.join('share', package_name, 'templates'), glob(os.path.join('templates', '*.*'))),
        (os.path.join('share', package_name, 'static'), glob(os.path.join('static', '*.*'))),

        # 5. YOLO Modellerini kopyala (Eğer .pt dosyalarını paketin içinde tutuyorsan)
        (os.path.join('share', package_name, 'models'), glob(os.path.join('models', '*.pt'))),
    ],
    install_requires=['setuptools'],
    zip_safe=True,
    maintainer='rasp',
    maintainer_email='rasp@todo.todo',
    description='Servo and Vision Control Package for Humanoid Robot Head',
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
            "topic_controller_node = my_servo_controller.topic_controller:main",
            "flask_controller_node = my_servo_controller.flask_controller:main",
            "yolov8_ros2_pt_node = my_servo_controller.yolov8_ros2_pt:main",
            "yolov8_ros2_video_node = my_servo_controller.yolov8_ros2_video:main",
            "yolov8_subscriber_node = my_servo_controller.yolov8_ros2_subscriber:main",
            "head_controller_node = my_servo_controller.head_controller:main",
        ],
    },
)