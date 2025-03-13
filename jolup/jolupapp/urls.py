from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    MasterSignUp, MasterLogin, UserSignUp, UserLogin, UserSignOut, UserInfo,RoadReportSelectWithCoords,
    RoadReportAll, RoadReportSelect, HardwarePull, AiPull, RoadReportDelete, RoadReportEdit, UsersViewSet, MasterViewSet, UserHistoryViewSet, RoadReportViewSet
)
from . import views
# Router 설정
router = DefaultRouter()
router.register(r'users', UsersViewSet)
router.register(r'masters', MasterViewSet)
router.register(r'userhistory', UserHistoryViewSet)
router.register(r'roadreports', RoadReportViewSet)

# URL 패턴 등록
urlpatterns = [
    path('api/', include(router.urls)),  # API 엔드포인트 자동 생성
    path('', views.index, name='index'), # 메인 페이지
    path('object_detection_stream/', views.object_detection_stream, name='object_detection_stream'), # 객체 인식 스트림 URL
    # 관리자 API
    path('master/signup', MasterSignUp.as_view(), name='master-signup'),
    path('master/login', MasterLogin.as_view(), name='master-login'),

    # 사용자 API
    path('users/signup', UserSignUp.as_view(), name='user-signup'),
    path('users/login', UserLogin.as_view(), name='user-login'),
    path('users/signout', UserSignOut.as_view(), name='user-signout'),
    path('users/info', UserInfo.as_view(), name='user-info'),

    # 도로 보고 API
    path('roadreport/all', RoadReportAll.as_view(), name='roadreport-all'),
    path('roadreport/select', RoadReportSelect.as_view(), name='roadreport-select'),
    path('roadreport/delete', RoadReportDelete.as_view(), name='roadreport-delete'),
    path('roadreport/edit', RoadReportEdit.as_view(), name='roadreport-edit'),

    # 하드웨어 정보 및 AI 관련 API
    path('hardware/pull', HardwarePull.as_view(), name='hardware-pull'),
    path('ai/pull', AiPull.as_view(), name='ai-pull'),
    #위도와 경도 분리 api
    path('api/roadreport/select_with_coords/<str:report_id>/', RoadReportSelectWithCoords.as_view(), name='roadreport-select-with-coords'),

]
