from rest_framework import serializers, validators
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth import get_user_model, authenticate

User = get_user_model()


class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True, validators=[
                                   validators.UniqueValidator(queryset=User.objects.all())])
    username = serializers.CharField(required=True, max_length=40)
    password = serializers.CharField(
        required=True, min_length=8, write_only=True)

    class Meta:
        model = User
        fields = ['email', 'username', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        user.set_password(validated_data['password'])
        user.save()

        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)

        if user and user.is_active:
            return user
        
        raise serializers.ValidationError("Incorrect Credentials")


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'avatarStyle',
                  'avatarIteration', 'name', 'createdAt', 'updatedAt']



