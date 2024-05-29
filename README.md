# Online-Library

## Overview

This online library website allows users to view and search for books to borrow. The website has two types of users: admins and users. Each user can sign up and choose their role. The website provides a range of features for both admins and users, including book management, searching, and borrowing.

## Features

### Admin Features
Sign up: Fill in a form with username, password, confirm password, email, and is_admin to create an admin account.
Login: Log in to the website using admin credentials.
Add new books: Create new book entries with ID, book name, author, category, and description.
View list of available books: Display a list of all available books in the library.
Edit book details: Select a book and edit its details.
Delete a book: Remove a book from the library.


### User Features
Sign up: Fill in a form with username, password, confirm password, email, and is_admin to create a user account.
Login: Log in to the website using user credentials.
Search for books: Search for books by title, author, or category, with results displayed accordingly.
View list of available books: Display a list of available books, marked as available or not available if borrowed by another user.
View book details: Select a book and view its details on a dedicated book page.
Borrow a book: Borrow a book if it is available.
View borrowed books: Display a list of books borrowed by the user.
Navigation Bar
The navigation bar is dynamically adjusted based on the logged-in user.
The navigation bar is accessible from all web pages.


## Technical Requirements

Python 3.x
Django 3.x
HTML, CSS, JavaScript
Database: SQLite or MySQL


## Setup

Clone the repository: git clone https://github.com/your-username/online-library-website.git
Install dependencies: pip install -r requirements.txt
Run migrations: python manage.py migrate
Create a superuser: python manage.py createsuperuser
Run the development server: python manage.py runserver
