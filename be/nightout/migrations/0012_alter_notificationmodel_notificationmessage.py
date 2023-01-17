# Generated by Django 4.0.5 on 2023-01-17 09:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('nightout', '0011_alter_notificationmodel_sender'),
    ]

    operations = [
        migrations.AlterField(
            model_name='notificationmodel',
            name='notificationMessage',
            field=models.CharField(choices=[('ask_next_phase', 'asks you to bring this Nightout to the next phase'), ('nightout_finished', 'This Nightout is finished. Go take a look')], max_length=80),
        ),
    ]