from django.contrib import admin

# Register your models here.
from .models import Users, Master, UserHistory, RoadReport

admin.site.register(Users)
admin.site.register(Master)
admin.site.register(UserHistory)
admin.site.register(RoadReport)