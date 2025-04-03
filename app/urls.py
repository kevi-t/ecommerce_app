from django.urls import path
from .views import *

urlpatterns = [
    path('', index, name='index'),  
    path("home/", home, name="home"),
    path('accounts/login/', login_page, name='login_page'),  # Only renders the login page
    path('accounts/authenticate/', login_view, name='login_view'),  # Handles login logic
    path("products/", products, name="products"),
    path("orders/", orders, name="orders"),
    path('profile/', profile, name='profile'),
    path('profile/edit/', profile_edit, name='profile_edit'),
    path('profile/settings/', profile_settings, name='profile_settings'),
#     path("update/", update_customer, name="update_customer"),
#     path("place-order/", place_order, name="place_order"),
#     path("orders/", list_orders, name="order_list"),
]