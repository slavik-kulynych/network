from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Post, UserPostLikeStatus, CommentsInPost, FollowingAndFollowers

# Register your models here.|
class PostAdmin(admin.ModelAdmin):
    list_display = ("id", "post_user_name", "post_text", "post_date", "post_like")
class FollowingAndFollowersAdmin(admin.ModelAdmin):
    list_display = ("id", "user_id", "following_user_id")
admin.site.register(User, UserAdmin)
admin.site.register(Post, PostAdmin)
admin.site.register(UserPostLikeStatus)
admin.site.register(CommentsInPost)
admin.site.register(FollowingAndFollowers, FollowingAndFollowersAdmin)