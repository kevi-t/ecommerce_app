# app/views.py
import json
import requests

from environ import Env

from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt


env = Env()

@csrf_exempt
def register_view(request):
    if request.method == "GET":
        return render(request, 'account/register.html')

    elif request.method == "POST":
        try:
            data = json.loads(request.body)
            name = data.get("name")
            email = data.get("email")
            phone_number = data.get("phone_number")
            password = data.get("password")
            next_url = data.get("next", "login/")
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)
        
        api_url = env('ECOMMERCE_API_URL_REGISTER')
        if not api_url:
            return JsonResponse({"error": "API URL not configured."}, status=500)
        
        try:
            response = requests.post(api_url, json={
                "name": name, 
                "email": email,
                "phone_number": phone_number, 
                "password": password
            })

            api_data = response.json()
            print("External API response:", api_data)
            if response.status_code == 201 and api_data.get("message"):
                return JsonResponse({
                    "message": api_data["message"],
                    "next": next_url
                })
            elif response.status_code == 400:
                return JsonResponse({
                    "email": api_data.get("errors", {}).get("email", []),
                    "phone_number": api_data.get("errors", {}).get("phone_number", [])},
                     status=400)
            else:
                return JsonResponse({"error": api_data.get("detail", "Registration failed.")}, status=401)
        except requests.RequestException as e:
            return JsonResponse({"error": str(e)}, status=500)

    else:
        return JsonResponse({"error": "Invalid request method"}, status=405)