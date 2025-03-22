import cv2
from django.shortcuts import render
from django.http import StreamingHttpResponse
import time
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
def index(request): #임시 메인페이지 출력문
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


#관리자 회원가입 API
class MasterSignUp(APIView):
    def post(self, request):
        serializer = MasterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(master_pw=make_password(serializer.validated_data['master_pw']))
            return Response({'message': '관리자 등록 성공'}, status=status.HTTP_201_CREATED)
        return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

#관리자 로그인 API
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

#사용자 회원가입 API
class UserSignUp(APIView):
    def post(self, request):
        serializer = UsersSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user_pw=make_password(serializer.validated_data['user_pw']))
            return Response({'message': '회원가입 성공'}, status=status.HTTP_201_CREATED)
        return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

#사용자 로그인 API
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

#사용자 로그아웃 API
class UserSignOut(APIView):
    def post(self, request):
        return Response({'message': '로그아웃 성공'}, status=status.HTTP_200_OK)

#사용자 정보 조회 API
class UserInfo(APIView):
    def get(self, request, user_id):  # URL 패턴에서 user_id를 받음
        user = get_object_or_404(Users, user_id=user_id)
        serializer = UsersSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)


#도로 보고 전체 조회 API
class RoadReportAll(APIView):
    def get(self, request):
        reports = RoadReport.objects.all()
        serializer = RoadReportSerializer(reports, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

#특정 도로 보고 조회 API
#class RoadReportSelect(APIView):
 #   def get(self, request, roadreport_id):
  #      report = get_object_or_404(RoadReport, roadreport_id=roadreport_id)
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

#도로 보고 삭제 API
class RoadReportDelete(APIView):
    def delete(self, request, roadreport_num):
        report = get_object_or_404(RoadReport, roadreport_num=roadreport_num)
        report.delete()
        return Response({'message': '도로 보고 삭제 완료'}, status=status.HTTP_204_NO_CONTENT)

#도로 보고 수정 API
class RoadReportEdit(APIView):
    def put(self, request, roadreport_num):
        report = get_object_or_404(RoadReport, roadreport_num=roadreport_num)
        serializer = RoadReportSerializer(report, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': '도로 보고 수정 완료'}, status=status.HTTP_200_OK)
        return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

#하드웨어 데이터 요청 API
class HardwarePull(APIView):
    def post(self, request):
        try:
            data = request.data

            kst_time = data.get("kst_time")
            lat_lon = data.get("lat_lon")
            speed = data.get("speed")
            course = data.get("course")

            

            roadreport_time = datetime.strptime(kst_time, "%Y-%m-%d %H:%M:%S").replace(tzinfo=pytz.UTC)

            # `roadreport_num`을 직접 할당하지 않고 자동 증가하는걸로 구현
            new_report = RoadReport.objects.create(
                roadreport_id=lat_lon,
                roadreport_time=roadreport_time,
                roadreport_speed=speed,
                roadreport_direction=course
            )

            return Response({
                "message": "하드웨어 데이터 저장 완료!",
                "report_id": new_report.roadreport_id,
                "num": new_report.roadreport_num
            }, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

#AI 데이터 요청 API
class AiPull(APIView):
    def get(self, request):
        return Response({'message': 'AI 데이터 조회'}, status=status.HTTP_200_OK)

#도로 보고 이미지 업로드 API
class RoadReportImageUpload(APIView):
    def post(self, request, report_id):
        report = get_object_or_404(RoadReport, roadreport_id=report_id)
        if 'roadreport_image' in request.FILES:
            report.roadreport_image = request.FILES['roadreport_image']
            report.save()
            return Response({'message': '이미지 업로드 성공'}, status=status.HTTP_200_OK)
        return Response({'error': '파일이 없습니다.'}, status=status.HTTP_400_BAD_REQUEST)

#위도 경도 분리시키는 api
class RoadReportSelectWithCoords(APIView):
    def get(self, request, report_id):
        """ 도로 보고 데이터를 가져올 때 위도/경도를 분리하여 응답 """
        try:
            report = get_object_or_404(RoadReport, roadreport_id=report_id)

            # 예외 처리: roadreport_id가 None이거나 올바른 형식이 아닌 경우
            if not report.roadreport_id or ',' not in report.roadreport_id:
                return Response({'error': '잘못된 위치 데이터입니다.'}, status=status.HTTP_400_BAD_REQUEST)

            try:
                latitude, longitude = map(float, report.roadreport_id.split(','))  # 실수형 변환
            except ValueError:
                return Response({'error': '위도/경도 값이 올바르지 않습니다.'}, status=status.HTTP_400_BAD_REQUEST)

            return Response({
                'roadreport_id': report.roadreport_id,
                'latitude': latitude,
                'longitude': longitude,
                'roadreport_damagetype': report.roadreport_damagetype,
                'roadreport_status': report.roadreport_status,
                'roadreport_time': report.roadreport_time,
                'roadreport_region': report.roadreport_region
            }, status=status.HTTP_200_OK)

        except RoadReport.DoesNotExist:
            return Response({'error': '도로 보고 데이터가 존재하지 않습니다.'}, status=status.HTTP_404_NOT_FOUND)



def object_detection_stream(request):
    stream_url = "http://192.168.0.135:8081/" # 실제 Motion 스트리밍 URL로 변경

    def video_frame_generator():
        video_capture = cv2.VideoCapture(stream_url)
        if not video_capture.isOpened():
            raise Exception("스트리밍 URL에 연결할 수 없습니다.")

        # 객체 인식 모델 로드 (Haar Cascade 또는 DNN)
        # 예시: Haar Cascade 얼굴 인식 모델 로드
        face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')


        try:
            while True:
                ret, frame = video_capture.read()
                if not ret:
                    break # 스트림 종료 또는 오류 발생

                # 객체 인식 수행 -> 이 부분은 나중에 얼굴인식이 아닌 우리껄로 수정해야 하는 부분
                gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
                faces = face_cascade.detectMultiScale(gray, 1.1, 4) # 얼굴 검출

                # 검출된 객체에 사각형 그리기 (예시: 얼굴)
                for (x, y, w, h) in faces:
                    cv2.rectangle(frame, (x, y), (x+w, y+h), (0, 255, 0), 2) # 초록색 사각형

                # 객체 인식 결과 프레임 (MJPEG 형식으로 인코딩)
                _, jpeg_frame = cv2.imencode('.jpg', frame)
                byte_frame = jpeg_frame.tobytes()

                yield (b'--frame\r\n'
                       b'Content-Type: image/jpeg\r\n\r\n' + byte_frame + b'\r\n')
                time.sleep(0.1) # 프레임 처리 속도 조절 (선택 사항)

        finally:
            video_capture.release() # VideoCapture 객체 해제

    return StreamingHttpResponse(video_frame_generator(), content_type='multipart/x-mixed-replace; boundary=frame')

#naver 지도 관련련
class NaverMapProxy(APIView):
    def get(self, request):
        # 예: 위도 경도 파라미터 받기
        lat = request.query_params.get('lat')
        lon = request.query_params.get('lon')

        # 네이버 지도 API 엔드포인트
        url = f"https://naveropenapi.com/maps/example?lat={lat}&lon={lon}"

        headers = {
            'X-NCP-APIGW-API-KEY-ID': 'YOUR_CLIENT_ID',
            'X-NCP-APIGW-API-KEY': 'YOUR_CLIENT_SECRET',
        }

        # 네이버 지도 API 호출
        naver_response = requests.get(url, headers=headers)

        # 응답을 프론트엔드로 그대로 전달
        return Response(naver_response.json(), status=naver_response.status_code)
    
class RoadReportCreate(APIView):
    def post(self, request):
        data = request.data
        report = RoadReport.objects.create(
            roadreport_time=data['roadreport_time'],
            roadreport_image=data['roadreport_image'],
            roadreport_id=data['roadreport_id'],
            roadreport_speed=data['roadreport_speed'],
            roadreport_direction=data['roadreport_direction'],
        )
        return Response({"message": "성공"}, status=201)