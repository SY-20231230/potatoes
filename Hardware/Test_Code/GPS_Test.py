import serial
import datetime
import pytz  # pytz 라이브러리 설치 필요: pip install pytz

# 시리얼 포트 설정 (실제 환경에 맞게 수정)
serial_port = "/dev/ttyACM0"
baud_rate = 115200

try:
    ser = serial.Serial(serial_port, baud_rate, timeout=1)
    print(f"Serial port {serial_port} opened successfully")
except serial.SerialException as e:
    print(f"Error opening serial port {serial_port}: {e}")
    exit()

try:
    while True:
        if ser.in_waiting > 0:
            data = ser.readline().decode('utf-8').strip()
            if data:
                try:
                    time_str, lat_str, lon_str = data.split(',')
                    hour_utc, minute_utc, second_utc = time_str.split(',')
                    latitude = float(lat_str)
                    longitude = float(lon_str)

                    # UTC 시간 정보 datetime 객체로 생성
                    utc_time = datetime.datetime(2025, 2, 25, int(hour_utc), int(minute_utc), int(second_utc), tzinfo=pytz.utc) # 날짜는 예시 (실제 날짜 정보 필요 시 NMEA 문장에서 파싱)

                    # UTC -> KST 변환
                    kst_timezone = pytz.timezone('Asia/Seoul')
                    kst_time = utc_time.astimezone(kst_timezone)

                    print("---------------------------------")
                    print("UTC 시간: {}:{}:{}".format(hour_utc, minute_utc, second_utc))
                    print("KST 시간: {}".format(kst_time.strftime("%H:%M:%S"))) # KST 시간 (HH:MM:SS 형식)
                    print("위도: {:.5f}".format(latitude))
                    print("경도: {:.5f}".format(longitude))

                except ValueError:
                    print("Invalid data format: {}".format(data))

except KeyboardInterrupt:
    print("Exiting program")
finally:
    if ser.is_open:
        ser.close()
        print(f"Serial port {serial_port} closed")