#include <SoftwareSerial.h>
#include <TinyGPS++.h>

// SoftwareSerial port set
SoftwareSerial gpsSerial(4, 3); // TX 4, RX 3
TinyGPSPlus gps;

void setup() {
  Serial.begin(115200); // 
  gpsSerial.begin(38400); // 

  Serial.println("GPS data reception start...");
}

void loop() {
  while (gpsSerial.available() > 0) {
    gps.encode(gpsSerial.read()); // GPS data parsing to TinyGPS++ lib
  }

  if (gps.location.isUpdated()) { //  if new GPS data receotion
    String gpsData = String(gps.time.hour()) + "," + String(gps.time.minute()) + "," + String(gps.time.second()) + ","; // 시간 (UTC)
    gpsData += String(gps.location.lat(), 5) + "," + String(gps.location.lng(), 5); // 위도, 경도 (소수점 5자리까지)
    Serial.println(gpsData); // 
    delay(500); // 0.5 second
  }
}
