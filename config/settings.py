from pathlib import Path  
import os 
import dj_database_url
from environ import Env
env = Env()
env.read_env()

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = env('DJANGO_SECRET_KEY')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

# Development
# ALLOWED_HOSTS = ['*']

# Production
ALLOWED_HOSTS = ['.vercel.app','localhost']

# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
    'app',
    'whitenoise',
    
    # Allauth apps
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'allauth.socialaccount.providers.google',
    'allauth.socialaccount.providers.github',
]


AUTHENTICATION_BACKENDS = [
    'django.contrib.auth.backends.ModelBackend',
    'allauth.account.auth_backends.AuthenticationBackend',
]

SOCIALACCOUNT_PROVIDERS = {
    'google':{
        'APP':{
            'client_id': env('OAUTH_GOOGLE_CLIENT_ID'),
            'secret': env('OAUTH_GOOGLE_SECRET'),
        },
        'SCOPE': [
            'profile',
            'email'
        ],
        'AUTH_PARAMS': {
            'access_type': 'online',
            'prompt': 'consent'
        },
    },
     'github':{
        'APP':{
            'client_id': env('OAUTH_GITHUB_CLIENT_ID'),
            'secret': env('OAUTH_GITHUB_SECRET'),
        },

        'AUTH_PARAMS': {
           'prompt': 'consent'
        },
    },

}

STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

SITE_ID = 1


MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    
    'allauth.account.middleware.AccountMiddleware',
    
    'whitenoise.middleware.WhiteNoiseMiddleware', 
]

ROOT_URLCONF = 'config.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [ BASE_DIR / 'templates' ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                
                'app.context_processors.session_auth_status',
            ],
        },
    },
]

WSGI_APPLICATION = 'config.wsgi.application'

# Local Database
# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.postgresql',
#         'NAME': 'ecommerce_db',
#         'USER': 'postgres',
#         'PASSWORD': 'java',
#         'HOST': 'localhost',
#         'PORT': '5432',
#     }
# }

# Production Database
DATABASES = {
    'default': dj_database_url.config(default=env('DATABASE_URL'), conn_max_age=600, ssl_require=True)
}


# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
STATIC_URL = '/static/'
STATICFILES_DIRS = [BASE_DIR / 'static' ]

# Media files (for user-uploaded content)
MEDIA_URL = 'media/'
MEDIA_ROOT = BASE_DIR / 'media'

# Default primary key field type
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# Allauth Configurations
LOGIN_REDIRECT_URL = '/'  
ACCOUNT_LOGOUT_REDIRECT_URL = '/'  
ACCOUNT_LOGIN_METHODS = {'email'}
ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_UNIQUE_EMAIL = True

SOCIALACCOUNT_LOGIN_ON_GET = True
SOCIALACCOUNT_AUTO_SIGNUP = True
SOCIALACCOUNT_EMAIL_AUTHENTICATION = True
SOCIALACCOUNT_EMAIL_VERIFICATION = "none"

# Get API URLs from .env file
ECOMMERCE_API_URL_REGISTER = env('ECOMMERCE_API_URL_REGISTER')
ECOMMERCE_API_URL_LOGIN = env('ECOMMERCE_API_URL_LOGIN')
ECOMMERCE_API_URL_UPDATE = env('ECOMMERCE_API_URL_UPDATE')
ECOMMERCE_API_URL_PLACE_ORDER = env('ECOMMERCE_API_URL_PLACE_ORDER')
ECOMMERCE_API_URL_ORDER_LIST = env('ECOMMERCE_API_URL_ORDER_LIST')
ECOMMERCE_API_URL_OIDC = env('ECOMMERCE_API_URL_OIDC')