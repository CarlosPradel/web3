from rest_framework import serializers
from practico3and4.models.libro import Libro
from .genero import GeneroSerializer
from practico3and4.models.genero import Genero

class LibroSerializer(serializers.ModelSerializer):
    generos = serializers.PrimaryKeyRelatedField(
        queryset=Genero.objects.all(),
        many=True
    )

    class Meta:
        model = Libro
        fields = ['id', 'titulo', 'autor', 'descripcion', 'precio', 'isbn', 'imagen', 'generos']

