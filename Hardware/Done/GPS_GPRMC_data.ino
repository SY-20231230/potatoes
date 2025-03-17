#include <SoftwareSerial.h>
#include <TinyGPS++.h>

SoftwareSerial gpsSerial(4, 3);
TinyGPSPlus gps;

void setup() {
  Serial.begin(115200);
  gpsSerial.begin(38400);

  Serial.println("GPRMC data parsing start...");
}

void loop() {
  while (gpsSerial.available() > 0) {
    if (gps.encode(gpsSerial.read())) { // encode()가 true를 반환하면 문장이 파싱됨
      if (gps.location.isValid() && gps.time.isValid() && gps.speed.isValid() && gps.course.isValid()) {
        String gprmcData = String(gps.time.hour()) + "," + String(gps.time.minute()) + "," + String(gps.time.second()) + ",";
        gprmcData += String(gps.location.lat(), 5) + "," + String(gps.location.lng(), 5) + ",";

        float speed_kmh = gps.speed.knots() * 1.852; // knots to km/h
        gprmcData += String(speed_kmh, 2) + "," + String(gps.course.deg()); // km/h

        Serial.println(gprmcData);
        delay(200);
      }
    }
  }
}
