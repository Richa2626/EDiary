# -*- coding: utf-8 -*-
# Generated by Django 1.10.7 on 2017-06-27 07:40
from __future__ import unicode_literals

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('archive', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='archive',
            name='date',
            field=models.DateTimeField(default=datetime.datetime(2017, 6, 27, 7, 40, 46, 948960, tzinfo=utc)),
        ),
    ]
