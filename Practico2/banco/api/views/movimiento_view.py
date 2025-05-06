from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from banco.models.movimiento import Movimiento
from banco.models.cuenta import Cuenta
from banco.api.serializers import MovimientoSerializer
from django.db.models import Q
from decimal import Decimal, InvalidOperation

class MovimientoViewSet(viewsets.ModelViewSet):
    serializer_class = MovimientoSerializer
    # Solo usuarios autenticados pueden usar estas vistas
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Si se pasa un id de cuenta, filtramos por esa cuenta
        cuenta_id = self.request.query_params.get('cuenta_id')
        if cuenta_id:
            # Buscamos movimientos donde la cuenta sea origen o destino
            return Movimiento.objects.filter(
                Q(cuenta_origen__id=cuenta_id) | Q(cuenta_destino__id=cuenta_id)
            ).order_by('-fecha')
        # Si no se pasa nada, devolvemos todos los movimientos (ordenados del más reciente al más antiguo)
        return Movimiento.objects.all().order_by('-fecha')

    # Este método se llama cuando se quiere crear un nuevo movimiento (POST)
    def create(self, request, *args, **kwargs):
        data = request.data
        tipo = data.get('tipo')  # ingreso, egreso o transferencia
        cuenta_origen_id = data.get('cuenta_origen')
        cuenta_destino_id = data.get('cuenta_destino')

        # Verificamos que el tipo de movimiento sea válido
        if tipo not in ['ingreso', 'egreso', 'transferencia']:
            return Response({'error': 'Tipo de movimiento inválido'}, status=400)

        # Intentamos convertir el monto a Decimal y validamos que sea mayor a 0
        try:
            monto = Decimal(str(data.get('monto', 0)))
            if monto <= 0:
                return Response({'error': 'El monto debe ser mayor a 0'}, status=400)
        except (InvalidOperation, TypeError):
            return Response({'error': 'Monto inválido'}, status=400)

        # Buscamos la cuenta origen, si se envió
        try:
            cuenta_origen = Cuenta.objects.get(id=cuenta_origen_id, usuario=request.user) if cuenta_origen_id else None
        except Cuenta.DoesNotExist:
            return Response({'error': 'Cuenta origen no encontrada'}, status=404)

        # Buscamos la cuenta destino, si se envió
        try:
            cuenta_destino = Cuenta.objects.get(id=cuenta_destino_id) if cuenta_destino_id else None
        except Cuenta.DoesNotExist:
            return Response({'error': 'Cuenta destino no encontrada'}, status=404)

        try:
            # Lógica para ingresos
            if tipo == 'ingreso':
                if not cuenta_destino:
                    return Response({'error': 'Cuenta destino requerida'}, status=400)
                # Aumentamos el saldo de la cuenta destino
                cuenta_destino.saldo += monto
                cuenta_destino.save()
                # Registramos el movimiento
                movimiento = Movimiento.objects.create(
                    tipo='ingreso',
                    cuenta_destino=cuenta_destino,
                    monto=monto
                )

            # Lógica para egresos
            elif tipo == 'egreso':
                if not cuenta_origen:
                    return Response({'error': 'Cuenta origen requerida'}, status=400)
                # Verificamos que haya suficiente saldo
                if cuenta_origen.saldo < monto:
                    return Response({'error': 'Saldo insuficiente'}, status=400)
                # Descontamos el saldo y guardamos
                cuenta_origen.saldo -= monto
                cuenta_origen.save()
                # Registramos el movimiento
                movimiento = Movimiento.objects.create(
                    tipo='egreso',
                    cuenta_origen=cuenta_origen,
                    monto=monto
                )

            # Lógica para transferencias
            elif tipo == 'transferencia':
                if not cuenta_origen or not cuenta_destino:
                    return Response({'error': 'Cuentas requeridas para transferencia'}, status=400)
                if cuenta_origen.saldo < monto:
                    return Response({'error': 'Saldo insuficiente'}, status=400)
                # Restamos saldo a la cuenta origen
                cuenta_origen.saldo -= monto
                # Sumamos saldo a la cuenta destino
                cuenta_destino.saldo += monto
                # Guardamos ambas cuentas
                cuenta_origen.save()
                cuenta_destino.save()
                # Creamos un único movimiento que registra ambos cambios
                movimiento = Movimiento.objects.create(
                    tipo='transferencia',
                    cuenta_origen=cuenta_origen,
                    cuenta_destino=cuenta_destino,
                    monto=monto
                )

            # Devolvemos el nuevo movimiento
            serializer = MovimientoSerializer(movimiento)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        except Exception as e:

            return Response({'error': f'Error al crear movimiento: {str(e)}'}, status=500)
