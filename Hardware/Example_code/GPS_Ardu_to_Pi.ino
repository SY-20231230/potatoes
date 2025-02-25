#include <SoftwareSerial.h>
#include <TinyGPS++.h>

// SoftwareSerial 포트 설정 (필요에 따라 하드웨어 시리얼 포트 Serial1, Serial2 등 사용 가능)
SoftwareSerial gpsSerial(4, 3); // Arduino 디지털 4번 핀 (GPS TX) -> Arduino RX, 디지털 3번 핀 (GPS RX) -> Arduino TX
TinyGPSPlus gps;

void setup() {
  Serial.begin(115200); // 하드웨어 시리얼 포트 (USB 시리얼 모니터) - 디버깅 및 확인용
  gpsSerial.begin(38400); // 소프트웨어 시리얼 포트 - GPS 모듈 통신 (GPS 모듈 baudrate에 맞게 설정)

  Serial.println("GPS 데이터 수신 시작...");
}

void loop() {
  while (gpsSerial.available() > 0) {
    gps.encode(gpsSerial.read()); // GPS 데이터 TinyGPS++ 라이브러리로 파싱
  }

  if (gps.location.isUpdated()) { // 새로운 위치 정보가 업데이트 되었으면
    String gpsData = String(gps.time.hour()) + "," + String(gps.time.minute()) + "," + String(gps.time.second()) + ","; // 시간 (UTC)
    gpsData += String(gps.location.lat(), 5) + "," + String(gps.location.lng(), 5); // 위도, 경도 (소수점 5자리까지)
    Serial.println(gpsData); // 파싱된 GPS 데이터를 하드웨어 시리얼 포트로 출력 (Raspberry Pi로 전송)
    delay(1000); // 1초 간격으로 데이터 전송
  }
}