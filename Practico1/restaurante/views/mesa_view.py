from django.shortcuts import render, redirect, get_object_or_404
from restaurante.models import Mesa
from restaurante.forms.mesa_form import MesaForm

def mesa_list(request):
    mesas = Mesa.objects.all()
    return render(request, 'restaurante/mesa/list.html', {'mesas': mesas})

def mesa_create(request):
    form = MesaForm(request.POST or None)
    if form.is_valid():
        form.save()
        return redirect('mesa_list')
    return render(request, 'restaurante/mesa/form.html', {'form': form})

def mesa_update(request, pk):
    mesa = get_object_or_404(Mesa, pk=pk)
    form = MesaForm(request.POST or None, instance=mesa)
    if form.is_valid():
        form.save()
        return redirect('mesa_list')
    return render(request, 'restaurante/mesa/form.html', {'form': form})

def mesa_delete(request, pk):
    mesa = get_object_or_404(Mesa, pk=pk)
    if request.method == 'POST':
        mesa.delete()
        return redirect('mesa_list')
    return render(request, 'restaurante/mesa/confirm_delete.html', {'mesa': mesa})
