# Generated by Django 4.0.5 on 2022-11-16 08:52

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('nightout', '0013_suggestionvote'),
    ]

    operations = [
        migrations.RenameField(
            model_name='suggestionvote',
            old_name='Participant',
            new_name='participant',
        ),
    ]
