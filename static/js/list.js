var schedule_tpl = function(data) {
    var color = 'blue';
    if (data.xxx=='xxx') {
        color = 'xxx'
    }
    var pb_text = data.schedule ? data.schedule : 0;
    return '<div class="progress_bar">' + pb_text + '</div>'
}

var columns = [[
    {type: 'checkbox', fixed: 'left'}, // 框架有bug，如果不设置fixed，行删除后checkbox会失效
    {type: 'numbers', title: '序号', width: 120},
    {field: 'schedule', title: '进度', width: 180, templet: schedule_tpl, width: 120},
    {field: 'pcb_id', title: '投板编码', width: 120},
    {field: 'pcb_name', title: '单板名称', width: 120},
    {field: 'project', title: '版本/技术项目', width: 120},
    {field: 'hardware_member', title: '硬件设计人员', width: 120},
    {field: 'software_member', title: '互连设计人员', width: 120},
    {field: 'pcb_process', title: '投板流程', width: 120},
    {field: 'pcb_scale', title: '硬件规模', width: 120},
    {field: 'pcb_class', title: '单板层阶', width: 120},
    {field: 'act_end_date', title: 'PCB设计结束时间', width: 120},

    {field: 'pcb_status', title: '单板状态', width: 120, hide: true},
    {field: 'sim_req', title: '仿真需求', width: 120, hide: true},
    {field: 'group', title: '所属组', width: 120, hide: true},
    {field: 'chip_type', title: '芯片类型', width: 120, hide: true},
    {field: 'chip_model', title: '芯片型号', width: 120, hide: true},
    {field: 'pcb_model', title: '单板形态', width: 120, hide: true},
    {field: 'pcb_type', title: '单板类型', width: 120, hide: true},
    {field: 'baseline', title: '是否基线', width: 120, hide: true},
    {field: 'description', title: '用途说明', width: 120, hide: true},
    {field: 'expect_end_date', title: 'PCB期望结束时间', width: 120, hide: true},
    {field: 'pcb_number', title: '投板数量', width: 120, hide: true},
    {field: 'created_time', title: '创建时间', width: 120, hide: true},
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
        height: 'full-100',
        url: '/boards/',
        page: true,
        cols: columns,
        toolbar: true,
        defaultToolbar: ['filter', 'exports',
            {title: '下载模板', layEvent: 'LAYTABLE_TPL', icon: 'layui-icon-template-1'},
            {title: '导入', layEvent: 'LAYTABLE_IMPORT', icon: 'layui-icon-upload'},
        ],
        response: {
            statusCode: 200,
        },
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

    // 搜索功能
    form.on('submit(search_submit_filter)', function(data) {
        var form_data = form.val('search_form_filter');
        if (form_data.s_field === '' ) {
            layer.tips('请选择一个搜索项', 'select[name="s_field"]+div', {tips:1});
            return;
        }
        if (form_data.s_value === '') {
            layer.tips('请输入搜索条件', 'input[name="s_value"]', {tips:1});
            return;
        }
        gl_condition = form_data;
        search_demands({[form_data.s_field]: form_data.s_value});
        return false;
    });

    // 表格重载
    var search_demands = function(condition) {
        table.reload('table_demands', {
            url: '/boards/',
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
            if (res.code == 200) {
                layer.msg(res.msg);
            } else {
                layer.msg(res.msg, {anim: 6, skin: 'layui-layer-hui'});
            }
        },
        error: function(res) {
            var content = '上传失败，请确认原因<br>状态码：' + res.status +
                          '<br>提示信息：' + res.statusText;
            layer.msg(content, {anim: 6, skin: 'layui-layer-hui'});
            console.log(res);
        },
    });

});