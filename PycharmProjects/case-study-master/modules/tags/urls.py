#from .views import Tasks
from django.urls import path, include
from .views import tagPost, tagList

urlpatterns = [
    path('tag-create/', tagPost, name="tag-post"),
    path('tag-list/', tagList, name="tag-list")
]
