from django.shortcuts import render
from django.contrib.auth.decorators import login_required


def index(request):
    return render(request, 'index.html')

@login_required
def home(request):
    return render(request, 'home.html')

def login(request):
    return render(request, 'account/login.html')

def register(request):
    return render(request, 'account/register.html')

@login_required
def products(request):
    return render(request, 'products.html')

@login_required
def orders(request):
    return render(request, 'orders.html')


# @login_required
# def profile(request):
#     return render(request, 'profile.html')