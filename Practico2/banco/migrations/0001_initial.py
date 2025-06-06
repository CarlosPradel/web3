# Generated by Django 4.2.20 on 2025-04-27 03:24

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Cuenta',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('numero_cuenta', models.CharField(max_length=100, unique=True)),
                ('saldo', models.DecimalField(decimal_places=2, default=0, max_digits=12)),
                ('usuario', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='cuentas', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Movimiento',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tipo', models.CharField(choices=[('ingreso', 'Ingreso'), ('egreso', 'Egreso'), ('transferencia', 'Transferencia')], max_length=15)),
                ('monto', models.DecimalField(decimal_places=2, max_digits=12)),
                ('fecha', models.DateTimeField(auto_now_add=True)),
                ('cuenta_destino', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='movimientos_entrada', to='banco.cuenta')),
                ('cuenta_origen', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='movimientos_salida', to='banco.cuenta')),
            ],
        ),
        migrations.CreateModel(
            name='Beneficiario',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('beneficiario', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='soy_beneficiario', to=settings.AUTH_USER_MODEL)),
                ('cuenta_destino', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='cuentas_beneficiario', to='banco.cuenta')),
                ('usuario', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='mis_beneficiarios', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
