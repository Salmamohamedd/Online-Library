import json
from django import forms
from django.http import HttpResponseRedirect, JsonResponse,HttpResponse
from django.shortcuts import render, redirect
from django.urls import reverse
from .models import User, Book
from django.views.decorators.csrf import csrf_exempt



# Create your views here.
@csrf_exempt
def likePost(request, user_id):
    if request.method == 'POST':
           user_id = request.POST['user_id']
           book_id = request.POST['book_id']
           user = User.objects.get(id=user_id)
           book = Book.objects.get(id=book_id)
           liked = user.liked_books.all()
           if book not in liked:
               book.likes.add(user)
               book.save()  
           else:
               user.liked_books.remove(book)
           return HttpResponseRedirect(reverse("userBooks", args=(user_id,)))
    else:
           print("no")
           return HttpResponse("Request method is not a POST")

def main(request):
    return render(request, "bookhub/index.html")


def signup(request):
    if request.method == 'POST':
        name = request.POST['name']
        username = request.POST['username']
        email = request.POST['email']
        phone_number = request.POST['number']
        password = request.POST['password']
        confirm_password = request.POST['con_pass']
        gender = request.POST.get('gender')
        user_type = request.POST.get('type')

        if password == confirm_password:
            allUsers = User.objects.all()
            for user in allUsers:
                if username == user.username:
                    return render(request, "bookhub/signup.html", {
                        "message": "username in use"
                        })
            if user_type == 'admin':
                # Create a new admin user
                user = User(name=name, username=username, email=email, phone=phone_number, password=password, gender=gender, Type=user_type)
                user.save()

                return HttpResponseRedirect(reverse("adminHome", args=(user.id,)))
            else:
                # Create a new regular user
                user = User(name=name, username=username, email=email, phone=phone_number, password=password, gender=gender, Type=user_type)
                user.save()
            
                # Redirect to the user home page
                return HttpResponseRedirect(reverse("userHome", args=(user.id,)))        
        else:
        
            return render(request, 'bookhub/signup.html', { 
                "message":'Password and confirm password do not match.'
                })
    else:

        return render(request, "bookhub/signup.html")
    

def signin(request):
    if request.method == "POST":
        username = request.POST['name']
        password = request.POST['password']
        allUsers = User.objects.all()
        for user in allUsers:
            if username == user.username:
                if password == user.password:
                    if user.Type == 'admin':
                        return HttpResponseRedirect(reverse("adminHome", args=(user.id,)))
                    else:
                        return HttpResponseRedirect(reverse("userHome", args=(user.id,)))
                else:
                    return render(request, "bookhub/signin.html", {"message": "password incorrect"})

        return render(request, "bookhub/signin.html", {"message": "No account exists with this user name"})
    else:
        return render(request, "bookhub/signin.html")


def adminHome(request, admin_id):
    admin = User.objects.get(pk=admin_id)
    books = Book.objects.all()
    return render(request, "bookhub/adminHome.html",{
        "admin":admin,
        "books": books
    })


    
def adminBooks(request, admin_id):
    admin = User.objects.get(pk=admin_id)
    books = Book.objects.all()
    books_json = json.dumps(list(books.values()))
    if request.method == "POST":
        if request.POST.get('form_name') == 'addForm':
            name = request.POST["BookName"]
            cover = request.POST["BookCover"]
            author = request.POST["AuthorName"]
            publisher = request.POST["Publisher"]    
            category = request.POST["Category"]
            year = request.POST["Publishing-Year"]
            language = request.POST["Language"]
            pages = request.POST["Pages"]
            description = request.POST["Description"]
            book = Book(name = name, cover = cover, author = author, publisher = publisher, category = category, year = year, language = language, pages = pages, description = description)
            book.save()
            return HttpResponseRedirect(reverse("adminBooks", args=(admin.id,)))
        
        elif request.POST.get('form_name') == 'deleteForm':
            book_id = request.POST.get("BookID")
            obj = Book.objects.get(pk=book_id)
            obj.delete()
            return HttpResponseRedirect(reverse("adminBooks", args=(admin.id,)))
 
        elif request.POST.get('form_name') == 'editForm':
            book_id = request.POST.get("BookID")
            obj = Book.objects.get(pk=book_id)

            name = request.POST["BookName"]
            author = request.POST["AuthorName"]
            publisher = request.POST["Publisher"]    
            category = request.POST["Category"]
            year = request.POST["Publishing-Year"]
            language = request.POST["Language"]
            pages = request.POST["Pages"]
            description = request.POST["Description"]

            obj.name = name
            obj.author = author
            obj.publisher = publisher
            obj.category = category
            obj.year = year
            obj.language = language
            obj.pages = pages
            obj.description = description

            cover = request.FILES.get("BookCover") 
            if cover: 
                obj.cover = cover 

            obj.save()
            return HttpResponseRedirect(reverse("adminBooks", args=(admin.id,)))
    
    else:
        return render(request, "bookhub/view_books_admin.html",{
        "admin":admin,
        "books": books ,
        "books_json": books_json ,
    })





