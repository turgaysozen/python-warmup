from django.db import models
from datetime import datetime    
from django.contrib.auth.models import User


class Task(models.Model):
    task = models.CharField(max_length=250, db_index=True, verbose_name="Task")
    is_completed = models.BooleanField(default=False, verbose_name="Is completed ?")
    created_at = models.DateTimeField(default=datetime.now)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.task}"
