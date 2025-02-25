import serial

# 시리얼 포트 설정 (직접 연결 시 /dev/ttyAMA0 또는 /dev/ttyS0, USB-UART 변환기 사용 시 /dev/ttyUSB0 등)
serial_port = "/dev/ttyAMA0" # Raspberry Pi 5 GPIO 시리얼 포트 경로 (예시, 실제 경로는 확인 필요)
baud_rate = 115200 # Arduino Serial.begin() 과 동일하게 설정 (USB 시리얼 모니터 속도와 무관)

try:
    ser = serial.Serial(serial_port, baud_rate, timeout=1) # 시리얼 객체 생성
    print(f"Serial port {serial_port} opened successfully")
except serial.SerialException as e:
    print(f"Error opening serial port {serial_port}: {e}")
    exit()

try:
    while True:
        if ser.in_waiting > 0: # 수신 버퍼에 데이터가 있으면
            data = ser.readline().decode('utf-8').strip() # 데이터 읽고 UTF-8 디코딩, 줄바꿈 제거
            if data: # 데이터가 비어있지 않으면
                try:
                    time_str, lat_str, lon_str = data.split(',') # CSV 형식으로 파싱 (시간, 위도, 경도)
                    hour, minute, second = time_str.split(',') # 시간 파싱
                    latitude = float(lat_str) # 위도 float 변환
                    longitude = float(lon_str) # 경도 float 변환

                    print("---------------------------------")
                    print("UTC 시간: {}:{}:{}".format(hour, minute, second))
                    print("위도: {:.5f}".format(latitude))
                    print("경도: {:.5f}".format(longitude))

                except ValueError:
                    print("Invalid data format: {}".format(data)) # CSV 파싱 실패 시 에러 메시지 출력

except KeyboardInterrupt: # Ctrl+C 종료 처리
    print("Exiting program")
finally:
    if ser.is_open:
        ser.close() # 시리얼 포트 닫기
        print(f"Serial port {serial_port} closed")