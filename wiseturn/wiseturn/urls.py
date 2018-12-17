"""wiseturn URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from rest_framework.authtoken.views import obtain_auth_token

# from rest_framework.routers import DefaultRouter
# from wiseturn.auth.views import UserViewSet

# router = DefaultRouter()
# router.register(r'users', UserViewSet, base_name='users')

from wiseturn.models import *


for model in [WTUser]:
    admin.site.register(model)

from wiseturn.auth.views import *


urlpatterns = [
	url(r'^api/token/auth/$', obtain_auth_token),
	url(r'^api/users/create/$', UserCreateView.as_view()),
    url(r'^api/users/details/$', UserDetailView.as_view()),
    url(r'^admin/', admin.site.urls),
]
