# Generated by Django 4.0.5 on 2023-01-13 17:17

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('nightout', '0005_alter_participantdate_options'),
    ]

    operations = [
        migrations.CreateModel(
            name='Notification',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('createdAt', models.DateTimeField(auto_now_add=True)),
                ('dismissed', models.BooleanField(default=False)),
                ('notificationType', models.CharField(choices=[('ask for next Phase', 'asks you to bring the Nightout to the next Phase.'), ('nightout finished', 'This Nightout is finished, go take a look'), ('next Phase', 'This Nightout is in the next phase')], max_length=40)),
                ('creator', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='createdNotifications', to='nightout.participant')),
                ('nightout', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='notificationsOnNightout', to='nightout.nightoutmodel')),
                ('receiver', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='receivedNotifications', to='nightout.participant')),
            ],
        ),
    ]
