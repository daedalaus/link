from django.db import models

from .constants import *


class PCBLayer(models.Model):
    """单板层阶模型类"""

    hardness = models.CharField(max_length=20, verbose_name='软板/硬板')
    layer = models.CharField(max_length=20, verbose_name='层')
    order = models.CharField(max_length=20, verbose_name='阶')

    class Meta:
        db_table = 'pcb_layers'


class PCBStatus(models.Model):
    """单板状态模型类"""

    status = models.CharField(max_length=20, verbose_name='状态')


class Veneer(models.Model):
    """单板模型类"""

    pcb_id = models.CharField(max_length=30, primary_key=True, verbose_name='投板编码')
    pcb_name = models.CharField(max_length=30, verbose_name='单板名称')
    pcb_status = models.ForeignKey(PCBStatus, null=True, on_delete=models.PROTECT, verbose_name='单板状态')
    pcb_scale = models.IntegerField(default=0, verbose_name='单板规模')
    pcb_type = models.CharField(max_length=30, verbose_name='单板类型')
    pcb_model = models.CharField(max_length=30, verbose_name='单板形态')
    pcb_layer = models.ForeignKey(PCBLayer, null=True, on_delete=models.PROTECT, verbose_name='单板层阶')
    pcb_procedure = models.CharField(max_length=30, verbose_name='投板流程')
    pcb_number = models.IntegerField(default=0, verbose_name='投板数量')
    chip_type = models.CharField(max_length=30, verbose_name='芯片类型')
    chip_model = models.CharField(max_length=30, verbose_name='芯片型号')
    project = models.CharField(max_length=30, verbose_name='版本/技术项目')
    group = models.CharField(max_length=30, verbose_name='所属组')
    schedule = models.IntegerField(default=0, verbose_name='进度')
    baseline = models.BooleanField(default=False, verbose_name='是否基线')
    description = models.TextField(verbose_name='用途说明')
    sim_req = models.CharField(max_length=30, verbose_name='仿真需求')
    expect_end_date = models.DateField(verbose_name='期望设计结束时间')
    created_time = models.DateTimeField(auto_now_add=True, verbose_name='创建时间')
    hardware_member = models.CharField(max_length=100, verbose_name='硬件设计人员')
    software_member = models.CharField(max_length=100, verbose_name='互连设计人员')
    qa = models.CharField(max_length=30, verbose_name='QA人员')
    craft = models.CharField(max_length=30, verbose_name='工艺人员')
    act_start_date = models.DateField(null=True, verbose_name='PCB设计启动时间')
    act_end_date = models.DateField(null=True, verbose_name='PCB设计结束时间')
    act_mach_date = models.DateField(null=True, verbose_name='PCB加工时间')
    act_board_date = models.DateField(null=True, verbose_name='PCB回板时间')
    modify_stage = models.CharField(max_length=30, verbose_name='原理图变更阶段')
    total_pins = models.IntegerField(default=0, verbose_name='总PIN数')
    incr_pins = models.IntegerField(default=0, verbose_name='增加PIN数')
    modify_pins = models.IntegerField(default=0, verbose_name='改变PIN数')
    decr_pins = models.IntegerField(default=0, verbose_name='减少PIN数')
    uncon_pins = models.IntegerField(default=0, verbose_name='未连接PIN数')
    total_nets = models.IntegerField(default=0, verbose_name='总NET数')
    uncon_nets = models.IntegerField(default=0, verbose_name='未连接NET数')
    imp_kind = models.CharField(max_length=10, null=True, verbose_name='拼盘种类')

    class Meta:
        db_table = 'veneers'
        verbose_name = '单板'
        verbose_name_plural = verbose_name


class Operation(models.Model):
    """变更操作模型类"""

    pcb_id = models.ForeignKey(Veneer, on_delete=models.CASCADE, verbose_name='投板编码')
    op = models.IntegerField(choices=choices_op, verbose_name='变更操作')

    class Meta:
        db_table = 'operations'
        verbose_name = '变更操作'
        verbose_name_plural = verbose_name
