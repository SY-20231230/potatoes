import subprocess
import sys
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/control": {"origins": "http://localhost:3000"}})

# 실행/종료할 대상 파이썬 스크립트 파일 경로
TARGET_SCRIPT_PATH = '/home/dorosee/GPS_POST_Ver2.py'

# 실행 중인 스크립트 프로세스를 저장할 변수
script_process = None

@app.route('/control', methods=['POST'])
def control_script():
    global script_process
    command = request.data.decode('utf-8').strip().lower() # 요청 본문 데이터 가져오기

    if command == 'on':
        # 이미 실행 중인지 확인 (프로세스가 존재하고, 아직 종료되지 않았는지)
        if script_process is not None and script_process.poll() is None:
            return jsonify({"status": "error", "message": "스크립트가 이미 실행 중입니다."}), 409 # Conflict

        try:
            print(f"'{TARGET_SCRIPT_PATH}' 스크립트 실행 시도...")
            # 현재 파이썬 인터프리터를 사용하여 스크립트 실행
            script_process = subprocess.Popen([sys.executable, TARGET_SCRIPT_PATH])
            print(f"스크립트 시작됨 (PID: {script_process.pid})")
            return jsonify({"status": "success", "message": f"스크립트가 시작되었습니다 (PID: {script_process.pid})."}), 200
        except FileNotFoundError:
            print(f"오류: 스크립트 파일을 찾을 수 없습니다: {TARGET_SCRIPT_PATH}")
            script_process = None # 상태 초기화
            return jsonify({"status": "error", "message": f"스크립트 파일을 찾을 수 없습니다: {TARGET_SCRIPT_PATH}"}), 500
        except Exception as e:
            print(f"스크립트 시작 오류: {e}")
            script_process = None # 상태 초기화
            return jsonify({"status": "error", "message": f"스크립트 시작 중 오류 발생: {e}"}), 500

    elif command == 'off':
        # 실행 중인 스크립트가 없는 경우
        if script_process is None or script_process.poll() is not None:
            return jsonify({"status": "error", "message": "실행 중인 스크립트가 없습니다."}), 404 # Not Found

        try:
            print(f"스크립트 종료 시도 (PID: {script_process.pid})...")
            script_process.terminate() # 스크립트에 종료 신호(SIGTERM) 전송 (graceful shutdown 시도)

            # 스크립트가 정상적으로 종료될 때까지 잠시 대기 (선택 사항)
            try:
                script_process.wait(timeout=5) # 최대 5초 대기
                print(f"스크립트 종료 확인됨 (PID: {script_process.pid})")
                message = f"스크립트가 종료되었습니다 (PID: {script_process.pid})."
            except subprocess.TimeoutExpired:
                print(f"스크립트가 5초 내에 종료되지 않아 강제 종료(SIGKILL) 시도...")
                script_process.kill() # 강제 종료 (SIGKILL)
                script_process.wait() # 강제 종료 완료 대기
                message = f"스크립트가 강제 종료되었습니다 (PID: {script_process.pid})."

            script_process = None # 프로세스 변수 초기화
            return jsonify({"status": "success", "message": message}), 200
        except Exception as e:
            print(f"스크립트 종료 오류: {e}")
            # 오류 발생 시에도 상태를 초기화하는 것이 안전할 수 있음
            script_process = None
            return jsonify({"status": "error", "message": f"스크립트 종료 중 오류 발생: {e}"}), 500

    else:
        # "on" 또는 "off"가 아닌 다른 문자열이 들어온 경우
        return jsonify({"status": "error", "message": "잘못된 명령어입니다. 'on' 또는 'off'를 사용하세요."}), 400 # Bad Request

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)