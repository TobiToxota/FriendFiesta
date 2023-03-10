# Generated by Django 4.0.5 on 2023-02-07 15:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('nightout', '0020_plansuggestion_status'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='planentry',
            options={'ordering': ['startTime']},
        ),
        migrations.RemoveField(
            model_name='plansuggestion',
            name='status',
        ),
        migrations.AddField(
            model_name='participant',
            name='finishedPlanningPhase',
            field=models.BooleanField(default=False),
        ),
    ]
