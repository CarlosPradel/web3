from django.shortcuts import render, redirect, get_object_or_404
from restaurante.models import Cliente
from restaurante.forms.cliente_form import ClienteForm

def cliente_list(request):
    clientes = Cliente.objects.all()
    return render(request, 'restaurante/cliente/list.html', {'clientes': clientes})

def cliente_create(request):
    form = ClienteForm(request.POST or None)
    if form.is_valid():
        form.save()
        return redirect('cliente_list')
    return render(request, 'restaurante/cliente/form.html', {'form': form})

def cliente_update(request, pk):
    cliente = get_object_or_404(Cliente, pk=pk)
    form = ClienteForm(request.POST or None, instance=cliente)
    if form.is_valid():
        form.save()
        return redirect('cliente_list')
    return render(request, 'restaurante/cliente/form.html', {'form': form})

def cliente_delete(request, pk):
    cliente = get_object_or_404(Cliente, pk=pk)
    if request.method == 'POST':
        cliente.delete()
        return redirect('cliente_list')
    return render(request, 'restaurante/cliente/confirm_delete.html', {'cliente': cliente})
