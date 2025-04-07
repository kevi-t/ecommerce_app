# app/views.py
import requests

from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from environ import Env


# Initialize environ
env = Env()

def check_login(func):
    def wrapper(request, *args, **kwargs):
        if not request.session.get("is_logged_in", False):
            return redirect("login_view")  
        return func(request, *args, **kwargs)
    return wrapper

def home(request):  
    context = {
        "is_logged_in": request.session.get("is_logged_in", False),
        "user_email": request.session.get("user_email", ""),
    }
    return render(request, 'home.html', context)


@check_login
def logout_view(request):
    if request.method == "GET":
        return render(request, 'account/logout.html')
    request.session.flush()
    return redirect("home")

@check_login
def profile(request):
    return render(request, 'profiles/profile.html')

@check_login
def profile_settings(request):
    return render(request, 'profiles/profile_settings.html')

@check_login
def profile_edit(request):
    return render(request, 'profiles/profile_edit.html')
# Update View
# def update_customer(request):
#     if request.method == "POST":
#         # Get updated data from the form
#         data = {
#             "name": request.POST.get("name"),
#             "email": request.POST.get("email"),
#         }

#         try:
#             # Send a PUT request to update customer data
#             headers = {
#                 "Authorization": f"Bearer {request.session.get('access_token')}"
#             }
#             response = requests.put(settings.ECOMMERCE_API_URL_UPDATE, data=data, headers=headers)

#             if response.status_code == 200:
#                 return redirect("profile")
#             else:
#                 return JsonResponse({"error": "Update failed. Please try again."})
#         except requests.exceptions.RequestException as e:
#             return JsonResponse({"error": f"An error occurred: {e}"})

#     return render(request, "profiles/profile_edit.html")

# Place Order View
@check_login
def orders(request):
    return render(request, 'orders.html')

# def place_order(request):
#     if request.method == "POST":
#         order_data = {
#             "product_id": request.POST.get("product_id"),
#             "quantity": request.POST.get("quantity"),
#         }

#         try:
#             headers = {
#                 "Authorization": f"Bearer {request.session.get('access_token')}"
#             }
#             response = requests.post(settings.ECOMMERCE_API_URL_PLACE_ORDER, data=order_data, headers=headers)

#             if response.status_code == 201:
#                 return redirect("orders")
#             else:
#                 return JsonResponse({"error": "Failed to place order. Please try again."})
#         except requests.exceptions.RequestException as e:
#             return JsonResponse({"error": f"An error occurred: {e}"})

#     return render(request, "order/place_order.html")

# Order List View
# def list_orders(request):
#     try:
#         headers = {
#             "Authorization": f"Bearer {request.session.get('access_token')}"
#         }
#         response = requests.get(settings.ECOMMERCE_API_URL_ORDER_LIST, headers=headers)

#         if response.status_code == 200:
#             orders = response.json()
#             return render(request, "orders_list.html", {"orders": orders})
#         else:
#             return JsonResponse({"error": "Failed to fetch orders. Please try again."})

#     except requests.exceptions.RequestException as e:
#         return JsonResponse({"error": f"An error occurred: {e}"})


@check_login
def products(request):
    return render(request, 'products.html')