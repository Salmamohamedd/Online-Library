# Generated by Django 5.0.6 on 2024-05-12 16:01

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=65)),
                ('username', models.CharField(max_length=65, unique=True)),
                ('email', models.EmailField(max_length=254)),
                ('phone', models.CharField(max_length=11)),
                ('password', models.CharField(max_length=10)),
                ('gender', models.CharField(max_length=6)),
                ('Type', models.CharField(max_length=5)),
            ],
        ),
    ]
