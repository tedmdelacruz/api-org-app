from django.http import HttpResponse, HttpResponseNotFound
from django.forms.models import model_to_dict
from django.core import serializers as s
import json

from .models import Note, Todo

def get_notes():
    notes = Note.objects.all().order_by('-pk')
    response = s.serialize('json', notes)
    return HttpResponse(response,
        content_type='application/json')

def create_note(request):
    data = json.loads(request.body)
    note = Note(title=data['title'], text=data['text'])
    note.save()
    return HttpResponse(json.dumps({ 'result': 'success' }),
        content_type='application/json')

def update_note(request):
    data = json.loads(request.body)
    note = Note(pk=data['id'], title=data['title'], text=data['text'])
    note.save()
    return HttpResponse(json.dumps({ 'result': 'success' }),
        content_type='application/json')

def delete_note(request, note_id):
    note = Note.objects.get(pk=note_id)
    note.delete()
    return HttpResponse(json.dumps({ 'result': 'success' }),
        content_type='application/json')

def notes(request, note_id=None):

    if (request.method == 'GET'):
        return get_notes()

    if (request.method == 'POST'):
        return create_note(request)

    if (request.method == 'PUT'):
        return update_note(request)

    if (request.method == 'DELETE'):
        return delete_note(request, note_id)

    return HttpResponseNotFound('Page not found',
        content_type='application/json')

def get_todos():
    todos = Todo.objects.all().order_by('-pk')
    response = s.serialize('json', todos)
    return HttpResponse(response,
        content_type='application/json')

def create_todo(request):
    data = json.loads(request.body)
    todo = Todo(entry=data['entry'])
    todo.save()
    return HttpResponse(json.dumps({ 'result': 'success' }),
        content_type='application/json')

def toggle_todo(request, todo_id):
    data = json.loads(request.body)
    todo = Todo.objects.get(pk=todo_id)
    todo.is_done = data['is_done']
    todo.save()
    return HttpResponse(json.dumps({ 'result': 'success' }),
        content_type='application/json')

def update_todo(request, todo_id):
    data = json.loads(request.body)
    todo = Todo(pk=todo_id, entry=data['entry'], is_done=data['is_done'])
    todo.save()
    return HttpResponse(json.dumps({ 'result': 'success' }),
        content_type='application/json')

def delete_todo(request, todo_id):
    todo = Todo.objects.get(pk=todo_id)
    todo.delete()
    return HttpResponse(json.dumps({ 'result': 'success' }),
        content_type='application/json')

def todos(request, todo_id=None, action=None):

    if (request.method == 'GET'):
        return get_todos()

    if (request.method == 'POST'):
        return create_todo(request)

    if (request.method == 'PUT'):
        if (action == 'toggle'):
            return toggle_todo(request, todo_id)
        else:
            return update_todo(request, todo_id)

    if (request.method == 'DELETE'):
        return delete_todo(request, todo_id)
