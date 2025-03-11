from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UsersViewSet, MasterViewSet, UserHistoryViewSet, RoadReportViewSet

# Router 설정
router = DefaultRouter()
router.register(r'users', UsersViewSet)
router.register(r'masters', MasterViewSet)
router.register(r'userhistory', UserHistoryViewSet)
router.register(r'roadreports', RoadReportViewSet)

# URL 패턴 등록
urlpatterns = [
    path('api/', include(router.urls)),  # API 엔드포인트 자동 생성
]
