from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .models import Users, Master, UserHistory, RoadReport
from .serializers import UsersSerializer, MasterSerializer, UserHistorySerializer, RoadReportSerializer

# Users ViewSet
class UsersViewSet(viewsets.ModelViewSet):
    queryset = Users.objects.all()  # 모든 유저 데이터 가져오기
    serializer_class = UsersSerializer  # UsersSerializer 사용

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
