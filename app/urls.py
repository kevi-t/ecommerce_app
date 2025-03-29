from django.urls import path
from .views import index,home,products,orders

urlpatterns = [
    path('', index, name='index'),  
    path("home/", home, name="home"),
    path("products/", products, name="products"),
    path("orders/", orders, name="orders"),
]