def adminProfile(request, admin_id):
    admin = User.objects.get(pk=admin_id)
    books = Book.objects.all()
    return render(request, "bookhub/adminProfile.html",{
        "admin":admin,
        "books": books
        })


def adminAbout(request, admin_id):
    admin = User.objects.get(pk=admin_id)
    return render(request, 'bookhub/adminAbout.html', {
        "admin": admin
    })

def adminContact(request, admin_id):
    admin = User.objects.get(pk=admin_id)
    return render(request, 'bookhub/adminContact.html', {
        "admin": admin
    })

def userHome(request, user_id):
    user = User.objects.get(pk=user_id)
    books = Book.objects.all()
    borrowed_books = Book.objects.filter(borrower_id=user_id)
    liked_books = user.liked_books.all()

    return render(request, "bookhub/userHome.html",{
        "user":user,
        "books": books,
        "borrowed": borrowed_books,
        "liked": liked_books
        
    })



@csrf_exempt
def borrowBook(request, user_id):
    if request.method == 'POST':
           user_id = request.POST['user_id']
           book_id = request.POST['book_id']
           book = Book.objects.get(id=book_id)
           book.borrower= User.objects.get(pk=user_id)
           book.availability="Unavailable"
           book.save()

           return HttpResponseRedirect(reverse("userBooks", args=(user_id,)))
    else:
           print("no")
           return HttpResponse("Request method is not a POST")


# def userBooks(request, user_id):
#     user = User.objects.get(pk=user_id)
#     liked_books = user.liked_books.all()
#     return render(request, "bookhub/booksUser.html", {
#             "user": user,
#             "books": Book.objects.all(),
#             "liked": liked_books
#         })


def userBooks(request, user_id):
    books = Book.objects.filter()
    user = User.objects.get(pk=user_id)
    liked_books = user.liked_books.all()

    # JSON
    books_json = json.dumps(list(books.values()))
    liked_json = json.dumps(list(liked_books.values()))

    return render(request, "bookhub/booksUser.html", {
        "user": user,
        "books": books, 
        "liked": liked_books,
        "books_json": books_json,
        "liked_json": liked_json,
}
)
    


def userBorrowed(request, user_id):
    user = User.objects.get(pk=user_id)
    if request.method == 'POST':
        book_id = request.POST.get("BookID")
        print(book_id)
        obj = Book.objects.get(pk=book_id)
        obj.borrower = None
        obj.availability = 'Available'
        obj.save()
        borrowed_books = Book.objects.filter(borrower_id=user_id)
        books_json = json.dumps(list(borrowed_books.values()))
        return render(request, "bookhub/Borrowed.html",{
            "user": user,
            "borrowed": borrowed_books,
            "books_json": books_json,
        })
    else:
        borrowed_books = Book.objects.filter(borrower_id=user_id)
        books_json = json.dumps(list(borrowed_books.values()))
        return render(request, "bookhub/Borrowed.html",{
            "user": user,
            "borrowed": borrowed_books,
            "books_json": books_json,
        })


def userLiked(request, user_id): #TAKII
    user = User.objects.get(pk=user_id)
    books = user.liked_books.all()

    # JSON
    liked_json = json.dumps(list(books.values()))

    if request.method == "POST":
        book_id = request.POST.get("BookID")
        book = Book.objects.get(pk=book_id)
        user.liked_books.remove(book)
        return HttpResponseRedirect(reverse("userLiked", args=(user_id,)))

    return render(request, "bookhub/liked.html", {
            "user": user,
            "liked": books,
            "liked_json": liked_json,
            })


def userProfile(request, user_id):
    user = User.objects.get(pk=user_id)
    borrowed_books = Book.objects.filter(borrower_id=user_id)
    liked_books = user.liked_books.all()

    return render(request, "bookhub/userProfile.html",{
        "user":user,
        "borrowed": borrowed_books,
        "liked": liked_books
        
    })

def userAbout(request, user_id):
    user = User.objects.get(pk=user_id)
    return render(request, 'bookhub/userAbout.html', {
        "user": user
    })

def userContact(request, user_id):
    user = User.objects.get(pk=user_id)
    return render(request, 'bookhub/userContact.html', {
        "user": user
    })

def bookPage(request, book_id, user_id):
    user = User.objects.get(pk=user_id)
    book = Book.objects.get(pk=book_id)
    return render(request, "bookhub/bookPage.html", {
        "user": user,
        "book": book
    })