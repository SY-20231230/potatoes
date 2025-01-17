
from django.shortcuts import render

def react_view(request):
    return render(request, "index.html")

# Create your views here.
"""def index(request):
    return render(request, 'index.html')"""