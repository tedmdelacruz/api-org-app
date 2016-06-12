from django.http import HttpResponse, HttpResponseNotFound
from django.core import serializers as s
import json

from .models import Note 

def create_note(request):
    data = json.loads(request.body)
    note = Note(title=data['title'], text=data['text'])
    note.save()
    return HttpResponse(json.dumps({ 'result': 'success' }),
        content_type='application/json')

def get_notes(request):
    notes = Note.objects.all()
    response = s.serialize('json', notes)
    return HttpResponse(response,
        content_type='application/json')

def notes(request):

    if (request.method == 'GET'):
        return get_notes(request)

    if (request.method == 'POST'):
        return create_note(request)

    return HttpResponseNotFound('Page not found',
        content_type='application/json')


def todos(request):
    return HttpResponse('')