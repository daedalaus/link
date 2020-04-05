# -*- coding: utf-8 -*-
# Generated by Django 1.11.11 on 2020-04-04 16:05
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('veneers', '0006_auto_20200405_0004'),
    ]

    operations = [
        migrations.AlterField(
            model_name='veneer',
            name='pcb_status',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, to='veneers.PCBStatus', verbose_name='单板状态'),
        ),
    ]