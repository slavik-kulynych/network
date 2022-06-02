import json
from django.contrib.auth import authenticate, login, logout
from django.core.exceptions import ObjectDoesNotExist
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.urls import reverse
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_protect
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
import math
from django.db.models import Sum

from .models import User, Post, UserPostLikeStatus, CommentsInPost, FollowingAndFollowers


def index(request):
    return render(request, "network/index.html")


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "network/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "network/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "network/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "network/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "network/register.html")
#--------------------------------------------------------------------------------------------------
@csrf_protect
@login_required
def composepost(request):
    print("composepost work!++")
    # Composing a new post must be via POST
    if request.method != "POST":
        return JsonResponse({"error": "POST request required."}, status=400)

    # Check write text
    data = json.loads(request.body)
    print(f"data={data}")
    posttext = data.get("post_text", "")
    if posttext == "":
        return JsonResponse({
            "error": "write you text please!!!"
        }, status=400)

    # Get post avtor
    get_user_id = data.get("post_user_name", "")
    postavtor = User.objects.get(id=get_user_id)
    print(f"user_id={get_user_id}")
    print(f"postavtor={postavtor}")
    print(f"posttext={posttext}")
    new_post = Post(
            post_user_name=postavtor,
            post_text=posttext
        )
    new_post.save()
    print(f"new_post={new_post}")

    return JsonResponse({"message": "Post create successfully."}, status=201)
#--------------------------------------------------------------------------------------------------
def listposts(request, posts):
    print("list posts work!++")
    # Filter post returned based on userposts
    print(f"username={request.user}")
    print(f"requestGET={request}")
    print(f"requetdict={request.GET}")
    print(f"requetdict_headers={request.headers}")
    print(f"requetdict_params={request.body}")
    if request.method != "GET":
        data = json.loads(request.body)
        print(f"data={data}")
        current_page = data.get("current_page", "")
        print(f"current_page={current_page}")
        my_user_id = data.get("my_user_id", "")
        print(f"my_user_id={my_user_id}")
    else:
        current_page = 1
    print(f"posts={posts}")
    count_list_posts = 0
    count_user_likes = 0
    count_following = 0
    count_followers = 0

    if posts == "allposts":
        list_posts = Post.objects.all()
        count_list_posts = Post.objects.filter(post_user_name=request.user).count()
        list_myposts = Post.objects.filter(post_user_name=request.user)
        #print(f"list_myposts_allposts={list_myposts}")
#************************************************************************
        status_subscribe = FollowingAndFollowers.objects.all()
        faind_subscribe = User.objects.get(id=my_user_id)
        print(f"list_follow={faind_subscribe}")
        list_following = faind_subscribe.following.all()
        list_followers = faind_subscribe.followers.all()
        print(f"list_following={list_following}")
        print(f"list_followers={list_followers}")
        if list_following.count() != 0:
            count_following = list_following.count()
        else:
            count_following = 0
        if list_followers.count() != 0:
            count_followers = list_followers.count()
        else:
            count_followers = 0
        print(f"count_following={count_following}")
        print(f"count_followers={count_followers}")
