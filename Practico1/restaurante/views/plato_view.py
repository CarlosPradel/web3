from django.shortcuts import render, redirect, get_object_or_404
from restaurante.models import Plato
from restaurante.forms.plato_form import PlatoForm

def plato_list(request):
    platos = Plato.objects.all()
    return render(request, 'restaurante/plato/list.html', {'platos': platos})

def plato_create(request):
    form = PlatoForm(request.POST or None)
    if form.is_valid():
        form.save()
        return redirect('plato_list')
    return render(request, 'restaurante/plato/form.html', {'form': form})

def plato_update(request, pk):
    plato = get_object_or_404(Plato, pk=pk)
    form = PlatoForm(request.POST or None, instance=plato)
    if form.is_valid():
        form.save()
        return redirect('plato_list')
    return render(request, 'restaurante/plato/form.html', {'form': form})

def plato_delete(request, pk):
    plato = get_object_or_404(Plato, pk=pk)
    if request.method == 'POST':
        plato.delete()
        return redirect('plato_list')
    return render(request, 'restaurante/plato/confirm_delete.html', {'plato': plato})
