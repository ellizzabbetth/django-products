from django.urls import path, include
from .views import (RegisterAPIView, 
    UserAPIView, LoginAPIView
    )

urlpatterns = [
    path('register', RegisterAPIView.as_view()),
    path('login', LoginAPIView.as_view()),
    path('user', UserAPIView.as_view()),
]