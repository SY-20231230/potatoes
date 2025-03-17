#include <SoftwareSerial.h>
#include <TinyGPS++.h>

SoftwareSerial gpsSerial(4, 3);
TinyGPSPlus gps;

void setup() {
  Serial.begin(115200);
  gpsSerial.begin(38400);

  Serial.println("GPS full data parsing start...");
}

void loop() {
  while (gpsSerial.available() > 0) {
    char c = gpsSerial.read();
    gps.encode(c);
    Serial.print(c);
  }
}
