from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.


class Permission(models.Model):
    """权限类"""

    view = models.CharField(max_length=30, null=True, verbose_name='视图名称')
    action = models.CharField(max_length=30, null=True, verbose_name='请求动作')
    description = models.CharField(max_length=200, null=True, verbose_name='描述')

    class Meta:
        db_table = 'permissions'

    def __str__(self):
        return self.description


class Role(models.Model):
    """角色类"""
    name = models.CharField(max_length=30, unique=True, verbose_name='角色名称')
    permissions = models.ManyToManyField(Permission, verbose_name='拥有权限')
    description = models.CharField(max_length=200, verbose_name='描述')
    is_active = models.BooleanField(default=True, verbose_name='是否启用')

    class Meta:
        db_table = 'roles'

    def __str__(self):
        return self.name


class User(AbstractUser):
    """用户类"""

    user_id = models.CharField(primary_key=True, max_length=20, unique=True, verbose_name='工号')
    role = models.OneToOneField(Role, on_delete=models.CASCADE)

    class Meta:
        db_table = 'users'
