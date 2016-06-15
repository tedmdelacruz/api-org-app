from __future__ import unicode_literals

from django.db import models

class Note(models.Model):
    title = models.CharField(max_length=100)
    text = models.TextField(max_length=255)

    def __str__(self):
        return self.title

class Todo(models.Model):
    entry = models.CharField(max_length=100)
    is_done = models.BooleanField(default=False)

    def __str__(self):
        return self.entry
