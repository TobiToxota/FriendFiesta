# Generated by Django 4.0.5 on 2023-02-02 11:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('nightout', '0017_participant_finisheddatephase_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='planentry',
            name='formType',
            field=models.CharField(choices=[('Google Maps', 'Google Maps'), ('Individual Place', 'Individual Place')], default='Google Maps', max_length=80),
            preserve_default=False,
        ),
    ]
