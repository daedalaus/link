#!/usr/bin/env python
# -*- encoding: utf-8 -*-
"""
=======================================================
__author__: lwx913294
__date__: 2020/4/5 1:05
=======================================================
"""

from rest_framework.pagination import PageNumberPagination


class LayUIPageNumberPagination(PageNumberPagination):
    page_size = 10
    max_page_size = 100
    page_size_query_param = 'limit'
