# HUMANOID ROBOT WITH ROS2

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
Veri iletiminde internet sayfası action client gibi davranırken ros server gibi davranıyor.
Bu ikisi arasındaki bağlantı rosbridge_server ile kuruluyor.

Api istenilen posizyon verilerini goal olarak ros’a gönderiyor. Ros PID ile motorları hareket ettiriyor.

Action kullanılmasının nedeni yeni bir goal geldiğinde eskisini terk edebilmek.

## POZ VERME
Sürekli bir hareket olmadığından motorlar belirlenen açılara götürülür.

Pozdan sonra diğer hareketlere geçerken eklemlerin oynatma sıralarına dikkat edilmeli. Aksi halde çarpışma gerçekleşebilir.

Diğer durumlarda sağ koldan harekete başlarken bunda sol koldan harekete başlıyor.

Sağ kol aynı anda sol kol aynı anda ama bir kol diğer kolun hareketinin bitirmesini bekleyecek şeklinde ilerleyebilir.

## EL SALLAMA
PID sayesinde yavaş hareket ettiğinden belirli iki açı arasında dirsek git gel yaptırılabilir.

Veya bir sin dalgası şeklinde belli aralıklarla açılar gönderilebilir.

## KONUŞMA
Önce belirlenen pozisyona getirilir. Ardından omuz ve dirsek beraber dairesel olarak oynatılır.

Birden fazla motorun aynı anda hareketi için MultiThreadedExecutor kullanılıyor. Başlangıçta motor açılarından oluşan bir Dictionary oluşturuyor. Sadece açısı değişen motorun değerini değiştirerek paralel çalışıyorlar.

İşlem sonunda bir json dosyasına motor açılarını yazıyor. Yazdığı dosyanın içindeki açıları okuyarak işlem yapmıyor.

## OLUŞABİLECEK SORUNLAR  
Son konumlarını bir dosyanın içine kaydediyor. Robot kapalı iken elle oynatılırsa terar açıldığında kayıtlı noktaya ivmeli bir hareket yapar.
Home pozisyonuna gitmesini sağlayacak bir tuş eklendi. Bu durumda açılmadan önce elle home pozisyonunun yakınlarına elle getirilmesi durumunda çarpışma yaşama ihtimali azalır. İlk çalıştırıldığında dosyaya home pozisyon açılarını yazıyor.

Çarpmayı algılayamadan devam edebilir. Onun için bir hata durumu koymalı veya acil durum butonu yeterli olur.

Launch dosyası olarak çalıştırınca ve düzgün bir şekilde kapatılmaz ise node durmuyor. Hayalet olarak çalışmaya devam ediyor.

İki farklı client aynı motor için istek göndermesine karşı hedefle beraber client id bilgisi de gönderiliyor.

Çok fazla goal peş peşe gönderilince rosbridge server client bağlantısını tekrar tekrar kurup silmeye çalışıyor. Ancak hızına yetişemeyince hata veriyordu. Bunu önlemek başlangışta adına hiç bir motoru hareket ettirmeyecek ve bağlantıyı sürdürecek bir dummy goal gönderiliyor.