#************************************************************************
        #serialize_list_myposts = [post.serialize() for post in list_myposts]
        #print(f"serialize_list_myposts={serialize_list_myposts}")
        sum_likes_dict = list_myposts.aggregate(Sum('post_like'))
        sum_likes = sum_likes_dict.get("post_like__sum", "")
        print(f"sum_like={sum_likes_dict}:sum={sum_likes}")
        if sum_likes == None:
            count_user_likes = 0
        else:
            count_user_likes = sum_likes
    elif posts == "myposts":
        list_posts = Post.objects.filter(post_user_name=request.user)
        count_list_posts = Post.objects.filter(post_user_name=request.user).count()
        sum_likes_dict = list_posts.aggregate(Sum('post_like'))
        sum_likes = sum_likes_dict.get("post_like__sum", "")
        print(f"sum_like={sum_likes_dict}:sum={sum_likes}")
        count_user_likes = sum_likes
        #************************************************************************
        status_subscribe = FollowingAndFollowers.objects.all()
        faind_subscribe = User.objects.get(id=my_user_id)
        print(f"list_follow={faind_subscribe}")
        list_following = faind_subscribe.following.all()
        list_followers = faind_subscribe.followers.all()
        print(f"list_following={list_following}")
        print(f"list_followers={list_followers}")
        if list_following.count() != 0:
            count_following = list_following.count()
        else:
            count_following = 0
        if list_followers.count() != 0:
            count_followers = list_followers.count()
        else:
            count_followers = 0
        print(f"count_following={count_following}")
        print(f"count_followers={count_followers}")
        #************************************************************************
        if list_posts.count() == 0:
            user_no_post = str(request.user)
            print(f"user_no_post={user_no_post}")
            count_user_likes = 0
            return JsonResponse({
                "error": "This user have no posts.",
                "user_no_post": user_no_post,
                "count_list_posts": count_list_posts,
                "count_user_likes": count_user_likes,
                 "count_following": count_following,
                "count_followers": count_followers
                }, status=500)
    elif posts == posts and posts != "allposts" and posts != "myposts" and posts != "following":
        stranger_id = int(posts)
        print(f"stranger_id={stranger_id}")
        list_posts = Post.objects.filter(post_user_name=posts)
        count_list_posts = Post.objects.filter(post_user_name=posts).count()
        sum_likes_dict = list_posts.aggregate(Sum('post_like'))
        sum_likes = sum_likes_dict.get("post_like__sum", "")
        print(f"sum_like={sum_likes_dict}:sum={sum_likes}")
        count_user_likes = sum_likes
        filteruser = request.user
        print(f"filteruser={filteruser}")
        #************************************************************************
        status_subscribe = FollowingAndFollowers.objects.all()
        faind_subscribe = User.objects.get(id=posts)
        print(f"list_follow={faind_subscribe}")
        list_following = faind_subscribe.following.all()
        list_followers = faind_subscribe.followers.all()
        print(f"list_following={list_following}")
        print(f"list_followers={list_followers}")
        if list_following.count() != 0:
            count_following = list_following.count()
        else:
            count_following = 0
        if list_followers.count() != 0:
            count_followers = list_followers.count()
        else:
            count_followers = 0
        print(f"count_following={count_following}")
        print(f"count_followers={count_followers}")
        #************************************************************************
        if list_posts.count() == 0:
            user_no_post = str(User.objects.get(id=posts))
            print(f"user_no_post={user_no_post}")
            count_user_likes = 0
            return JsonResponse({
                "error": "This user have no posts.",
                "user_no_post": user_no_post,
                "count_list_posts": count_list_posts,
                "count_user_likes": count_user_likes,
                "count_following": count_following,
                "count_followers": count_followers
                }, status=500)
#//////////////////////////////////////////////////////////////////////////////////////
    elif posts == "following":
        #stranger_id = int(posts)
        #print(f"stranger_id={stranger_id}")
        #list_posts = Post.objects.filter(post_user_name=posts)
        #count_list_posts = Post.objects.filter(post_user_name=posts).count()
        #sum_likes_dict = list_posts.aggregate(Sum('post_like'))
        #sum_likes = sum_likes_dict.get("post_like__sum", "")
        #print(f"sum_like={sum_likes_dict}:sum={sum_likes}")
        #count_user_likes = sum_likes
        #filteruser = request.user
        #print(f"filteruser={filteruser}")
        #************************************************************************
        status_subscribe = FollowingAndFollowers.objects.all()
        faind_subscribe = User.objects.get(id=my_user_id)
        print(f"list_follow={faind_subscribe}")
        list_following = faind_subscribe.following.all()
        list_followers = faind_subscribe.followers.all()
        print(f"list_following={list_following}")
        print(f"list_followers={list_followers}")
        if list_following.count() != 0:
            count_following = list_following.count()
        else:
            count_following = 0
        if list_followers.count() != 0:
            count_followers = list_followers.count()
        else:
            count_followers = 0
        print(f"count_following={count_following}")
        print(f"count_followers={count_followers}")
        #******************************** union queryset*************************
        following_post_list = Post.objects.filter(post_user_name__in=[element.following_user_id.id for element in list_following])
        print(f"following post list={following_post_list}")
        #************************************************************************
        list_posts = following_post_list
        list_posts_for_like = Post.objects.filter(post_user_name=request.user)
        count_list_posts = Post.objects.filter(post_user_name=request.user).count()
        sum_likes_dict = list_posts_for_like.aggregate(Sum('post_like'))
        sum_likes = sum_likes_dict.get("post_like__sum", "")
        print(f"sum_like={sum_likes_dict}:sum={sum_likes}")
        count_user_likes = sum_likes
