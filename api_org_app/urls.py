from django.conf.urls import url
from django.contrib import admin

import pages.views
import notes_api.views
import todos_api.views

urlpatterns = [
    url(r'^admin/', admin.site.urls),

    url(r'^$', pages.views.index),

    url(r'^api/notes/', notes_api.views.index),

    url(r'^api/note/(?P<note_id>[0-9]+)/', notes_api.views.index),

    url(r'^api/todos/', todos_api.views.index),

    url(r'^api/todo/(?P<todo_id>[0-9]+)/(?P<action>[\w-]*)', todos_api.views.index),
]
