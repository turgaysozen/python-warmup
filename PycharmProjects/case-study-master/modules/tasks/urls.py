#from .views import Tasks
from django.urls import path, include
from .views import apiOverview, taskList, taskDetail, taskPost, taskUpdate, taskDelete, pdf_generator

urlpatterns = [
    path('', apiOverview, name='api'),
    path('task-list/<str:pk>/', taskList, name='task-list'),
    path('task-detail/<str:pk>/', taskDetail, name='task-detail'),
    path('task-create/<str:pk>/', taskPost, name="task-post"),
    path('task-update/<str:pk>/', taskUpdate, name="task-update"),
    path('task-delete/<str:pk>/', taskDelete, name="task-delete"),
    path('pdf/<int:id>/', pdf_generator)
]
