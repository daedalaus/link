#!/usr/bin/env python
# -*- encoding: utf-8 -*-
"""
=======================================================
__author__: lwx913294
__date__: 2020/4/3 20:55
=======================================================
"""
from rest_framework import serializers

from veneers.models import PCBStatus, PCBLayer, Veneer


class PCBStatusSerializer(serializers.ModelSerializer):
    """单板状态序列化器"""
    class Meta:
        model = PCBStatus
        fields = '__all__'


class PCBLayerSerializer(serializers.ModelSerializer):
    """单板层阶序列化器"""
    class Meta:
        model = PCBLayer
        fields = '__all__'


class BoardDataSerializer(serializers.ModelSerializer):
    """单板数据序列化器"""
    class Meta:
        model = Veneer
        fields = (
            'schedule', 'group', 'project', 'pcb_id', 'pcb_name', 'pcb_scale', 'pcb_layer',
            'pcb_status', 'pcb_number', 'pcb_procedure', 'pcb_model', 'pcb_type', 'chip_type',
            'chip_model', 'baseline', 'sim_req', 'expect_end_date', 'hardware_member', 'software_member',
            'act_end_date', 'created_time', 'description',
        )
        read_only_fields = (
            'schedule', 'pcb_layer', 'pcb_status', 'pcb_procedure', 'pcb_model', 'hardware_member',
            'software_member', 'act_end_date',
        )
        depth = 1


class LinkDataSerializer(serializers.ModelSerializer):
    """互连数据序列化器"""
    class Meta:
        model = Veneer
        fields = '__all__'
        read_only_fields = (
            'pcb_id', 'pcb_name', 'pcb_scale', 'pcb_type', 'pcb_model', 'pcb_procedure',
            'pcb_number', 'chip_type', 'chip_model', 'project', 'group', 'schedule',
            'baseline', 'description', 'sim_req', 'expect_end_date', 'hardware_member',
            'software_member', 'imp_kind',
        )
        depth = 1

        extra_kwargs = {
            'schedule': {'max_value': 100},
            'total_pins': {'min_value': 1},
            'incr_pins': {'min_value': 0},
            'modify_pins': {'min_value': 0},
            'decr_pins': {'min_value': 0},
            'uncon_pins': {'min_value': 0},
            'total_nets': {'min_value': 0},
            'uncon_nets': {'min_value': 0},
        }
