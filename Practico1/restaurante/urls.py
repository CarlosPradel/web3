from django.urls import path
from restaurante.views import (
    cliente_view, plato_view, mesero_view,
    mesa_view, orden_view
)

urlpatterns = [
    # Cliente
    path('clientes/', cliente_view.cliente_list, name='cliente_list'),
    path('clientes/nuevo/', cliente_view.cliente_create, name='cliente_create'),
    path('clientes/editar/<int:pk>/', cliente_view.cliente_update, name='cliente_update'),
    path('clientes/eliminar/<int:pk>/', cliente_view.cliente_delete, name='cliente_delete'),

    # Plato
    path('platos/', plato_view.plato_list, name='plato_list'),
    path('platos/nuevo/', plato_view.plato_create, name='plato_create'),
    path('platos/editar/<int:pk>/', plato_view.plato_update, name='plato_update'),
    path('platos/eliminar/<int:pk>/', plato_view.plato_delete, name='plato_delete'),

    # Mesero
    path('meseros/', mesero_view.mesero_list, name='mesero_list'),
    path('meseros/nuevo/', mesero_view.mesero_create, name='mesero_create'),
    path('meseros/editar/<int:pk>/', mesero_view.mesero_update, name='mesero_update'),
    path('meseros/eliminar/<int:pk>/', mesero_view.mesero_delete, name='mesero_delete'),

    # Mesa
    path('mesas/', mesa_view.mesa_list, name='mesa_list'),
    path('mesas/nuevo/', mesa_view.mesa_create, name='mesa_create'),
    path('mesas/editar/<int:pk>/', mesa_view.mesa_update, name='mesa_update'),
    path('mesas/eliminar/<int:pk>/', mesa_view.mesa_delete, name='mesa_delete'),

    # Orden
    path('ordenes/', orden_view.orden_list, name='orden_list'),
    path('ordenes/nuevo/', orden_view.orden_create, name='orden_create'),
    path('ordenes/editar/<int:pk>/', orden_view.orden_update, name='orden_update'),
    path('ordenes/eliminar/<int:pk>/', orden_view.orden_delete, name='orden_delete'),
]
