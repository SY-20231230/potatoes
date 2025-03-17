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
                    parts = data.split(',') # 먼저 split으로 분리
                    if len(parts) == 7: # 분리된 데이터가 7개 항목인지 확인 (시간 3개, 위도, 경도, 속도, 방향)
                        time_str, lat_str, lon_str, speed_str, course_str = parts[:3], parts[3], parts[4], parts[5], parts[6] # 시간, 위도, 경도, 속도, 방향 분리 (수정)
                        hour_utc, minute_utc, second_utc = time_str # 시간 3개 항목
                        latitude = float(lat_str)
                        longitude = float(lon_str)
                        speed_knots = float(speed_str) # 속도
                        course_degrees = float(course_str) # 방향 (도 단위)

                        # UTC 시간 정보 datetime 객체로 생성
                        utc_time = datetime.datetime(2025, 2, 25, int(hour_utc), int(minute_utc), int(second_utc), tzinfo=pytz.utc) # 날짜는 예시 (실제 날짜 정보 필요 시 NMEA 문장에서 파싱)

                        # UTC -> KST 변환
                        kst_timezone = pytz.timezone('Asia/Seoul')
                        kst_time = utc_time.astimezone(kst_timezone)

                        print("---------------------------------")
                        print("KST 시간: {}".format(kst_time.strftime("%H:%M:%S"))) # KST 시간 (HH:MM:SS 형식)
                        print("위도: {:.5f}".format(latitude))
                        print("경도: {:.5f}".format(longitude))
                        print("속도: {:.2f} km/h".format(speed_knots)) # 속도 (노트)
                        print("방향: {:.2f} degrees".format(course_degrees)) # 방향 (각도)

                    else:
                        print("Invalid data format (wrong number of parts): {}".format(data)) # 분리된 항목 수가 7개가 아닐 경우 에러 메시지 출력

                except ValueError as e: # ValueError 종류를 좀 더 자세히 출력
                    print("ValueError during parsing: {}, Data: {}".format(e, data)) # ValueError 메시지와 데이터 함께 출력

except KeyboardInterrupt:
    print("Exiting program")
finally:
    if ser.is_open:
        ser.close()
        print(f"Serial port {serial_port} closed")