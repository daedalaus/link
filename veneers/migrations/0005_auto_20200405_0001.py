# -*- coding: utf-8 -*-
# Generated by Django 1.11.11 on 2020-04-04 16:01
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('veneers', '0004_auto_20200404_2346'),
    ]

    operations = [
        migrations.AlterField(
            model_name='veneer',
            name='act_end_date',
            field=models.DateField(null=True, verbose_name='PCB设计结束时间'),
        ),
        migrations.AlterField(
            model_name='veneer',
            name='act_mach_date',
            field=models.DateField(null=True, verbose_name='PCB加工时间'),
        ),
        migrations.AlterField(
            model_name='veneer',
            name='act_start_date',
            field=models.DateField(null=True, verbose_name='PCB设计启动时间'),
        ),
        migrations.AlterField(
            model_name='veneer',
            name='decr_pins',
            field=models.IntegerField(default=0, verbose_name='减少PIN数'),
        ),
        migrations.AlterField(
            model_name='veneer',
            name='incr_pins',
            field=models.IntegerField(default=0, verbose_name='增加PIN数'),
        ),
        migrations.AlterField(
            model_name='veneer',
            name='modify_pins',
            field=models.IntegerField(default=0, verbose_name='改变PIN数'),
        ),
        migrations.AlterField(
            model_name='veneer',
            name='total_nets',
            field=models.IntegerField(default=0, verbose_name='总NET数'),
        ),
        migrations.AlterField(
            model_name='veneer',
            name='total_pins',
            field=models.IntegerField(default=0, verbose_name='总PIN数'),
        ),
        migrations.AlterField(
            model_name='veneer',
            name='uncon_nets',
            field=models.IntegerField(default=0, verbose_name='未连接NET数'),
        ),
        migrations.AlterField(
            model_name='veneer',
            name='uncon_pins',
            field=models.IntegerField(default=0, verbose_name='未连接PIN数'),
        ),
    ]
