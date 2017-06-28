from django.db import models
from django.utils import timezone

# Create your models here.
class Archive(models.Model):
    title = models.CharField(max_length=100)
    date = models.DateTimeField(default=timezone.now())
    description = models.TextField()
    emotions = models.CharField(max_length=10)