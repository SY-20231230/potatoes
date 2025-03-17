import serial
import datetime
import pytz
import requests
import json
import time

# 시리얼 포트 설정 (실제 환경에 맞게 수정)
serial_port = "/dev/ttyACM0"
baud_rate = 115200

# Django 서버 주소
django_server_url = "http://127.0.0.1:8000/hardware/pull/"  # 실제 서버 주소로 변경 필요

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
                    parts = data.split(',')
                    if len(parts) == 7:
                        time_str, lat_str, lon_str, speed_str, course_str = parts[:3], parts[3], parts[4], parts[5], parts[6]
                        hour_utc, minute_utc, second_utc = time_str
                        latitude = float(lat_str)
                        longitude = float(lon_str)
                        speed_knots = float(speed_str)
                        course_degrees = float(course_str)

                        # UTC 시간 정보 datetime 객체로 생성
                        utc_time = datetime.datetime(2025, 2, 25, int(hour_utc), int(minute_utc), int(second_utc), tzinfo=pytz.utc)  # 날짜는 예시 (실제 날짜 정보 필요 시 NMEA 문장에서 파싱)

                        # UTC -> KST 변환
                        kst_timezone = pytz.timezone('Asia/Seoul')
                        kst_time = utc_time.astimezone(kst_timezone)

                        # Django 서버로 전송할 데이터 생성
                        gps_data = {
                            "kst_time": kst_time.strftime("%Y-%m-%d %H:%M:%S"),  # ISO 8601 형식으로 변경
                            "latitude": latitude,
                            "longitude": longitude,
                            "speed": speed_knots,
                            "course": course_degrees,
                        }

                        # Django 서버로 POST 요청 전송
                        while True: # 전송 실패시 재시도
                            try:
                                response = requests.post(django_server_url, data=json.dumps(gps_data), headers={'Content-Type': 'application/json'})
                                if response.status_code == 201:
                                    print("Data sent successfully")
                                    break # 성공시 while문 탈출
                                else:
                                    print(f"Failed to send data: {response.status_code}, {response.text}")
                                    time.sleep(1) # 1초 대기 후 재시도
                            except requests.exceptions.RequestException as e:
                                print(f"Request Exception: {e}")
                                time.sleep(1) # 1초 대기 후 재시도
                    else:
                        print(f"Invalid data format (wrong number of parts): {data}") # 7개가 아닐경우 출력만 진행.

                except ValueError as e:
                    print(f"ValueError during parsing: {e}, Data: {data}")

except KeyboardInterrupt:
    print("Exiting program")
finally:
    if ser.is_open:
        ser.close()
        print(f"Serial port {serial_port} closed")