import uuid
import json
from decimal import Decimal
from rest_framework import serializers
from practico3and4.models.compra import Compra, DetalleCompra
from practico3and4.models.libro import Libro

class CrearCompraSerializer(serializers.Serializer):
    libros = serializers.CharField()
    comprobante_pago = serializers.ImageField(required=False)

    def validate(self, data):
        try:
            libros_list = json.loads(data['libros'])
        except (json.JSONDecodeError, TypeError):
            raise serializers.ValidationError({'libros': 'Formato inválido para lista de libros.'})

        if not isinstance(libros_list, list) or not all(isinstance(i, int) for i in libros_list):
            raise serializers.ValidationError({'libros': 'Debe ser una lista de enteros.'})

        libros_validos = Libro.objects.filter(id__in=libros_list)
        if libros_validos.count() != len(set(libros_list)):
            raise serializers.ValidationError({'libros': 'Uno o más libros no existen.'})

        data['libros'] = libros_validos
        return data

    def create(self, validated_data):
        usuario = self.context['request'].user
        libros = validated_data['libros']
        comprobante = validated_data.get('comprobante_pago')
        total = sum([libro.precio for libro in libros])
        qr = str(uuid.uuid4())

        compra = Compra.objects.create(
            usuario=usuario,
            total=Decimal(total),
            qr_generado=qr,
            comprobante_pago=comprobante
        )

        for libro in libros:
            DetalleCompra.objects.create(
                compra=compra,
                libro=libro,
                precio_unitario=libro.precio
            )

        return compra
