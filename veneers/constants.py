choices_hardness = ((0, '硬板'), (1, '软板'))

choices_procedure = (
    (0, 'PDM'), (1, 'TPDM'),
)
choices_group = (
    (0, 'HW1'), (1, 'HW2'), (2, 'HW3'), (3, 'HW7'), (4, 'HW8'), (5, 'RF1'),
    (6, 'RF2'), (7, 'RF3'), (8, 'RF7'), (9, 'HWP1'), (10, 'HWP2'), (11, 'HWP3'),
    (12, 'HWP5'), (13, 'HWP6'), (14, 'HWP7'), (15, 'SEG'), (16, '固态存储'), (17, '其他'),
)

choices_chip_type = (
    (0, 'SOC'), (1, '主机PMU'), (2, '副PMU'), (3, 'Codec'), (4, 'Scharger'),
    (5, 'RF前端'), (6, '配套单板'), (7, '工具配套'), (8, 'SIP'), (9, '全场景模块'),
    (10, 'Testchip'), (11, '安全芯片'), (12, '其他'),
)

choices_pcb_status = (
    (0, '设计'), (1, '加工'), (2, '已完成'), (3, 'hold'), (4, '暂不开发'),
)

choices_pcb_type = (
    (0, '新增开发单板'), (1, '版本修改单板'),
)

choices_pcb_model = (
    (0, 'UDP/SLT测试单板'), (1, 'PISI专项测试板'), (2, 'EMI专项测试板'), (3, 'UT测试单板'),
    (4, 'ST测试单板'), (5, '可靠性验证单板'), (6, '专有测试单板'), (7, '配套单板'),
    (8, '工具单板'), (9, 'pinmap评估板'), (10, '热测试单板'), (11, '其他'),
)

choices_qa = (
    (0, '顾蝶花'), (1, '杨荣荣'), (2, '王浩'), (3, '张超'), (4, '康乐'),
    (5, '周余兵'), (6, '李哲明'),
)

choices_craft = (
    (0, '王俊涛'), (1, '无线工艺'),
)

choices_modify_stage = (
    (0, '布局'), (1, '布线'),
)

choices_op = (
    (0, '待替换0'), (1, '待替换1'),
)
