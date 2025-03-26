import cv2
from django.shortcuts import render
from django.http import StreamingHttpResponse
import time
import os
# Create your views here.
from .serializers import UsersSerializer, MasterSerializer, UserHistorySerializer, RoadReportSerializer
from django.contrib.auth.hashers import make_password, check_password
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, viewsets
from django.shortcuts import get_object_or_404
from django.core.files.storage import default_storage
from .models import Users, Master, UserHistory, RoadReport
from django.http import JsonResponse
import pytz
from datetime import datetime
import requests
from django.conf import settings
import torch
import numpy as np
from pathlib import Path
from ultralytics import YOLO
from functools import lru_cache
import pathlib
temp = pathlib.PosixPath #이 세줄이 욜로 리눅스 문제일때때
pathlib.PosixPath = pathlib.WindowsPath


def index(request):  # 임시 메인페이지 출력문
    return JsonResponse({"message": "Django 서버가 정상적으로 동작 중입니다."})


# Users ViewSet
class UsersViewSet(viewsets.ModelViewSet):
    queryset = Users.objects.all()  # 모든 유저 데이터 가져오기
    serializer_class = UsersSerializer

# Master ViewSet


class MasterViewSet(viewsets.ModelViewSet):
    queryset = Master.objects.all()
    serializer_class = MasterSerializer


# UserHistory ViewSet
class UserHistoryViewSet(viewsets.ModelViewSet):
    queryset = UserHistory.objects.all()
    serializer_class = UserHistorySerializer


# RoadReport ViewSet
class RoadReportViewSet(viewsets.ModelViewSet):
    queryset = RoadReport.objects.all()
    serializer_class = RoadReportSerializer


# 관리자 회원가입 API
class MasterSignUp(APIView):
    def post(self, request):
        serializer = MasterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(master_pw=make_password(serializer.validated_data['master_pw']))
            return Response({'message': '관리자 등록 성공'}, status=status.HTTP_201_CREATED)
        return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


# 관리자 로그인 API
class MasterLogin(APIView):
    def post(self, request):
        master_id = request.data.get('master_id')
        master_pw = request.data.get('master_pw')

        try:
            master = Master.objects.get(master_id=master_id)
            if check_password(master_pw, master.master_pw):
                return Response({'message': '관리자 로그인 성공'}, status=status.HTTP_200_OK)
            else:
                return Response({'error': '비밀번호가 틀렸습니다.'}, status=status.HTTP_401_UNAUTHORIZED)
        except Master.DoesNotExist:
            return Response({'error': '관리자 계정이 존재하지 않습니다.'}, status=status.HTTP_404_NOT_FOUND)


# 사용자 회원가입 API
class UserSignUp(APIView):
    def post(self, request):
        serializer = UsersSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user_pw=make_password(serializer.validated_data['user_pw']))
            return Response({'message': '회원가입 성공'}, status=status.HTTP_201_CREATED)
        return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


# 사용자 로그인 API
class UserLogin(APIView):
    def get(self, request):
        user_id = request.data.get('user_id')
        user_pw = request.data.get('user_pw')

        try:
            user = Users.objects.get(user_id=user_id)
            if check_password(user_pw, user.user_pw):
                return Response({'message': '사용자 로그인 성공'}, status=status.HTTP_200_OK)
            else:
                return Response({'error': '비밀번호가 틀렸습니다.'}, status=status.HTTP_401_UNAUTHORIZED)
        except Users.DoesNotExist:
            return Response({'error': '사용자 계정이 존재하지 않습니다.'}, status=status.HTTP_404_NOT_FOUND)


# 사용자 로그아웃 API
class UserSignOut(APIView):
    def post(self, request):
        return Response({'message': '로그아웃 성공'}, status=status.HTTP_200_OK)


# 사용자 정보 조회 API
class UserInfo(APIView):
    def get(self, request, user_id):  # URL 패턴에서 user_id를 받음
        user = get_object_or_404(Users, user_id=user_id)
        serializer = UsersSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)


