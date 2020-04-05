#!/usr/bin/env python
# -*- encoding: utf-8 -*-
"""
=======================================================
__author__: lwx913294
__date__: 2020/4/3 23:10
=======================================================
"""
from rest_framework.routers import DefaultRouter

from .views import PCBStatusViewSet, PCBLayerViewSet, BoardDataViewSet, LinkDataViewSet

urlpatterns = []

router = DefaultRouter()
router.register(r'status', PCBStatusViewSet, 'status')
router.register(r'layers', PCBLayerViewSet, 'layers')
router.register(r'boards', BoardDataViewSet, 'boards')
router.register(r'links', LinkDataViewSet, 'links')

urlpatterns += router.urls
