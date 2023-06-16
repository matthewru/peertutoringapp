from django.shortcuts import render
from django.http import HttpResponse


#   Backend stuff basically goes here: Rohan, Diya, Matthew, Ronith


def say_hello(request):
    return render(request, 'hello.html', {'name': 'Connor, Mathew, Tejas'})