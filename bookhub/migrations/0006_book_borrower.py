# Generated by Django 5.0.6 on 2024-05-14 00:46

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bookhub', '0005_alter_book_availability'),
    ]

    operations = [
        migrations.AddField(
            model_name='book',
            name='borrower',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='borrowed_books', to='bookhub.user'),
        ),
    ]
