from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.


class Permission(models.Model):
    """权限类"""

    view = models.CharField(max_length=30, verbose_name='视图名称')
    action = models.CharField(max_length=30, verbose_name='请求动作')
    admin_menu = models.BooleanField(default=False, verbose_name='管理员导航栏')
    assign_veneer = models.BooleanField(default=False, verbose_name='指定互连人员')
    description = models.CharField(max_length=200, verbose_name='描述')
    is_active = models.BooleanField(default=False, verbose_name='是否启用')

    class Meta:
        db_table = 'permissions'


class Role(models.Model):
    """角色类"""
    name = models.CharField(max_length=30, unique=True, verbose_name='角色名称')
    permissions = models.ForeignKey(Permission, on_delete=models.PROTECT, verbose_name='拥有权限')
    description = models.CharField(max_length=200, verbose_name='描述')
    is_active = models.BooleanField(default=False, verbose_name='是否启用')

    class Meta:
        db_table = 'roles'


class User(AbstractUser):
    """用户类"""

    user_id = models.CharField(max_length=20, unique=True, verbose_name='工号')
    role = models.OneToOneField(Role, on_delete=models.CASCADE)

    class Meta:
        db_table = 'users'