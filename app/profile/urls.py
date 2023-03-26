"""
URL mappings for the user API.
"""
from django.urls import path

from profile import views


app_name = 'profile'

urlpatterns = [
   path('', views.register, name='register'),
   path('home', views.home, name='home'),
   path('otp/<str:uid>/', views.otpVerify, name='otp')
]
