from rest_framework import serializers
from practico3and4.models.carrito import CarritoItem
from .libro import LibroSerializer

class CarritoItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarritoItem
        fields = ['id', 'libro', 'fecha_agregado']
        extra_kwargs = {
            'libro': {'write_only': True}
        }

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        rep['libro'] = LibroSerializer(instance.libro).data
        return rep
