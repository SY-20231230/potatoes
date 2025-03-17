#include <SoftwareSerial.h>
#include <TinyGPS++.h>

SoftwareSerial gpsSerial(4, 3);
TinyGPSPlus gps;

void setup() {
  Serial.begin(115200);
  gpsSerial.begin(38400);

  Serial.println("GPS date parsing start...");
}

void loop() {
  while (gpsSerial.available() > 0) {
    gps.encode(gpsSerial.read());
  }

  if (gps.location.isUpdated()) {
    if (gps.location.isValid()) {
      String gpsData = String(gps.time.hour()) + "," + String(gps.time.minute()) + "," + String(gps.time.second()) + ",";
      gpsData += String(gps.location.lat(), 5) + "," + String(gps.location.lng(), 5) + ",";

      float speed_kmh = gps.speed.knots() * 1.852; // knots to km/h 변환 - 추가
      gpsData += String(speed_kmh, 2) + "," + String(gps.course.deg()); // km/h

      Serial.println(gpsData);
      delay(200);
    } else {
      Serial.println("Invalid data");
      delay(200);
    }
  }
}
