from django.urls import path
from . import views
from .views import MyTokenObtainPairView

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path("", views.getRoutes, name="getRoutes"),
    
    path("token/", MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("register/", views.RegistrationView.as_view(), name="register"),
    path("user/", views.UserView.as_view(), name="user"),
]
