from django import forms
from restaurante.models import Mesero

class MeseroForm(forms.ModelForm):
    class Meta:
        model = Mesero
        fields = ['nombre', 'apellido', 'telefono']
