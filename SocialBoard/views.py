from django.shortcuts import render, reverse
from django.http import HttpResponse, Http404, HttpResponseRedirect
from django.template import loader
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import login
from django.contrib.auth.decorators import login_required
import datetime
from django.views.decorators.csrf import csrf_protect

from .models import Post


@login_required
def index(request):
    db_entries = Post.objects.all
    context = {"db_entries": db_entries}
    return render(request, 'SocialBoard/index.html', context)


def register(request):
    if request.method == "POST":
        form = UserCreationForm(request.POST)
        if form.is_valid():
            new_user = form.save()
            login(request, new_user, backend='django.contrib.auth.backends.ModelBackend')
            return HttpResponseRedirect(reverse("index"))
    else:
        form = UserCreationForm()

    return render(request, "registration/register.html", {"form": form})


@csrf_protect
def addPost(request):
    if request.method == "POST":
        newPost ={
            "post_title": request.POST.get("title"),
            "post_content": request.POST.get("text"),
            "post_author": request.POST.get("author"),
            "post_publish_date": datetime.datetime.now()
        }
        Post.objects.create(**newPost)
        return HttpResponseRedirect(reverse("index"))

    else:
        return {"error": "Did not add new post"}

