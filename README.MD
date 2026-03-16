# HUMANOID ROBOT WITH ROS2

    [![Gazibo Sim](https://raw.githubusercontent.com/iclalyalcinkaya/humanoid_ros2/blob/main/assets/gazivo_mod_ss.png)](https://raw.githubusercontent.com/iclalyalcinkaya/humanoid_ros2/blob/main/assets/gazibo_mods_1.mp4)

## LAUNCHING
```
git clone https://github.com/iclalyalcinkaya/humanoid_ros2.git
```
```
cd robot_ws/
colcon build
source install/setup.bash 
ros2 launch my_servo_controller action_controller_launch.py
```
[Web sayfası](http://localhost:8000/)

IP adresini gir ve bağlan.

## ROS2LIBJS
HTML yazarken eski roslibjs kullanıldığında action veri paket isimlendirme şekli ROS’tan ROS2’ye değiştiğinden hata veriyordu. Bu yüzden farklı bir paket kullanılması gerekiyordu.

HTML için [ROS2 kütüphanesi](https://github.com/6RiverSystems/ros2libjs)

## SERVOKIT
Kaç tane servo kanalı olduğu belirtilir (8 veya 16)
Hangi I2C kanalı kullanıldığı belirtilebilir.
Farklı bir I2C adresi kullanılıyorsa belirtilebilir.
Referans saat hızı hertz cinsinden belirtilebilir
PWM frekansı ayarlanabilir.
İstenilen kanaldaki servonun açısı değiştirilebilir.

[ServoKit API](https://docs.circuitpython.org/projects/servokit/en/latest/index.html)

## SERVICE VEYA ACTION
Motor açılarının komutlarını göndermek için action kullanmak daha mantıklı oluyor. Services senkron olarak çalışır ve bir sonraki isteği göndermek için öncekinin bitmesi bekler. İsteği gönderdikten sonra süreç hakkında bir bilgisi olmaz. 

Actions asenkron olarak çalışır, bir hedef gönderdikten sonra farklı şeylerle uğraşabilir. Farklı bir hedef gönderebilir veya önceki hedefi durdurabilir. Süreç sırasında ise server sürekli bir feedback gönderebilir.

## ACTION SERVER CLIENT BAĞLANTISI
Veri iletiminde API action client gibi davranırken ros server gibi davranıyor.
Bu ikisi arasındaki bağlantı rosbridge_server ile kuruluyor.

API istenilen posizyon verilerini goal olarak ros’a gönderiyor. Ros PID ile motorları hareket ettiriyor.

Action kullanılmasının nedeni yeni bir goal geldiğinde eskisini terk edebilmek.

## POZ VERME
Sürekli bir hareket olmadığından motorlar belirlenen açılara götürülür.

Pozdan sonra diğer hareketlere geçerken eklemlerin oynatma sıralarına dikkat edilmeli. Aksi halde çarpışma gerçekleşebilir.

Diğer durumlarda sol koldan harekete başlarken bunda sağ koldan harekete başlıyor.

## EL SALLAMA
Önce belirlenen başlangıç konumuna getirilir.

Ardından adım hızı belirlenerek belirli iki açı arasında dirsek eklemi git gel yaptırılır.

## KONUŞMA
Önce belirlenen pozisyona getirilir. Ardından omuz ve dirsek beraber oynatılır.

Birden fazla motorun aynı anda hareketi için MultiThreadedExecutor kullanılıyor. 

Başlangıçta motor açılarından oluşan bir Dictionary oluşturulur. Değişen motor açı değeri buraya kaydedilerek motorlar paralel çalıştırılabilirler.

## SİMÜLASYON
```
cd robot_ws/
colcon build
source install/setup.bash 
ros2 launch my_servo_controller gazibo_sim_launch.py
```
[Web sayfası](http://localhost:8000/)

IP adresini gir ve bağlan.

## GÜVENLİK ÖNLEMLERİ

Motor sınırlarını [action_controller.py](https://github.com/iclalyalcinkaya/humanoid_ros2/blob/main/robot_ws/src/my_servo_controller/my_servo_controller/action_controller.py) içinde yer alan "MOTOR_ANGLE_LIMITS" matris değerlerini değiştirerek ayarlanabilir.

Robot Başlangış konumları [action_controller.py](https://github.com/iclalyalcinkaya/humanoid_ros2/blob/main/robot_ws/src/my_servo_controller/my_servo_controller/action_controller.py) içinde yer alan "MOTOR_START_ANGLES" dictionary değerlerini değiştirerek ayarlanabilir.

Goal mesajının içinde bir client id gönderilir ve bir id tanımlıyken başka bir client tarafından gönderilen hedefleri reddeder. Aynı zamanda rosbridge server tarafına bağlı olan client bilgilerini kontrol eder. Bağlantı sayısında bir değişim olduğunda bağlı olduğu client hala aktif mi doğrular. Aktif değil ise tanımlı client değiştirilir.



## OLUŞABİLECEK SORUNLAR  
Çarpmayı algılayamadan devam edebilir. Onun için bir hata durumu koymalı veya acil durum butonu yeterli olur.

Launch dosyası olarak çalıştırınca ve düzgün bir şekilde kapatılmaz ise node durmuyor. Hayalet olarak çalışmaya devam ediyor.
