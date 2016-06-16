from django.http import HttpResponse, HttpResponseNotFound
from django.forms.models import model_to_dict
from django.core import serializers as s
import json

from .models import Note


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

def index(request, note_id=None):

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