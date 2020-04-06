from django.shortcuts import render
from rest_framework.generics import ListAPIView

from common.viewsets import LayUIModelViewSet
from .models import Permission, Role, User
from .serializers import PermissionSerializer, AllPermissionSerializer, RoleSerializer, AllRoleSerializer, UserSerializer
# Create your views here.


class PermissionViewSet(LayUIModelViewSet):
    """权限视图集"""
    queryset = Permission.objects.all()
    serializer_class = PermissionSerializer


class AllPermissionView(ListAPIView):
    """所有权限视图"""
    queryset = Permission.objects.all()
    serializer_class = AllPermissionSerializer
    pagination_class = None

    def list(self, request, *args, **kwargs):
        response = super(AllPermissionView, self).list(request, *args, **kwargs)
        response.data = {
            'code': response.status_code,
            'msg': response.status_text,
            'data': response.data,
        }
        return response


class RoleViewSet(LayUIModelViewSet):
    """角色视图集"""
    queryset = Role.objects.all()
    serializer_class = RoleSerializer


class AllRoleView(ListAPIView):
    """所有角色视图"""
    queryset = Role.objects.all()
    serializer_class = AllRoleSerializer
    pagination_class = None

    def list(self, request, *args, **kwargs):
        response = super(AllRoleView, self).list(request, *args, **kwargs)
        response.data = {
            'code': response.status_code,
            'msg': response.status_text,
            'data': response.data,
        }
        return response


class UserViewSet(LayUIModelViewSet):
    """用户视图集"""
    queryset = User.objects.all()
    serializer_class = UserSerializer
    filter_fields = ('user_id', 'username', 'email', 'role')
