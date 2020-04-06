#!/usr/bin/env python
# -*- encoding: utf-8 -*-
"""
=======================================================
__author__: lwx913294
__date__: 2020/4/3 23:10
=======================================================
"""
from django.conf.urls import url
from rest_framework.routers import DefaultRouter

from .views import PermissionViewSet, AllPermissionView, AllRoleView, RoleViewSet, UserViewSet

urlpatterns = [
    url(r'^all_permissions/$', AllPermissionView.as_view()),
    url(r'^all_roles/$', AllRoleView.as_view()),
]

router = DefaultRouter()
router.register(r'permissions', PermissionViewSet, 'permissions')
router.register(r'roles', RoleViewSet, 'roles')
router.register(r'users', UserViewSet, 'users')

urlpatterns += router.urls
