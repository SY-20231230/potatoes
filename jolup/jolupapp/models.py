# Create your models here.
from django.db import models
from django.contrib.auth.hashers import make_password

class Users(models.Model):
    user_id = models.CharField(max_length=20, primary_key=True)
    user_pw = models.CharField(max_length=128)  # 암호화 저장을 고려하여 길이 증가
    user_name = models.CharField(max_length=10)
    user_age = models.PositiveIntegerField()
    user_phonenumber = models.CharField(max_length=15, null=True, blank=True)

    def save(self, *args, **kwargs):
        self.user_pw = make_password(self.user_pw)  # 비밀번호 암호화
        super().save(*args, **kwargs)

    def __str__(self):
        return self.user_name  

    class Meta:
        db_table = 'Users'

class Master(models.Model):
    master_id = models.CharField(max_length=20, primary_key=True)
    master_pw = models.CharField(max_length=128)
    master_name = models.CharField(max_length=10)
    master_phonenumber = models.CharField(max_length=15)
    master_grade = models.CharField(max_length=10)

    def save(self, *args, **kwargs):
        self.master_pw = make_password(self.master_pw)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.master_name  

    class Meta:
        db_table = 'Master'

class UserHistory(models.Model):  # 클래스명 변경
    user = models.ForeignKey(Users, on_delete=models.CASCADE, related_name='road_records') 
    userhistory_start = models.CharField(max_length=255,null=True)
    userhistory_end = models.CharField(max_length=255,null=True)
    userhistory_via = models.CharField(max_length=255,null=True)
    userhistory_searchtime = models.DateTimeField(auto_now_add=True)  

    class Meta:
        db_table = 'userhistory'

class RoadReport(models.Model):  # 클래스명 변경
    roadreport_num = models.AutoField(primary_key=True)  #새로운 프라이머리 키 설정
    roadreport_id = models.CharField(max_length=100)
    roadreport_image = models.ImageField(upload_to='images/',null=True,blank=True)
    roadreport_damagetype = models.CharField(max_length=50,null=True)
    roadreport_status = models.CharField(max_length=20,null=True)
    roadreport_time = models.DateTimeField(auto_now_add=True,null=True)
    roadreport_region = models.CharField(max_length=255,null=True)
    roadreport_direction = models.FloatField(null=True, blank=True)  # 추가된 필드 (방향)
    roadreport_speed = models.FloatField(null=True, blank=True)  # 추가된 필드 (속도)
    
    
    class Meta:
        db_table = 'roadreport'


""" 참고사항
비밀번호 암호화를 고려하여 user_pw와 master_pw 길이를 128로 늘림.
전화번호 필드는 IntegerField 대신 CharField(max_length=15)로 변경.
클래스명은 CamelCase를 따름 (userhistory → UserHistory, roadreport → RoadReport).
ForeignKey 설정은 적절하지만, 필요하면 ManyToManyField 고려 가능.
make_password()를 이용한 비밀번호 암호화 유지"""



