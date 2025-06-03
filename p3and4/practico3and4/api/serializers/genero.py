from rest_framework import serializers
from practico3and4.models.genero import Genero

class GeneroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genero
        fields = ['id', 'nombre']
