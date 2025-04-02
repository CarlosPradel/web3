from django import forms
from restaurante.models import Orden

class OrdenForm(forms.ModelForm):
    class Meta:
        model = Orden
        fields = ['platos', 'mesero', 'mesa', 'cliente', 'estado']
        widgets = {
            'platos': forms.CheckboxSelectMultiple(),
        }

    def clean(self):
        cleaned_data = super().clean()
        mesa = cleaned_data.get('mesa')
        estado = cleaned_data.get('estado')
        platos = cleaned_data.get('platos')

        # Validar que la orden tenga al menos un plato
        if not platos or len(platos) == 0:
            raise forms.ValidationError('⚠️ La orden debe tener al menos un plato.')

        # Validar que una orden cerrada no se pueda editar
        if self.instance.pk:
            instancia_actual = Orden.objects.get(pk=self.instance.pk)
            if instancia_actual.estado == 'cerrada':
                raise forms.ValidationError('❌ No puedes modificar una orden que ya está cerrada.')

        # Solo una orden abierta por mesa
        if mesa and estado == 'abierta':
            ordenes_abiertas = Orden.objects.filter(mesa=mesa, estado='abierta')
            if self.instance.pk:
                ordenes_abiertas = ordenes_abiertas.exclude(pk=self.instance.pk)

            if ordenes_abiertas.exists():
                raise forms.ValidationError(f'⚠️ La mesa {mesa.numero} ya tiene una orden abierta.')

        return cleaned_data
