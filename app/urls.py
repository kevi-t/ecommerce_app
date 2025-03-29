from django.urls import path
from .views import *

urlpatterns = [
    path('', index, name='index'),  
    path("home/", home, name="home"),
    path("products/", products, name="products"),
    path("orders/", orders, name="orders"),
    path('profile/', profile, name='profile'),
    path('profile/edit/', profile_edit, name='profile_edit'),
    path('profile/settings/', profile_settings, name='profile_settings'),
]