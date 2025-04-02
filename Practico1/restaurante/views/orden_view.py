from django.shortcuts import render, redirect, get_object_or_404
from restaurante.models import Orden
from restaurante.forms.orden_form import OrdenForm

def orden_list(request):
    ordenes = Orden.objects.all()
    return render(request, 'restaurante/orden/list.html', {'ordenes': ordenes})

def orden_create(request):
    form = OrdenForm(request.POST or None)
    if form.is_valid():
        form.save()
        return redirect('orden_list')
    return render(request, 'restaurante/orden/form.html', {'form': form})

def orden_update(request, pk):
    orden = get_object_or_404(Orden, pk=pk)
    form = OrdenForm(request.POST or None, instance=orden)
    if form.is_valid():
        form.save()
        return redirect('orden_list')
    return render(request, 'restaurante/orden/form.html', {'form': form})

def orden_delete(request, pk):
    orden = get_object_or_404(Orden, pk=pk)
    if request.method == 'POST':
        orden.delete()
        return redirect('orden_list')
    return render(request, 'restaurante/orden/confirm_delete.html', {'orden': orden})
