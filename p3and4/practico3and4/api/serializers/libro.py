from rest_framework import serializers
from practico3and4.models.libro import Libro
from .genero import GeneroSerializer
from practico3and4.models.genero import Genero

class LibroSerializer(serializers.ModelSerializer):
    generos = GeneroSerializer(many=True, read_only=True)
    generos_ids = serializers.PrimaryKeyRelatedField(
        queryset=Genero.objects.all(),
        many=True,
        write_only=True,
        source='generos'
    )
    total_vendidos = serializers.IntegerField(read_only=True, default=0)

    class Meta:
        model = Libro
        fields = ['id', 'titulo', 'autor', 'descripcion', 'precio', 'isbn', 'imagen', 'generos', 'generos_ids', 'total_vendidos']
