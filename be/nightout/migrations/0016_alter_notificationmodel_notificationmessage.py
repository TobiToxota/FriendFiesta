# Generated by Django 4.0.5 on 2023-01-22 10:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('nightout', '0015_alter_plansuggestion_description'),
    ]

    operations = [
        migrations.AlterField(
            model_name='notificationmodel',
            name='notificationMessage',
            field=models.CharField(choices=[('ask_next_phase', 'asks you to bring this Nightout to the next phase'), ('nightout_finished', 'This Nightout is finished. Go take a look'), ('added_you_to_nightout', 'has addded you to a Nightout'), ('nightout_next_phase', 'This nightout was brought to the next phase by')], max_length=80),
        ),
    ]
