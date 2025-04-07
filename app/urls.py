# app/urls.py
from django.urls import path
from .views.login_views import *
from .views.register_views import register_view
from .views.views import * 


urlpatterns = [
    path('', home, name='home'),  
    path('login/', login_view, name='login_view'), 
    path('register/', register_view, name='register_view'), 
    path('logout/', logout_view, name='logout_view'),    
    
    path("products/", products, name="products"),
    path("orders/", orders, name="orders"),
    path('profile/', profile, name='profile'),
    path('profile/edit/', profile_edit, name='profile_edit'),
    path('profile/settings/', profile_settings, name='profile_settings'),
#     path("update/", update_customer, name="update_customer"),
#     path("place-order/", place_order, name="place_order"),
#     path("orders/", list_orders, name="order_list"),
]