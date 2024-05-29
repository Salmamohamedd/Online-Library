from django.db import models

# Create your models here.
class User(models.Model):
    name = models.CharField(max_length=65)
    username = models.CharField(max_length=65, unique=True)
    email = models.EmailField()
    phone = models.CharField(max_length=13)
    password = models.CharField(max_length=10)
    gender = models.CharField(max_length=6)
    Type = models.CharField(max_length=5)



class Book(models.Model):
    name = models.CharField(max_length = 75, unique=True)
    cover = models.ImageField()
    author = models.CharField(max_length = 65)
    category = models.CharField(max_length=75)
    publisher = models.CharField(max_length=75)
    year = models.IntegerField()
    language = models.CharField(max_length=20)
    pages = models.IntegerField()
    description = models.TextField()
    availability = models.CharField(max_length=13, default="Available")
    borrower = models.ForeignKey(User, on_delete=models.PROTECT, null=True, blank=True, related_name='borrowed_books')
    likes = models.ManyToManyField(User, null=True, blank=True, related_name='liked_books')

    def __str__(self):
        return f"{self.id} ({self.name})"