# 도로 보고 전체 조회 API
class RoadReportAll(APIView):
    def get(self, request):
        reports = RoadReport.objects.all()
        serializer = RoadReportSerializer(reports, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


# 특정 도로 보고 조회 API
# class RoadReportSelect(APIView):
#   def get(self, request, roadreport_latlng):
#      report = get_object_or_404(RoadReport, roadreport_latlng=roadreport_latlng)
#     serializer = RoadReportSerializer(report)
#
#     return Response(serializer.data, status=status.HTTP_200_OK)
class RoadReportSelect(APIView):
    def get(self, request, roadreport_num):
        # roadreport_num이이 정확히 일치하는 데이터 조회
        report = RoadReport.objects.filter(roadreport_num=roadreport_num).first()

        if not report:
            return Response({'error': '해당 roadreport_num가 존재하지 않습니다.'}, status=status.HTTP_404_NOT_FOUND)

        serializer = RoadReportSerializer(report)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # 도로 보고 삭제 API
class RoadReportDelete(APIView):
    def delete(self, request, roadreport_num):
        report = get_object_or_404(RoadReport, roadreport_num=roadreport_num)
        report.delete()
        return Response({'message': '도로 보고 삭제 완료'}, status=status.HTTP_204_NO_CONTENT)


# 도로 보고 수정 API
class RoadReportEdit(APIView):
    def put(self, request, roadreport_num):
        report = get_object_or_404(RoadReport, roadreport_num=roadreport_num)
        serializer = RoadReportSerializer(report, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': '도로 보고 수정 완료'}, status=status.HTTP_200_OK)
        return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

def load_yolo_model():
    print("[INFO] YOLO 모델 로드 중 (force reload)")
    return torch.hub.load(
        'ultralytics/yolov5',
        'custom',
        path="C:/Users/ysyhs/Desktop/jolup/models/DoroSeeV1.pt",
    )

class HardwarePull(APIView):

    def post(self, request):
        try:
            print("[INFO] 요청 수신됨. 모델 로드 시작.")
            model = load_yolo_model()
            print("[INFO] 모델 로딩 완료.")

            # 현재 시간 기준 파일 이름
            kst = pytz.timezone('Asia/Seoul')
            kst_time = datetime.now(kst)
            filename = kst_time.strftime('%Y%m%d_%H%M%S') + '.jpg'

            # 저장 경로
            save_dir = os.path.join(settings.MEDIA_ROOT, 'reports')
            os.makedirs(save_dir, exist_ok=True)
            save_path = os.path.join(save_dir, filename)

            # 영상 프레임 한 장 캡처
            cap = cv2.VideoCapture("http://192.168.0.135:8081/")
            print(f"[DEBUG] VideoCapture opened: {cap.isOpened()}")
            ret, frame = cap.read()
            cap.release()

            if not ret or frame is None:
                print("[ERROR] 카메라에서 프레임을 받아오지 못했습니다.")
                return Response({"error": "카메라 캡처 실패"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            print(f"[INFO] 프레임 캡처 완료. 프레임 shape: {frame.shape}")

            # 객체 감지 실행
            results = model(frame)
            detections = results.xyxy[0].tolist()
            print(f"[INFO] 감지된 객체 수: {len(detections)}")

            # 결과 필터링 및 바운딩 박스
            image_path = None
            for *xyxy, conf, cls in detections:
                if conf < 0.3:
                    continue
                x1, y1, x2, y2 = map(int, xyxy)
                cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
                image_path = os.path.join('reports', filename)  # 하나라도 감지되면 저장 경로 설정

            # 이미지 저장 (감지된 객체가 있을 경우에만)
            if image_path:
                cv2.imwrite(save_path, frame)
                print(f"[INFO] 이미지 저장됨: {save_path}")

            # 추가 정보 저장
            lat_lon = request.data.get("lat_lon", "")
            speed = request.data.get("speed", None)
            direction = request.data.get("course", None)

            # DB 저장
            RoadReport.objects.create(
                roadreport_time=kst_time,
                roadreport_image=image_path,
                roadreport_latlng=lat_lon,
                roadreport_speed=speed,
                roadreport_direction=direction
            )
            print("[INFO] DB 저장 완료.")

            if image_path:
                return Response({"message": "감지됨, 이미지 저장 완료", "file": filename}, status=status.HTTP_201_CREATED)
            else:
                return Response({"message": "감지 안됨, 정보만 저장됨"}, status=status.HTTP_200_OK)

        except Exception as e:
            print(f"[ERROR] 예외 발생: {str(e)}")
            return Response({"error": f"오류 발생: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
def object_detection_stream(request):
    stream_url = "http://192.168.0.135:8081/"

    model = load_yolo_model()

    def generate_frames():
        cap = cv2.VideoCapture(stream_url)
        while True:
            ret, frame = cap.read()
            if not ret:
                break

            results = model(frame)
            detections = results.xyxy[0].tolist()

            # 바운딩 박스 그리기
            for *xyxy, conf, cls in detections:
                x1, y1, x2, y2 = map(int, xyxy)
                cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)

            _, jpeg = cv2.imencode('.jpg', frame)
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + jpeg.tobytes() + b'\r\n')

        cap.release()

    return StreamingHttpResponse(generate_frames(), content_type='multipart/x-mixed-replace; boundary=frame')

# AI 데이터 요청 API
class AiPull(APIView):
    def get(self, request):
        return Response({'message': 'AI 데이터 조회'}, status=status.HTTP_200_OK)


# 도로 보고 이미지 업로드 API
class RoadReportImageUpload(APIView):
    def post(self, request, report_id):
        report = get_object_or_404(RoadReport, roadreport_latlng=report_id)
        if 'roadreport_image' in request.FILES:
            report.roadreport_image = request.FILES['roadreport_image']
            report.save()
            return Response({'message': '이미지 업로드 성공'}, status=status.HTTP_200_OK)
        return Response({'error': '파일이 없습니다.'}, status=status.HTTP_400_BAD_REQUEST)


# 위도 경도 분리시키는 api
class RoadReportSelectWithCoords(APIView):
    def get(self, request, report_id):
        """ 도로 보고 데이터를 가져올 때 위도/경도를 분리하여 응답 """
        try:
            report = get_object_or_404(RoadReport, roadreport_latlng=report_id)

            # 예외 처리: roadreport_latlng가 None이거나 올바른 형식이 아닌 경우
            if not report.roadreport_latlng or ',' not in report.roadreport_latlng:
                return Response({'error': '잘못된 위치 데이터입니다.'}, status=status.HTTP_400_BAD_REQUEST)

            try:
                latitude, longitude = map(float, report.roadreport_latlng.split(','))  # 실수형 변환
            except ValueError:
                return Response({'error': '위도/경도 값이 올바르지 않습니다.'}, status=status.HTTP_400_BAD_REQUEST)

            return Response({
                'roadreport_latlng': report.roadreport_latlng,
                'latitude': latitude,
                'longitude': longitude,
                'roadreport_damagetype': report.roadreport_damagetype,
                'roadreport_status': report.roadreport_status,
                'roadreport_time': report.roadreport_time,
                'roadreport_region': report.roadreport_region
            }, status=status.HTTP_200_OK)

        except RoadReport.DoesNotExist:
            return Response({'error': '도로 보고 데이터가 존재하지 않습니다.'}, status=status.HTTP_404_NOT_FOUND)


# naver 지도 관련련
class NaverMapProxy(APIView):
    def get(self, request):
        # 1. 쿼리 파라미터에서 start, goal 가져오기
        start = request.query_params.get('start')  # 예: "126.97843,37.56668"
        goal = request.query_params.get('goal')    # 예: "127.10523,37.35953"

        if not start or not goal:
            return Response({'error': 'start와 goal 파라미터가 필요합니다.'}, status=status.HTTP_400_BAD_REQUEST)

        # 2. Directions API URL 구성
        url = "https://naveropenapi.apigw.ntruss.com/map-direction/v1/driving"

        headers = {
            'X-NCP-APIGW-API-KEY-ID': os.environ.get('NAVER_API_KEY_ID'),
            'X-NCP-APIGW-API-KEY': os.environ.get('NAVER_API_KEY'),
        }

        params = {
            'start': start,
            'goal': goal,
            'option': 'trafast'  # 가장 빠른 길
        }

        # 3. 네이버 Directions API 호출
        try:
            naver_response = requests.get(url, headers=headers, params=params)
            return Response(naver_response.json(), status=naver_response.status_code)
        except Exception as e:
            return Response({'error': str(e)}, status=500)


class RoadReportCreate(APIView):
    def post(self, request):
        data = request.data
        report = RoadReport.objects.create(
            roadreport_time=data['roadreport_time'],
            roadreport_image=data['roadreport_image'],
            roadreport_latlng=data['roadreport_latlng'],
            roadreport_speed=data['roadreport_speed'],
            roadreport_direction=data['roadreport_direction'],
        )
        return Response({"message": "성공"}, status=201)


class NaverLocalSearch(APIView):
    def get(self, request):
        query = request.query_params.get('query')
        if not query:
            return Response({'error': '검색어(query)는 필수입니다.'}, status=400)

        url = "https://openapi.naver.com/v1/search/local.json"
        headers = {
            "X-Naver-Client-Id": os.environ.get("NAVER_API_KEY_ID"),
            "X-Naver-Client-Secret": os.environ.get("NAVER_API_KEY"),
        }
        params = {
            "query": query,
            "display": 5,
            "start": 1,
            "sort": "random"
        }
        

        try:
            r = requests.get(url, headers=headers, params=params)
            return Response(r.json(), status=r.status_code)
        except Exception as e:
            return Response({"error": str(e)}, status=500)
