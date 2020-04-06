#!/usr/bin/env python
# -*- encoding: utf-8 -*-
"""
=======================================================
__author__: lwx913294
__date__: 2020/4/5 22:56
=======================================================
"""
from rest_framework import serializers

from .models import Permission, Role, User


class PermissionSerializer(serializers.ModelSerializer):
    """权限序列化器"""
    class Meta:
        model = Permission
        fields = '__all__'


class AllPermissionSerializer(serializers.ModelSerializer):
    """所有权限序列化器"""
    class Meta:
        model = Permission
        fields = ('id', 'description')


class RoleSerializer(serializers.ModelSerializer):
    """角色序列化器"""
    perms = serializers.ListField(write_only=True)
    permissions = serializers.StringRelatedField(many=True, read_only=True)

    class Meta:
        model = Role
        fields = '__all__'
        depth = 1

    def create(self, validated_data):
        perm_ids = validated_data.pop('perms')
        role = Role.objects.create(**validated_data)
        for perm_id in perm_ids:
            permission = Permission.objects.get(id=perm_id)
            role.permissions.add(permission)
        return role


class AllRoleSerializer(serializers.ModelSerializer):
    """所有用户序列化器"""
    class Meta:
        model = Role
        fields = ('id', 'name')


class UserSerializer(serializers.ModelSerializer):
    """用户序列化器"""
    role_id = serializers.IntegerField()
    role = serializers.StringRelatedField(read_only=True)
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('user_id', 'password', 'username', 'email', 'date_joined', 'role', 'role_id')

    def create(self, validated_data):
        role_id = validated_data.pop('role_id', None)
        if role_id is not None:
            role = Role.objects.get(id=role_id)
            validated_data['role'] = role
        user = User.objects.create_user(**validated_data)
        return user
