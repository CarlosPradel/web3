from django.urls import path, include
from rest_framework.routers import DefaultRouter
from banco.api.views import (
    UsuarioViewSet,
    CuentaViewSet,
    MovimientoViewSet,
    BeneficiarioViewSet,
    AuthViewSet,
)

router = DefaultRouter()
router.register(r'usuarios', UsuarioViewSet, basename='usuario')
router.register(r'cuentas', CuentaViewSet, basename='cuenta')
router.register(r'movimientos', MovimientoViewSet, basename='movimiento')
router.register(r'beneficiarios', BeneficiarioViewSet, basename='beneficiario')
router.register(r'auth', AuthViewSet, basename='auth')

urlpatterns = [
    path('', include(router.urls)),
]
