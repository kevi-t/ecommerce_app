# app/views.py
import requests
from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.conf import settings
from django.shortcuts import render
from django.contrib.auth.decorators import login_required



def index(request):
    return render(request, 'index.html')

@login_required
def home(request):
    return render(request, 'home.html')




# Register View
def register(request):
    if request.method == "POST":
        data = {
            "email": request.POST.get("email"),
            "password": request.POST.get("password"),
            "name": request.POST.get("name"),
        }

        try:
            response = requests.post(settings.ECOMMERCE_API_URL_REGISTER, data=data)

            if response.status_code == 201:
                return redirect("login")
            else:
                return JsonResponse({"error": "Registration failed. Please try again."})
        except requests.exceptions.RequestException as e:
            return JsonResponse({"error": f"An error occurred: {e}"})

    return render(request, "account/register.html")

# Login View
def login(request):
    if request.method == "POST":
        data = {
            "email": request.POST.get("email"),
            "password": request.POST.get("password"),
        }

        try:
            response = requests.post(settings.ECOMMERCE_API_URL_LOGIN, data=data)

            if response.status_code == 200:
                # Store token in session or cookies
                response_data = response.json()
                request.session["access_token"] = response_data.get("access")
                request.session["refresh_token"] = response_data.get("refresh")
                return redirect("home")
            else:
                return JsonResponse({"error": "Login failed. Please try again."})
        except requests.exceptions.RequestException as e:
            return JsonResponse({"error": f"An error occurred: {e}"})

    return render(request, "account/login.html")

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

@login_required
def profile(request):
    return render(request, 'profiles/profile.html')

@login_required
def profile_edit(request):
    return render(request, 'profiles/profile_edit.html')

@login_required
def profile_settings(request):
    return render(request, 'profiles/profile_settings.html')