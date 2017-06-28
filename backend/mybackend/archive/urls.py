from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.archive_list, name='archive_list'),
    url(r'^(?P<id>[0-9]+)/$', views.archive_detail, name='archive_detail'),
]