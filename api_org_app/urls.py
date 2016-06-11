from django.conf.urls import url
from django.contrib import admin

import pages.views

urlpatterns = [
    url(r'^admin/', admin.site.urls),

    url(r'^$', pages.views.index),
]
