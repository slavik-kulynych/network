from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models import constraints, fields
from django.db.models.deletion import CASCADE

#----------------------------------------------------------------------------------
class User(AbstractUser):
    pass
#----------------------------------------------------------------------------------
class Post(models.Model):
    post_user_name = models.ForeignKey(User, on_delete=models.CASCADE)
    post_text = models.TextField(null=True, blank=True, max_length=140)
    post_date = models.DateTimeField(auto_now_add=True)
    post_like = models.IntegerField(default=0)
    
    def serialize(self):
        return {
            "id": self.id,
            "post_user_name": [self.post_user_name.username, self.post_user_name.id],
            "post_text": self.post_text,
            "post_date": self.post_date.strftime("%b %d %Y, %I:%M %p"),
            "post_like": self.post_like
        }
#----------------------------------------------------------------------------------
class UserPostLikeStatus(models.Model):
    status_user = models.ForeignKey(User, on_delete=models.CASCADE)
    status_post = models.ForeignKey(Post, on_delete=models.CASCADE)
    status_like = models.BooleanField()

    def serialize(self):
        #return f"{self.status_user}: {self.status_post} is {self.status_like}"
        return {
            "id": self.id,
            "status_user": [self.status_user.username, self.status_user.id],
            "status_post": self.status_post.id,
            "status_like": self.status_like
        }
#----------------------------------------------------------------------------------
class CommentsInPost(models.Model):
    comment_user = models.ForeignKey(User, on_delete=models.CASCADE)
    comment_post = models.ForeignKey(Post, on_delete=models.CASCADE)
    comment_text = models.TextField(null=True, blank=True, max_length=140)
    comment_date = models.CharField(max_length=25)

    def serialize(self):
        return {
            "id": self.id,
            "comment_user": [self.comment_user.username, self.comment_user.id],
            "comment_post": self.comment_post.id,
            "comment_text": self.comment_text,
            "comment_date": self.comment_date
        }
#----------------------------------------------------------------------------------
class FollowingAndFollowers(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name="following")
    following_user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name="followers")
    subscribed_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['user_id','following_user_id'], name="unique_followers")
        ]

    def serialize(self):
        return {
            "id": self.id,
            "user_id": [self.user_id.username, self.user_id.id],
            "following_user_id": [self.following_user_id.username, self.following_user_id.id],
            "subscribed_date": self.subscribed_date.strftime("%b %d %Y, %I:%M %p")
        }