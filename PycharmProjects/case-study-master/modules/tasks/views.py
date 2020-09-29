from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.views import View
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import TaskSerializer

from .models import Task
from ..tags.models import Tag

from io import BytesIO
from django.http import HttpResponse
from django.template.loader import get_template
from xhtml2pdf import pisa
from django.shortcuts import render, redirect, HttpResponse


"""class Tasks(View):
    def get(self, request):
        return render(request, 'index.html', {})

    def post(self, request):
        return HttpResponse()"""

"""def index(request):
    return render(request, 'index.html')"""


# api structure
@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        'List': '/task-list/<str:pk>/',
        'Detail View': '/task-detail/<str:pk>/',
        'Create': '/task-create/<str:pk>/',
        'Update': '/task-update/<str:pk>/',
        'Delete': '/task-delete/<str:pk>/'
    }
    return Response(api_urls)


# task list api and tags
@api_view(['GET'])
def taskList(request, pk):
    tasks = Task.objects.filter(user_id=pk)
    serializer = TaskSerializer(tasks, many=True)
    for data in serializer.data:
        tags = Tag.objects.filter(task_id=data['id'])
        tags_str = ''
        if len(tags) > 1:
            for tag in tags:
                tags_str += tag.tag + ', '
            data['tags'] = tags_str[:-2]
        elif len(tags) == 1:
            data['tags'] = tags.first().tag
    return Response(serializer.data)


# task detail view
@api_view(['GET'])
def taskDetail(request, pk):
    tasks = Task.objects.get(id=pk)
    serializer = TaskSerializer(tasks, many=False)
    return Response(serializer.data)
    

# task post with current user id
@api_view(['POST'])
def taskPost(request, pk):
    request.data['user'] = pk
    serializer = TaskSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


# task update
@api_view(['POST'])
def taskUpdate(request, pk):
    task = Task.objects.get(id=pk)
    serializer = TaskSerializer(instance=task, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


# task delete
@api_view(['DELETE'])
def taskDelete(request, pk):
    task = Task.objects.get(id=pk)
    task.delete()
    return Response('Good!')


# pdf generator view
def pdf_generator(request, id):
    task = Task.objects.filter(id=id).first()
    tags = Tag.objects.filter(task_id=id)
    tags_str = ''
    if len(tags) > 1:
        for tag in tags:
            tags_str += tag.tag + ', '

    data = {
        "id":task.id,
        "task": task.task,
        "tags": tags_str[:-2],
        "created_at": task.created_at,
        "status": 'Completed' if task.is_completed == True else 'Not Completed'
    }
    pdf = render_to_pdf('app/pdf.html', {'data': data})
    return HttpResponse(pdf, content_type='application/pdf')


# pdf generator by xhtml2pdf
def render_to_pdf(template_src, context_dict={}):
    template = get_template(template_src)
    html = template.render(context_dict)
    result = BytesIO()
    pdf = pisa.pisaDocument(BytesIO(html.encode("utf-8")), result, encoding='utf-8')
    if not pdf.err:
        return HttpResponse(result.getvalue(), content_type='application/pdf')
    return None