# Generated by Django 4.0.5 on 2023-02-18 20:42

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('nightout', '0022_participant_abstention'),
    ]

    operations = [
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.CharField(max_length=300)),
                ('createdAt', models.DateTimeField(auto_now_add=True)),
                ('creator', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='postsFromParticipant', to='nightout.participant')),
                ('nightout', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='postsOnNightout', to='nightout.nightoutmodel')),
            ],
        ),
    ]