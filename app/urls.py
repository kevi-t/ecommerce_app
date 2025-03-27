from django.urls import path
from .views import home,login

urlpatterns = [
    path('', home, name='home'),  # Home page
    path('account/login/', login, name='login')
]