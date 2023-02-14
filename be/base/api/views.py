from django.db import IntegrityError
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import CreateAPIView
from .serializer import RegisterSerializer, UserSerializer, LoginSerializer
from rest_framework import status
from ..models import User

from knox.models import AuthToken


class LoginView(CreateAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data

        response = {
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        }

        return Response(response, status=status.HTTP_200_OK)


@permission_classes((IsAuthenticated,))
class UserView(CreateAPIView):
    serializer_class = UserSerializer

    # get the user data

    def get(self, request):
        serializer = UserSerializer(self.request.user)
        return Response(serializer.data)

    # create a put request which changes the user data

    def put(self, request):

        user = User.objects.get(id=request.user.id)
        if user.username!= request.data.get("username") or user.email!= request.data.get("email"):
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = UserSerializer(request.user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RegistrationView(CreateAPIView):
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            try:
                user = serializer.save()
                response = {
                    "user": UserSerializer(user, context=self.get_serializer_context()).data,
                    "token": AuthToken.objects.create(user)[1]
                }
                return Response(response, status=status.HTTP_201_CREATED)

            except IntegrityError:
                return Response({"message": "username or email allready not available. Please try a new one."}, status=400)

        else:
            return Response({'message': 'Something is wrong'})

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
