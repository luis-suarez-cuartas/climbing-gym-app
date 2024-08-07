from django.contrib import admin
from .models import Publication, Like, Comment

admin.site.register(Publication)
admin.site.register(Like)
admin.site.register(Comment)
