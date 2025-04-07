def session_auth_status(request):
    return {
        'is_logged_in': 'access_token' in request.session
    }
