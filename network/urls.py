
from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    #path("index/<int:user_id>", views.profail, name="profail"),

    # API Routes
    path("posts", views.composepost, name="composepost"),
    path("posts/<str:posts>", views.listposts, name="listposts"),
    path("statuslike", views.statuslike, name="statuslike"),
    path("edit", views.edit, name="edit"),
    path("comment", views.comment, name="comment"),
    path("subscribeunsubscribe", views.subscribeunsubscribe, name="subscribeunsubscribe")
]
