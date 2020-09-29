from django.db import models
from ..tasks.models import Task

class Tag(models.Model):
    tag = models.CharField(max_length=50, null=True)
    task = models.ForeignKey(Task, on_delete = models.CASCADE)
