from django.db import models
import datetime

class Post(models.Model):
    post_title = models.CharField(max_length=120, null=False)
    post_publish_date = models.DateTimeField(datetime.datetime.now(), blank=True)
    post_content = models.CharField(max_length=500, null=False)
    post_author = models.CharField(max_length=24, null=False)