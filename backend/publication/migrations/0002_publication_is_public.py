# Generated by Django 5.0.4 on 2024-08-07 13:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('publication', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='publication',
            name='is_public',
            field=models.BooleanField(default=True),
        ),
    ]
