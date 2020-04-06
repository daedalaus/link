#!/usr/bin/env python
# -*- encoding: utf-8 -*-
"""
=======================================================
__author__: lwx913294
__date__: 2020/4/5 1:04
=======================================================
"""
from rest_framework import status, mixins
from rest_framework.viewsets import ModelViewSet, ReadOnlyModelViewSet, GenericViewSet
from rest_framework.response import Response


class LayUIModelViewSet(ModelViewSet):
    def create(self, request, *args, **kwargs):
        response = super(LayUIModelViewSet, self).create(request, *args, **kwargs)

        response.data = {
            'code': response.status_code,
            'msg': response.status_code,
            'data': response.data,
        }
        return response

    def retrieve(self, request, *args, **kwargs):
        response = super(LayUIModelViewSet, self).retrieve(request, *args, **kwargs)
        response.data = {
            'code': response.status_code,
            'msg': response.status_code,
            'data': response.data,
        }
        return response

    def update(self, request, *args, **kwargs):
        response = super(LayUIModelViewSet, self).update(request, *args, **kwargs)
        response.data = {
            'code': response.status_code,
            'msg': response.status_code,
            'data': response.data,
        }
        return response

    def destroy(self, request, *args, **kwargs):
        response = super(LayUIModelViewSet, self).destroy(request, *args, **kwargs)
        response.data = {
            'code': response.status_code,
            'msg': response.status_text,
            'data': response.data,
        }
        response.status_code = status.HTTP_200_OK
        return response

    def list(self, request, *args, **kwargs):
        response = super(LayUIModelViewSet, self).list(request, *args, **kwargs)
        response.data = {
            'code': response.status_code,
            'msg': response.status_text,
            'data': response.data['results'],
            'count': response.data['count']
        }
        return response


class LayUIBoardViewSet(mixins.CreateModelMixin,
                        mixins.ListModelMixin,
                        GenericViewSet):
    def create(self, request, *args, **kwargs):
        response = super(LayUIBoardViewSet, self).create(request, *args, **kwargs)
        response.data = {
            'code': response.status_code,
            'msg': response.status_code,
            'data': response.data,
        }
        return response

    def list(self, request, *args, **kwargs):
        response = super(LayUIBoardViewSet, self).list(request, *args, **kwargs)
        response.data = {
            'code': response.status_code,
            'msg': response.status_text,
            'data': response.data['results'],
            'count': response.data['count']
        }
        return response