#/////////////////////////////////////////////////////////////////////////////////////
    else:
        return JsonResponse({"error": "Invalid category posts."}, status=400)

    # Return posts in reverse chronologial order
    list_posts = list_posts.order_by("-post_date").all()
    print(f"list_postprev={list_posts}")
    #++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    # like status
    status_for_like = UserPostLikeStatus.objects.filter(status_user=request.user).all()
    print(f"status_for_like={status_for_like}")
    status_list = []
    if not status_for_like:
        print("this user not like yet")
    else:
        print("this user like already")
        status_list = [status.serialize() for status in status_for_like]
        print(f"status_list={status_list}")
    #++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    # comments add
    add_comments = CommentsInPost.objects.all()
    print(f"add_comments={add_comments}")
    comment_list = []
    if not add_comments:
        print("no comment yet")
    else:
        print("comment add already")
        comment_list = [comment.serialize() for comment in add_comments]
        print(f"comment_list={comment_list}")
    #++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    #status subscribe serialize
    list_subscribe = [subscribe.serialize() for subscribe in status_subscribe]
    print(f"list_subscribe={list_subscribe}")
    #++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    #following serialize
    following_serialize = [user_following.serialize() for user_following in list_following]
    print(f"following_serialize={following_serialize}")
    #++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    #followers serialize
    followers_serialize = [user_followers.serialize() for user_followers in list_followers]
    print(f"followers_serialize={followers_serialize}")
    #++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    #page = "1"
    split = 10     
    page = str(current_page)
    pagesCount = math.ceil(list_posts.count() / split)
    print(f"pagesCount={pagesCount}")
    # check the param page if is a number 
    if page.isdigit():
        currentPage = int(page) 
    else:         
        currentPage = 1 
    # check if is between 1 ans max page 
    if currentPage > pagesCount:         
        currentPage = pagesCount     
    elif currentPage < 1:         
        currentPage = 1 
        #    get posts that we need     
    post_list = list_posts[currentPage * split - split: currentPage * split]     
    #post_list = post_list.values('id', 'post_user_name', 'post_text', 'post_date', 'post_like')
    post_list = [post.serialize() for post in post_list]
    print(f"post_list_values={post_list}") 
    return JsonResponse({
        "items": {
            "currentPage": currentPage,
            "pageCount": pagesCount,
            "posts": list(post_list),
            "statuslike": list(status_list),
            "comments": list(comment_list),
            "following": list(following_serialize),
            "followers": list(followers_serialize),
            "list_subscribe": list_subscribe
        },
        "info":{
            "count_list_posts": count_list_posts,
            "count_user_likes": count_user_likes,
            "count_following": count_following,
            "count_followers": count_followers
        }})
#    return JsonResponse([post.serialize() for post in list_posts], safe=False)
    #return JsonResponse(list(post_list), currentPage, pagesCount)
#--------------------------------------------------------------------------------------------------
def statuslike(request):
    print("statuslike work ++")
    print(f"statuslike_name={request.user}")
    print(f"statuslike_requestGET={request}")
    print(f"statuslike_requetdict={request.GET}")
    print(f"statuslike_requetdict_headers={request.headers}")
    print(f"statuslike_requetdict_params={request.body}")

    data_like = json.loads(request.body)
    print(f"data_like={data_like}")
    post_like_id = data_like.get("post_id", "")
    user_like_id = data_like.get("user_id", "")
    user_like_name = User.objects.get(id=user_like_id)
    switcher = data_like.get("switcher", "")
    like_counter = data_like.get("like_counter", "")
    print(f"post_like_id={post_like_id}")
    print(f"user_like_name={user_like_name}")
    print(f"switcher={switcher}")
    print(f"like_counter={like_counter}")

    current_post = Post.objects.get(pk=post_like_id)
    old_like_count = Post.objects.values_list('post_like', flat=True).get(pk=post_like_id)
    if like_counter < 0:
            print("critical error like < 0")
            return JsonResponse({"error": "Critical error like <0."}, status=400)
    elif switcher == "True":
            print("like +")
            old_like_count += 1
            current_post.post_like = old_like_count
            current_post.save()
            print(f"current_post={current_post}")
    elif switcher == "False":
            print("like -")
            old_like_count -= 1
            current_post.post_like = old_like_count
            current_post.save()
            print(f"current_post={current_post}")

    likedislike = UserPostLikeStatus.objects.filter(status_user=user_like_id).filter(status_post=post_like_id)
    print(f"likedislike={likedislike}")
    if not likedislike:
        print("likedislike is empty go to create")
        new_status_like = UserPostLikeStatus.objects.create(status_user=user_like_name, status_post=current_post, status_like=switcher)
        new_status_like.save()
        print(f"new_status_like={new_status_like}")
    else:
        print("likedislike ok to update")
        likedislike.update(status_like=switcher)
    
    return JsonResponse({"message": "Like or dislike added successfully."}, status=201)
