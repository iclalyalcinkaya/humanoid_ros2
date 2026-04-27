# HUMANOID ROBOT WITH ROS2

[![Watch the video](https://img.youtube.com/vi/22f95dgRXwM/0.jpg)](https://youtube.com/shorts/22f95dgRXwM)

## LAUNCHING
### GEREKSİNİMLER
* ROS2
* Colcon
* Gazebo (Eğer simülasyon çalıştırılacaksa)
* `rosbridge_suite` paketi
* Python kütüphanesi: `adafruit-circuitpython-servokit` ve `lgpio`
* HTML için [ROS2 kütüphanesi (ROS2LIBJS)](https://github.com/6RiverSystems/ros2libjs)
```
git clone https://github.com/iclalyalcinkaya/humanoid_ros2.git
```
```
cd humanoid_ros2/robot_ws/
colcon build
source install/setup.bash 
```
Action mantığı ile çalıştırmak isteniliyorsa:
```
ros2 launch my_servo_controller action_controller_launch.py
```
Topic mantığı ile çalıştırmak isteniliyorsa:
```
ros2 launch my_servo_controller topic_controller_launch.py
```
[Web sayfası](http://localhost:8000/)

<img src="https://github.com/iclalyalcinkaya/humanoid_ros2/blob/main/assets/API_visual.png" alt="Webpage" width="50%"/>

IP adresini gir ve bağlan.

## GÜÇ ALDIĞI ANDA ÇALIŞMASI İÇİN
Terminalde:
```
nano /home/<username>/start_controller.sh
```
Dosya içine:
```
#!/bin/bash

# 1. Source the core ROS 2 Jazzy installation
source /opt/ros/jazzy/setup.bash

# 2. Source your specific robot workspace
source /home/<username>/humanoid_ros2/robot_ws/install/setup.bash

# 4. Launch your servo controller
ros2 launch my_servo_controller topic_controller_launch.py
```
Terminalde:
```
sudo nano /etc/systemd/system/servo_controller.service
```
Dosya içine:
```
[Unit]
Description=ROS 2 Servo Topic Controller
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
User=<username>
WorkingDirectory=/home/<username>/humanoid_ros2/robot_ws
ExecStart=/bin/bash /home/<username>/start_controller.sh
Restart=on-failure
RestartSec=5

[Install]
WantedBy=multi-user.target
```
Terminalde:
```
sudo systemctl daemon-reload
sudo systemctl enable servo_controller.service
sudo systemctl start servo_controller.service
```

### KULLANILABİLECEK KOMUTLAR
* Çıktıları okuyabilmek için: `journalctl -u servo_controller.service -f`
* Başlangıçta çalışmasını durdurmak için: `sudo systemctl disable servo_controller.service`
* Başlangıçta çalışmasını başlatmak için: `sudo systemctl enable servo_controller.service`
* Anlık çalışma durumunu öğrenmek için: `sudo systemctl status servo_controller.service`
* Başlatmak için: `sudo systemctl start servo_controller.service`
* Durdurmak için: `sudo systemctl stop servo_controller.service`
* Durdurup başlatmak için:`sudo systemctl restart servo_controller.service`

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

[ServoKit GitHub](https://github.com/adafruit/Adafruit_CircuitPython_ServoKit)
[ServoKit API](https://docs.circuitpython.org/projects/servokit/en/latest/index.html)

## SERVICE, ACTION VEYA TOPİC
Motor açılarının komutlarını göndermek için action kullanmak daha mantıklı oluyor. Services senkron olarak çalışır ve bir sonraki isteği göndermek için öncekinin bitmesi bekler. İsteği gönderdikten sonra süreç hakkında bir bilgisi olmaz. 

Actions asenkron olarak çalışır, bir hedef gönderdikten sonra farklı şeylerle uğraşabilir. Farklı bir hedef gönderebilir veya önceki hedefi durdurabilir. Süreç sırasında ise server sürekli bir feedback gönderebilir.

Action çalışma şeklinde modların çalışma iç algoritmaları API tarafından yapılmakta. Topic kontrolde ise mod algoritmalarını Raspberry Pi yapmakta. Böylelikle robota sadece hangi modda çalışmasını istediğini söylemek yeterli oluyor ve robot kendi içinde mod algoritmsını çalıştırıyor. 
Bu Rosbridge üzerinde oluşabilecek hataları önlemek, daha hızlı mesaj iletimi sağlaması ve tek yönlü çalışması (feedback yok) nedeniyle daha az internet ve CPU gücü kullanması adına güzel bir yöntem ancak topic kontrolde hazırda bir feedback ve cancel sistemi bulunmaz. Bunlar için ayrıyetten koda eklemeler yapılması gerekir.

## ACTION SERVER CLIENT BAĞLANTISI
Veri iletiminde API action client gibi davranırken ros server gibi davranıyor.
Bu ikisi arasındaki bağlantı rosbridge_server ile kuruluyor.

API istenilen posizyon verilerini goal olarak ros’a gönderiyor. Ros PID ile motorları hareket ettiriyor.

Action kullanılmasının nedeni yeni bir goal geldiğinde eskisini terk edebilmek.

## DIRECTORY TREE
humanoid_ros2/
├── robot_ws/                  # ROS 2 Çalışma Alanı
│   ├── src/
│   │   ├── my_servo_controller/ # Ana kontrol düğümleri
│   │   └── ros_gz_h1_bringup/   # Gazebo simülasyon dosyaları
├── webpages/                  # Web API ve Arayüz dosyaları
│   ├── index.html
│   └── action_index.html
└── assets/                    # Görseller ve medya

## ACTION SERVER
/humanoid_ros2/robot_ws/src/my_servo_controller/my_servo_controller/action_controller.py

Motor sınırlarını ve motor başlangıç değerleri buradan ayarlanabilir.

Hedef mesajının içinde bir client id gönderilir ve bir id tanımlıyken başka bir client tarafından gönderilen hedefleri reddeder. Aynı zamanda rosbridge server tarafına bağlı olan client bilgilerini kontrol eder. Bağlantı sayısında bir değişim olduğunda bağlı olduğu client hala aktif mi doğrular. Aktif değil ise tanımlı client değiştirilir. Tanımlı cihaz değiştirilirse aktif olan hedefler iptal edilir.

Mesajda yer alan bilgileri motor sınırları açısından kontrol eder. Motoru istenilen adım boyutuyla hedefe ilerletir. 

Birden fazla motorun aynı anda hareketi için MultiThreadedExecutor ve 
ReentrantCallbackGroup mantıkları kullanılıyor. 

Başlangıçta motor açılarından oluşan bir Dictionary oluşturulur. Değişen motor açı değeri buraya kaydedilerek motorlar paralel çalıştırılabilirler.

## ACTION CLIENT
/humanoid_ros2/webpages/action_index.html

API client olarak davranır. Buradan Kullanılacaksa PID parametreleri veya adım hızı ayarlanabilir.

Bağlanılacak olan Raspberry Pi IP adresi girilerek bağlantı başlatılır. İlk bağlantı sırasında bir client id oluşturularak gönderilir.

Robotun belirli modlar için motor açılar "modeAngles" olarak burada bulunur. 
Modları etkinleştiren, robotu durduran butonlar ve bütün motorların tek tek ayarlanabileceği elemanlar bulunur. 

Komut döngüsü içerisinde aynı anda hareket etmeleri gerekmiyorsa bir birlerinin hareketinin bitmesini bekler. Aynı zamanda alınan feedback sayesinde motor konumu ekrana anlık olarak yazdırılır.

Verilen komuta göre server’a bir hedef gönderir. Bir hedefin ortasında yeni bir hedef gönderilirse önceki hedef iptal edilir.

## TOPIC CONTOLLER 
/humanoid_ros2/robot_ws/src/my_servo_controller/my_servo_controller/topic_controller.py
Motorların açı sınırları ve başlangıç konumları buradan ayarlanır.
Mod döngü hesaplamaları burada yapılır. Eğer bir sorun çıkarsa kendi içinde halledilir.

/home/rasp/humanoid_ros2/webpages/index.html
Web arayüzünden simülasyon, mod ve hedef bilgisi yayınlanır. Bir hesaplama yapılmaz.

## POZ VERME
Sürekli bir hareket olmadığından motorlar belirlenen açılara götürülür.

Pozdan sonra diğer hareketlere geçerken eklemlerin oynatma sıralarına dikkat edilmeli. Aksi halde çarpışma gerçekleşebilir.

Diğer durumlarda sol koldan harekete başlarken bunda sağ koldan harekete başlıyor.

## EL SALLAMA
Önce belirlenen başlangıç konumuna getirilir.

Ardından adım hızı belirlenerek belirli iki açı arasında dirsek eklemi git gel yaptırılır.

## KONUŞMA
Önce belirlenen pozisyona getirilir. Ardından omuz ve dirsek beraber oynatılır.

## SİMÜLASYON
```
cd robot_ws/
colcon build
source install/setup.bash
ros2 launch ros_gz_h1_bringup h1_gazebo_sim.launch.py 
```
Action mantığı ile çalıştırmak isteniliyorsa farklı bir terminalde:
```
ros2 launch my_servo_controller action_controller_launch.py
```
Topic mantığı ile çalıştırmak isteniliyorsa farklı bir terminalde:
```
ros2 launch my_servo_controller topic_controller_launch.py
```
[Web sayfası](http://localhost:8000/)

IP adresini gir ve bağlan.
Simülasyon aktivasyon butonuna bas.

## YOLOv8
YOLOv8 kullanılarak robotun kafası ile önünden geçen insanları takip edebilecek bir algoritma hazırlanmıştır.

yolov8_ros2_pt_node ile kameradan alınan görüntü işlenir ve önünde bulunan insanları tespit eder. En yakında bulunan kişinin merkeze olan uzaklığını   kontrol düğümüne gönderir. Kontrol düğümü ise bu uzaklığa göre kafayı yönlendirir.

Çalışabilmesi için YOLO kütüphanesinin yüklenmesi gerekmekte.

```
ros2 launch my_servo_controller head_with_yolo_launch.py 
```

## OLUŞABİLECEK SORUNLAR  
Çarpmayı algılayamadan devam edebilir. Onun için bir hata durumu koymalı veya acil durum butonu yeterli olur.

Launch dosyası olarak çalıştırınca ve düzgün bir şekilde kapatılmaz ise node durmuyor. Hayalet olarak çalışmaya devam ediyor.

İnsan takibi sırasında Kp değeri uygun ayarlanmazsa overshoot yaparak ortalamayabilir veya hareket yavaş kaldığı için hedefi takip edemeyebilir.

## DAHA FAZLA
[Orijinal](https://github.com/K-d4wg/ros2_heinz) Unitree H1 simülasyon modeline eklemeler yapılmıştır.
* **Özel Boyun Eklemi:** Orijinal modelde bulunmayan, 2 eksenli (Pan/Tilt) özel bir boyun ve kafa (cylinder/sphere) sisteme fiziksel ve görsel olarak entegre edildi.
* **Bileklerin Serbest Bırakılması:** İşlemci yükünü azaltmak için orijinal repository'de `fixed` (sabit) olarak ayarlanan bilek eklemleri `revolute` olarak değiştirilip aktifleştirildi.
* **PID Tuning:** Düşük ataletli (low-inertia) bileklerin yerçekimi altında düşmemesi ve titrememesi (oscillation) için Gazebo'nun `JointPositionController` eklentileri sisteme dahil edildi. Kp (Yay) ve Kd (Sönümleyici) değerleri optimize edilerek simülasyon stabil hale getirildi.
