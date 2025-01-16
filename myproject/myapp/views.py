
from django.shortcuts import render

def react_view(request):
    return render(request, "index.html")

# Create your views here.
"""def index(request):
    return render(request, 'index.html')"""
from django.http import JsonResponse

def api_view(request):
    # API에서 반환할 데이터
    data = {
        "message": "API 호출 성공!",
        "status": "ok",
    }
    return JsonResponse(data)