#------------------------------------------------------------------------------------------------
def edit(request):
    print("edit work ++")
    print(f"edit_name={request.user}")
    print(f"edit_requestGET={request}")
    print(f"edit_requetdict={request.GET}")
    print(f"edit_requetdict_headers={request.headers}")
    print(f"edit_requetdict_params={request.body}")

    data_edit = json.loads(request.body)
    print(f"data_edit={data_edit}")

    post_edit_id = data_edit.get("post_id", "")
    correct_post_text = data_edit.get("post_text", "")
    print(f"post_edit_id={post_edit_id}")
    print(f"correct_post_text={correct_post_text}")

    current_post = Post.objects.get(pk=post_edit_id)
    current_post.post_text = correct_post_text
    current_post.save()

    return JsonResponse({"message": "Text correct successfully."}, status=201)
#------------------------------------------------------------------------------------------------

#--------------------------------------------------------------------------------------------------
def comment(request):
    print("comment work ++")
    print(f"comment_name={request.user}")
    print(f"comment_requestGET={request}")
    print(f"comment_requetdict={request.GET}")
    print(f"comment_requetdict_headers={request.headers}")
    print(f"comment_requetdict_params={request.body}")

    data_comment = json.loads(request.body)
    print(f"data_comment={data_comment}")

    post_comment_id = data_comment.get("post_id", "")
    current_post_comment = Post.objects.get(pk=post_comment_id)
    post_comment_text = data_comment.get("comment_text", "")
    comment_userid = data_comment.get("user_id","")
    comment_username = User.objects.get(id=comment_userid)
    comment_datetime = data_comment.get("comment_date","")
    print(f"post_comment_id={post_comment_id}")
    print(f"post_comment_text={post_comment_text}")
    print(f"comment_username={comment_username}")
    print(f"comment_datetime={comment_datetime}")

    new_comment = CommentsInPost.objects.create(comment_user=comment_username, comment_post=current_post_comment, comment_text=post_comment_text, comment_date=comment_datetime)
    new_comment.save()

    #current_post = Post.objects.get(pk=post_edit_id)
    #current_post.post_text = correct_post_text
   # current_post.save()

    return JsonResponse({"message": "comment added successfully."}, status=201)
#------------------------------------------------------------------------------------------------
def subscribeunsubscribe(request):
    print("subscribe work ++")
    
    print(f"subscribe_requetdict={request.GET}")
    print(f"subscribe_requetdict_headers={request.headers}")
    print(f"subscribe_requetdict_params={request.body}")

    data_subscribe = json.loads(request.body)
    print(f"data_subscribe={data_subscribe}")

    my_user_id = data_subscribe.get("my_user_id", "")
    user_id = User.objects.get(id=my_user_id)
    subscribe_id = data_subscribe.get("subscribe_id", "")
    follow_id = User.objects.get(id=subscribe_id)
    status_subscribe = data_subscribe.get("status_subscribe","")

    print(f"subscribe={my_user_id}:{subscribe_id}--{status_subscribe}")

    if status_subscribe == "subscribe":
        print(f"status subscribe={status_subscribe}")
        new_subscribe = FollowingAndFollowers.objects.create(user_id=user_id, following_user_id=follow_id)
        new_subscribe.save()
        return JsonResponse({"message": "subscribed successfully."}, status=201)
    else:
        print(f"status subscribe={status_subscribe}")
        unsubscribed = FollowingAndFollowers.objects.filter(user_id=user_id).filter(following_user_id=follow_id)
        print(f"delete={unsubscribed}")
        unsubscribed.delete()
        return JsonResponse({"message": "unsubscribed successfully."}, status=201)
    #return JsonResponse({"message": "subscribed successfully."}, status=201)
#------------------------------------------------------------------------------------------------