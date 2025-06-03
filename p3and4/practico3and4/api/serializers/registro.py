from rest_framework import serializers
from django.contrib.auth import get_user_model

Usuario = get_user_model()

class RegistroUsuarioSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Usuario
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'password', 'rol']
        extra_kwargs = {
            'email': {'required': True},
            'username': {'required': False},
        }

    def create(self, validated_data):
        return Usuario.objects.create_user(
            username=validated_data['email'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            rol=validated_data.get('rol', 'cliente')
        )
