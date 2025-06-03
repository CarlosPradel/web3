from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from ..serializers import CrearCompraSerializer, CompraSerializer


class CrearCompraView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        serializer = CrearCompraSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        compra = serializer.save()
        return Response(CompraSerializer(compra).data, status=status.HTTP_201_CREATED)
