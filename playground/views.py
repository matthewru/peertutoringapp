from django.shortcuts import render
from django.http import HttpResponse


#   Backend stuff basically goes here: Rohan, Diya, Matthew, Ronith


def say_hello(request):
    return render(request, 'schedule.html', {'name': 'Connor, Mathew, Tejas'})

def index(request):
    template = "index.html"
    return render(request, template)