from django.urls import path
from . import views
from knox import views as knox_views

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path("", views.getRoutes, name="getRoutes"),
    path("login/", views.LoginView.as_view(), name="login"),
    path("register/", views.RegistrationView.as_view(), name="register"),
    path("user/", views.UserView.as_view(), name="user"),
    path("logout", knox_views.LogoutView().as_view(), name="knox_logout"),
]
