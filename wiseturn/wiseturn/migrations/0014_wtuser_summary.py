# -*- coding: utf-8 -*-
# Generated by Django 1.11.17 on 2019-04-16 17:35
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('wiseturn', '0013_merge_20190416_1543'),
    ]

    operations = [
        migrations.AddField(
            model_name='wtuser',
            name='summary',
            field=models.CharField(blank=True, max_length=400),
        ),
    ]
