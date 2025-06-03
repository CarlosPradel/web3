from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.db.models import Sum
from practico3and4.models.compra import DetalleCompra
from practico3and4.models.libro import Libro
from practico3and4.api.serializers import LibroSerializer

class TopLibrosView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        top_libros = (
            DetalleCompra.objects
            .values('libro')
            .annotate(total_vendidos=Sum('cantidad'))
            .order_by('-total_vendidos')[:10]
        )

        libro_ids = [item['libro'] for item in top_libros]
        ventas = {item['libro']: item['total_vendidos'] for item in top_libros}
        libros = list(Libro.objects.filter(id__in=libro_ids))
        libros.sort(key=lambda l: libro_ids.index(l.id))

        for libro in libros:
            libro.total_vendidos = ventas.get(libro.id, 0)

        serializer = LibroSerializer(libros, many=True, context={'request': request})
        return Response(serializer.data)
