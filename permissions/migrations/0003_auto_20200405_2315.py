# -*- coding: utf-8 -*-
# Generated by Django 1.11.11 on 2020-04-05 15:15
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('permissions', '0002_remove_permission_assign_veneer'),
    ]

    operations = [
        migrations.AlterField(
            model_name='permission',
            name='action',
            field=models.CharField(max_length=30, null=True, verbose_name='请求动作'),
        ),
        migrations.AlterField(
            model_name='permission',
            name='admin_menu',
            field=models.CharField(max_length=30, null=True, verbose_name='管理员导航栏'),
        ),
        migrations.AlterField(
            model_name='permission',
            name='description',
            field=models.CharField(max_length=200, null=True, verbose_name='描述'),
        ),
        migrations.AlterField(
            model_name='permission',
            name='is_active',
            field=models.BooleanField(default=True, verbose_name='是否启用'),
        ),
        migrations.AlterField(
            model_name='permission',
            name='view',
            field=models.CharField(max_length=30, null=True, verbose_name='视图名称'),
        ),
        migrations.AlterField(
            model_name='role',
            name='is_active',
            field=models.BooleanField(default=True, verbose_name='是否启用'),
        ),
    ]
