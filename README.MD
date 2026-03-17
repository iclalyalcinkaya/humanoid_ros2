# HUMANOID ROBOT WITH ROS2

[![Watch the video](https://img.youtube.com/vi/22f95dgRXwM/0.jpg)](https://youtube.com/shorts/22f95dgRXwM)

## LAUNCHING
# GEREKSİNİMLER
* ROS2
* Gazebo (Eğer simülasyon çalıştırılacaksa)
* `rosbridge_suite` paketi
* Python kütüphanesi: `pip install adafruit-circuitpython-servokit`

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

## ACTION SERVER
Motor sınırlarını ve motor başlangıç değerleri buradan ayarlanabilir.

Hedef mesajının içinde bir client id gönderilir ve bir id tanımlıyken başka bir client tarafından gönderilen hedefleri reddeder. Aynı zamanda rosbridge server tarafına bağlı olan client bilgilerini kontrol eder. Bağlantı sayısında bir değişim olduğunda bağlı olduğu client hala aktif mi doğrular. Aktif değil ise tanımlı client değiştirilir. Tanımlı cihaz değiştirilirse aktif olan hedefler iptal edilir.

Mesajda yer alan bilgileri motor sınırları açısından kontrol eder. Motoru istenilen adım boyutuyla hedefe ilerletir. 

Birden fazla motorun aynı anda hareketi için MultiThreadedExecutor ve 
ReentrantCallbackGroup mantıkları kullanılıyor. 

Başlangıçta motor açılarından oluşan bir Dictionary oluşturulur. Değişen motor açı değeri buraya kaydedilerek motorlar paralel çalıştırılabilirler.

## ACTION CLIENT
API client olarak davranır. Buradan Kullanılacaksa PID parametreleri veya adım hızı ayarlanabilir.

Bağlanılacak olan Raspberry Pi IP adresi girilerek bağlantı başlatılır. İlk bağlantı sırasında bir client id oluşturularak gönderilir.

Robotun belirli modlar için motor açılar "modeAngles" olarak burada bulunur. 
Modları etkinleştiren, robotu durduran butonlar ve bütün motorların tek tek ayarlanabileceği elemanlar bulunur. 

Komut döngüsü içerisinde aynı anda hareket etmeleri gerekmiyorsa bir birlerinin hareketinin bitmesini bekler. Aynı zamanda alınan feedback sayesinde motor konumu ekrana anlık olarak yazdırılır.

Verilen komuta göre server’a bir hedef gönderir. Bir hedefin ortasında yeni bir hedef gönderilirse önceki hedef iptal edilir.

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
ros2 launch my_servo_controller gazibo_sim_launch.py
```
[Web sayfası](http://localhost:8000/)

IP adresini gir ve bağlan.

## OLUŞABİLECEK SORUNLAR  
Çarpmayı algılayamadan devam edebilir. Onun için bir hata durumu koymalı veya acil durum butonu yeterli olur.

Launch dosyası olarak çalıştırınca ve düzgün bir şekilde kapatılmaz ise node durmuyor. Hayalet olarak çalışmaya devam ediyor.

## DAHA FAZLA
[Orijinal](https://github.com/K-d4wg/ros2_heinz) Unitree H1 simülasyon modeline eklemeler yapılmıştır.
* **Özel Boyun Eklemi:** Orijinal modelde bulunmayan, 2 eksenli (Pan/Tilt) özel bir boyun ve kafa (cylinder/sphere) sisteme fiziksel ve görsel olarak entegre edildi.
* **Bileklerin Serbest Bırakılması:** İşlemci yükünü azaltmak için orijinal repository'de `fixed` (sabit) olarak ayarlanan bilek eklemleri `revolute` olarak değiştirilip aktifleştirildi.
* **PID Tuning:** Düşük ataletli (low-inertia) bileklerin yerçekimi altında düşmemesi ve titrememesi (oscillation) için Gazebo'nun `JointPositionController` eklentileri sisteme dahil edildi. Kp (Yay) ve Kd (Sönümleyici) değerleri optimize edilerek simülasyon stabil hale getirildi.
