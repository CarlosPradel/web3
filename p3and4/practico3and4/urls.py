from django.urls import path, include
from rest_framework.routers import DefaultRouter

from practico3and4.api.views.auth import RegistroUsuarioView, LoginView
from practico3and4.api.views.genero import GeneroViewSet
from practico3and4.api.views.libro import LibroViewSet
from practico3and4.api.views.carrito import CarritoViewSet
from practico3and4.api.views.mis_compras import MisComprasViewSet
from practico3and4.api.views.crear_compra import CrearCompraView
from practico3and4.api.views.admin_views import (
    AdminLibroViewSet,
    AdminGeneroViewSet,
    VentasViewSet,
    UsuarioViewSet
)

router = DefaultRouter()

# Públicos y autenticados
router.register(r'generos', GeneroViewSet, basename='genero')
router.register(r'libros', LibroViewSet, basename='libro')
router.register(r'carrito', CarritoViewSet, basename='carrito')
router.register(r'mis-compras', MisComprasViewSet, basename='mis-compras')

# Admin
router.register(r'admin/libros', AdminLibroViewSet, basename='admin-libros')
router.register(r'admin/generos', AdminGeneroViewSet, basename='admin-generos')
router.register(r'admin/ventas', VentasViewSet, basename='admin-ventas')
router.register(r'admin/usuarios', UsuarioViewSet, basename='admin-usuarios')

urlpatterns = [
    path('', include(router.urls)),
    path('comprar/', CrearCompraView.as_view(), name='crear-compra'),
    path('auth/registro/', RegistroUsuarioView.as_view(), name='registro-usuario'),
    path('auth/login/', LoginView.as_view(), name='login'),
]
