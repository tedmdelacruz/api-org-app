from django.http import HttpResponse, HttpResponseNotFound
from django.forms.models import model_to_dict
from django.core import serializers as s
from django.db import transaction
import json

from .models import Note
from todos_api.models import Todo

def get_notes():
    notes = Note.objects.all().order_by('-pk')
    items = s.serialize('json', notes)
    return HttpResponse(items, content_type='application/json')

def create_note(request):
    data = json.loads(request.body)
    note = Note(title=data['title'], text=data['text'])
    note.save()
    return HttpResponse()

def update_note(request):
    data = json.loads(request.body)
    note = Note(pk=data['id'], title=data['title'], text=data['text'])
    note.save()
    return HttpResponse()

@transaction.atomic
def convert_note(request, note_id):
    note = Note.objects.get(pk=note_id)
    note_fields = filter(None, [note.title, note.text])
    entry = ' - '.join(note_fields)
    todo = Todo(entry=entry)
    todo.save()
    note.delete()
    return HttpResponse()

def delete_note(request, note_id):
    note = Note.objects.get(pk=note_id)
    note.delete()
    return HttpResponse()

def index(request, note_id=None, action=None):
    if (request.method == 'GET'):
        return get_notes()

    if (request.method == 'POST'):
        return create_note(request)

    if (request.method == 'PUT'):
        if (action == 'convert'):
            return convert_note(request, note_id)
            
        return update_note(request)

    if (request.method == 'DELETE'):
        return delete_note(request, note_id)

    return HttpResponseNotFound('Page not found',
        content_type='application/json')