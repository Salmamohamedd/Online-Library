from django.urls import path
from . import views

urlpatterns = [
    path("", views.main, name="main"),
    path("signup", views.signup, name="signup"),
    path("signin", views.signin, name="signin"),
    # path("logout", views.signin, name="logout"),

    path("<int:admin_id>/adminHome", views.adminHome, name="adminHome"),
    path("<int:admin_id>/adminBooks", views.adminBooks, name="adminBooks"),
    path("<int:user_id>/borrowBook", views.borrowBook, name="borrowBook"),
    
    path("<int:admin_id>/adminProfile", views.adminProfile, name="adminProfile"),
    path("<int:admin_id>/adminAbout", views.adminAbout, name="adminAbout"),
    path("<int:admin_id>/adminContact", views.adminContact, name="adminContact"),


    path("<int:user_id>/userHome", views.userHome, name="userHome"),
    path("<int:user_id>/userBooks", views.userBooks, name="userBooks"),
    path("<int:user_id>/userBorrowed", views.userBorrowed, name="userBorrowed"),
    path("<int:user_id>/userLiked", views.userLiked, name="userLiked"),

    path("<int:user_id>/userProfile", views.userProfile, name="userProfile"),
    path("<int:user_id>/userAbout", views.userAbout, name="userAbout"),
    path("<int:user_id>/userContact", views.userContact, name="userContact"), 

    path("<int:book_id>/<int:user_id>/bookPage", views.bookPage, name="bookPage"),

    path("<int:user_id>/likepost", views.likePost, name='likepost'),   # likepost view at /likepost
]