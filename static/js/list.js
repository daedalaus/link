var schedule_tpl = function(data) {
    var color = 'blue';
    if (data.xxx=='xxx') {
        color = 'xxx'
    }
    return '<div class="progress_bar">' + data.schedule + '</div>'
}

var columns = [[
    {type: 'checkbox'},
    {type: 'numbers', title: '序号'},
    {field: 'pcb_id', title: '投板编码'},
    {field: 'schedule', title: '进度', width: 180, templet: schedule_tpl},
    {field: 'project', title: '版本/技术项目'},
    {field: 'hardware_member', title: '硬件设计人员'},
    {field: 'software_member', title: '互连设计人员'},
    {field: 'pcb_status', title: '单板状态'},
    {field: 'sim_req', title: '仿真需求'},
    {field: 'modify_count', title: '原理图修改次数'},
    {field: 'modify_stage', title: '原理图变更阶段'},
    {field: 'act_start_date', title: 'PCB设计启动时间'},
    {field: 'act_end_date', title: 'PCB设计结束时间'},
    {field: 'act_board_date', title: 'PCB回板时间'},
    {field: 'act_mach_date', title: 'PCB加工时间'},

    {field: 'component', title: '组件'},
    {field: 'pcb_name', title: '单板名称'},
    {field: 'chip_type', title: '芯片类型'},
    {field: 'chip_model', title: '芯片型号'},
    {field: 'pcb_model', title: '单板形态'},
    {field: 'estimate_kpin', title: '硬件规模'},
    {field: 'pcb_type', title: '单板类型'},
    {field: 'baseline', title: '是否基线'},
    {field: 'description', title: '用途说明'},
    {field: 'expect_design_date', title: 'PCB期望设计时间'},
    {field: 'expecct_end_date', title: 'PCB期望结束时间'},
    {field: 'expect_board_date', title: 'PCB期望回报时间'},
    {field: 'pcb_number', title: '投板数量'},
    {field: 'cre_date', title: '日期自动'},

    {field: 'pcb_class', title: '单板阶层'},
    {field: 'pcb_sys', title: '投板系统'},
    {field: 'qa', title: 'QA人员'},
    {field: 'craft', title: '工艺人员'},
    {field: 'total_pins', title: '总PIN数'},
    {field: 'incr_pins', title: '增加PIN数'},
    {field: 'modify_pins', title: '改变PIN数'},
    {field: 'decr_pins', title: '减少PIN数'},
    {field: 'uncon_pins', title: '未连接PIN数'},
    {field: 'total_nets', title: '总NET数'},
    {field: 'uncon_nets', title: '未连接NET数'},
    {field: 'chg_pins', title: '变更PIN数'},
    {field: 'chg_per', title: '变更百分比'},
]]

// 设置全局变量，用于表格重载后保持当前筛选条件
var gl_condition = null;

layui.use(['element', 'table', 'form', 'layer', 'upload'], function() {
    var element = layui.element,
    table = layui.table,
    form = layui.form,
    layer = layui.layer,
    upload = layui.upload;

    table.render({
        elem: '#table_demands',
        height: 'full-180',
        url: '/demands?mode=a',
        page: true,
        cols: columns,
        toolbar: '#toolbar_left',
        defaultToolbar: ['filter', 'exports',
            {title: '下载模板', layEvent: 'LAYTABLE_TPL', icon: 'layui-icon-template-1'},
            {title: '导入', layEvent: 'LAYTABLE_IMPORT', icon: 'layui-icon-upload'},
        ],
        done: function(res, curr, count) {
            // 规避直接在table.render中渲染进度条出现的导出为空的bug
            var progress_els = $('.progress_bar');
            $.each(progress_els, function() {
                var percent = $(this).text();
                var content = '<div class="layui-progress layui-progress-big" lay-showPercent="yes">' +
                              '<div class="layui-progress-bar" lay-percent="' +
                              percent + '%"></div></div>';
                $(this).html(content);
            });

            // 保持当前筛选条件
            if (gl_condition) {
                form.val('search_filter', {
                    's_field': gl_condition.s_field,
                    's_value': gl_condition.s_value,
                })
            }
            element.init();
        }
    });

    // 左工具栏事件监听
    table.on('toolbar(table_demands)', function(obj) {
        switch(obj.event) {
            case 'search':
                var form_data = form.val('search_filter');
                if (form_data.s_field === '' ) {
                    layer.tips('请选择一个搜索项', 'select[name="s_field"]+div', {tips:1});
                    return
                }
                if (form_data.s_value === '') {
                    layer.tips('请输入搜索条件', 'input[name="s_value"]', {tips:1});
                    return
                }
                gl_condition = form_data;
                search_demands({[form_data.s_field]: form_data.s_value});
                break;
        }
    });

    // 表格重载
    var search_demands = function(condition) {
        table.reload('table_demands', {
            where: condition,
            page: { curr: 1 }
        });
    }

    // 上传
    upload.render({
        elem: 'div[lay-event="LAYTABLE_IMPORT"]',
        url: '/import/',
        accept: 'file',
        exts: 'csv|xls|xlsx',
        done: function(res) {
            layer.alert('上传成功', {skin: 'layui-layer-lan', closeBtn: 1, anim: 1, icon: 1})
        },
        error: function(res) {
            layer.alert('上传失败', {skin: 'layui-layer-lan', closeBtn: 1, anim: 6, icon: 2})
        }
    });

});