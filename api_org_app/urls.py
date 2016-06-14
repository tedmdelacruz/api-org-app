from django.conf.urls import url
from django.contrib import admin

import pages.views
import api.views

urlpatterns = [
    url(r'^admin/', admin.site.urls),

    url(r'^$', pages.views.index),

    url(r'^api/notes/', api.views.notes),

    url(r'^api/note/(?P<note_id>[0-9]+)/', api.views.notes),

    url(r'^api/todos/', api.views.todos),
]
