app.py
- Flask Server
- POST 형식으로 웹과 통신하여 GPS_POST_Ver.py 스크립트 실행 제어

GPS_POST_Ver2.py
- GPS 데이터 파싱
- 아두이노에서 받아옴 (/dev/ttyACM0)

auto_start.sh
- 라즈베리파이 demon 설정파일
- 부팅시스템 파일에서 추가해야함

GPS_GPRMC_data.ino
- 아두이노에서 GPS 데이터 파싱해오는 파일
- GPRMC 형식의 NMEA 데이터를 받아옴