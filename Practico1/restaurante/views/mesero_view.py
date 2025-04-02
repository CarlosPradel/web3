from django.shortcuts import render, redirect, get_object_or_404
from restaurante.models import Mesero
from restaurante.forms.mesero_form import MeseroForm

def mesero_list(request):
    meseros = Mesero.objects.all()
    return render(request, 'restaurante/mesero/list.html', {'meseros': meseros})

def mesero_create(request):
    form = MeseroForm(request.POST or None)
    if form.is_valid():
        form.save()
        return redirect('mesero_list')
    return render(request, 'restaurante/mesero/form.html', {'form': form})

def mesero_update(request, pk):
    mesero = get_object_or_404(Mesero, pk=pk)
    form = MeseroForm(request.POST or None, instance=mesero)
    if form.is_valid():
        form.save()
        return redirect('mesero_list')
    return render(request, 'restaurante/mesero/form.html', {'form': form})

def mesero_delete(request, pk):
    mesero = get_object_or_404(Mesero, pk=pk)
    if request.method == 'POST':
        mesero.delete()
        return redirect('mesero_list')
    return render(request, 'restaurante/mesero/confirm_delete.html', {'mesero': mesero})
