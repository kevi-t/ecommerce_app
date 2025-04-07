# app/views.py
import json
import requests

from environ import Env

from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt


env = Env()

@csrf_exempt
def login_view(request):
    if request.method == "GET":
        # oidc_login_url = env('ECOMMERCE_API_URL_OIDC')
        return render(request,'account/login.html')

    elif request.method == "POST":
        try:
            print("Raw request body:", request.body)
            data = json.loads(request.body)
            email = data.get("email")
            password = data.get("password")
            next_url = data.get("next", "/")
        except json.JSONDecodeError as e:
            return JsonResponse({"error": "Invalid JSON"}, status=400)

        api_url = env('ECOMMERCE_API_URL_LOGIN')
        if not api_url:
            return JsonResponse({"error": "API URL not configured."}, status=500)

        try:
            response = requests.post(api_url, json={"email": email, "password": password})
            api_data = response.json()

            if response.status_code == 200 and 'access' in api_data and 'refresh' in api_data:
                # Save tokens and email in session
                request.session['access_token'] = api_data['access']
                request.session['refresh_token'] = api_data['refresh']
                request.session['is_logged_in'] = True
                request.session['user_email'] = email

                return JsonResponse({
                    "access": api_data['access'],
                    "refresh": api_data['refresh'],
                    "next": next_url
                })
            else:
                return JsonResponse({"error": api_data.get("detail", "Login failed.")}, status=401)
        except requests.RequestException as e:
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return JsonResponse({"error": "Invalid request method"}, status=405)