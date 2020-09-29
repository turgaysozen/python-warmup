from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.views import View
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import TagSerializer
from .models import Tag

# tags list
@api_view(['GET'])
def tagList(request):
    tags = Tag.objects.all() 
    serializer = TagSerializer(tags, many=True)
    return Response(serializer.data)


# tag post
@api_view(['POST'])
def tagPost(request):
    tags = request.data['tag'].split(',')
    task = request.data['task']
    new_tag = {}
    for tag in tags:
        new_tag = {
            'tag': tag,
            'task': task
        }
        serializer = TagSerializer(data=new_tag)
        if serializer.is_valid():
            serializer.save()
    return Response(serializer.data)
