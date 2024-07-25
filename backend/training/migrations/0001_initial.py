# Generated by Django 5.0.4 on 2024-07-25 09:03

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Training',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('duration', models.IntegerField(help_text='Duración en minutos')),
                ('notes', models.TextField(blank=True, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='entrenamientos', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='ClimbedRoute',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('difficulty', models.CharField(max_length=10)),
                ('location', models.CharField(max_length=100)),
                ('time_taken', models.IntegerField(help_text='Tiempo en segundos')),
                ('fell', models.BooleanField(default=False)),
                ('completed', models.BooleanField(default=False)),
                ('attempts', models.IntegerField(default=1)),
                ('notes', models.TextField(blank=True, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('training_session', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='vias', to='training.training')),
            ],
        ),
    ]