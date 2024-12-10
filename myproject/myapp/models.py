from django.db import models
from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.hashers import make_password


# Create your models here.
class Users(models.Model): #models.Model 물어보기
    user_id = models.CharField(max_length=20,primary_key=True)
    user_pw = models.CharField(max_length=20)
    user_name = models.CharField(max_length=10)
    user_age = models.PositiveIntegerField()
    user_phonenumber = models.IntegerField(null=True, blank=True) 

    def save(self, *args, **kwargs):
        # 비밀번호를 암호화하여 저장 (예: make_password 사용)
        self.user_pw = make_password(self.user_pw)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.user_name  # 객체 출력 시 이름 반환
    
    class Meta:
        db_table = 'Users'

class Master(models.Model):
    master_id = models.CharField(max_length=20, primary_key=True)
    master_pw = models.CharField(max_length=20)
    master_name = models.CharField(max_length = 10)
    master_phonenumber = models.CharField(max_length=20)
    master_grade = models.CharField(max_length=10)

    def save(self, *args, **kwargs):
        self.master_pw = make_password(self.master_pw)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.master_name  # 객체 출력 시 이름 반환    
    
    class Meta:
        db_table = 'Master'

class userhistory(models.Model):
    user = models.ForeignKey(Users, on_delete=models.CASCADE, related_name='road_records') 
    userhistory_start = models.CharField(max_length=255)
    userhistory_end = models.CharField(max_length=255)
    userhistory_via = models.CharField(max_length=255)
    userhistory_searchtime = models.DateTimeField(auto_now_add=True) #시간 물어보기
    class Meta:
        db_table = 'userhistory'

class roadreport(models.Model):
    roadreport_id = models.CharField(max_length=100, primary_key=True)
    roadreport_image = models.CharField(max_length=255)
    roadreport_damagetype = models.CharField(max_length=50)
    roadreport_status = models.CharField(max_length=20)
    roadreport_time = models.DateTimeField(auto_now_add=True)
    roadreport_region = models.CharField(max_length=255)

    class Meta:
        db_table = 'roadreport'

        