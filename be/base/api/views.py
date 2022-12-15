from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import CreateAPIView
from .serializer import RegisterSerializer, UserSerializer
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


def get_token_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'access': str(refresh.access_token),
        'refresh': str(refresh),
    }


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token["username"] = user.username
        token["avatarStyle"] = user.avatarStyle
        token["avatarIteration"] = user.avatarIteration
        token["name"] = user.name
        token["email"] = user.email
        # ...

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class UserView(CreateAPIView):
    serializer_class = UserSerializer

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

    # create a put request which changes the user data

    def put(self, request):
        serializer = UserSerializer(request.user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RegistrationView(CreateAPIView):
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        tokens = get_token_for_user(serializer.instance)
        response = {
            "refresh": tokens["refresh"],
            "access": tokens["access"],
        }

        return Response(response, status=status.HTTP_201_CREATED)


@api_view(["GET"])
def getRoutes(request):

    routes = [
        "/api/token",
        "/api/token/refresh",
        "/api/register",
        "/api/nightoutlist/",
        "/api/nightout/<pk>",
    ]

    return Response(routes)
