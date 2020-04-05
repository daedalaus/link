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
    {field: 'hardware_member', title: '硬件设计人员', width: 120},
    {field: 'software_member', title: '互连设计人员', width: 120},
    {field: 'qa', title: 'QA人员', width: 120},
    {field: 'craft', title: '工艺人员', width: 120},
    {field: 'pcb_process', title: '投板流程', width: 120},
    {field: 'pcb_scale', title: '硬件规模', width: 120},
    {field: 'pcb_class', title: '单板层阶', width: 120},
    {field: 'act_start_date', title: 'PCB设计启动时间', width: 120},
    {field: 'act_end_date', title: 'PCB设计结束时间', width: 120},
    {field: 'act_mach_date', title: 'PCB加工时间', width: 120},
    {field: 'total_pins', title: '总PIN数', width: 120},
    {field: 'incr_pins', title: '增加PIN数', width: 120},
    {field: 'decr_pins', title: '减少PIN数', width: 120},
    {field: 'modify_pins', title: '改变PIN数', width: 120},
    {field: 'uncon_pins', title: '未连接PIN数', width: 120},
    {field: 'total_nets', title: '总NET数', width: 120},
    {field: 'uncon_nets', title: '未连接NET数', width: 120},
    {field: 'chg_pins', title: '变更PIN数', width: 120},
    {field: 'chg_per', title: '变更百分比', width: 120},

    {field: 'project', title: '版本/技术项目', width: 120, hide: true},
    {field: 'pcb_status', title: '单板状态', width: 120, hide: true},
    {field: 'sim_req', title: '仿真需求', width: 120, hide: true},
    {field: 'modify_count', title: '原理图修改次数', width: 120, hide: true},
    {field: 'modify_stage', title: '原理图变更阶段', width: 120, hide: true},
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
    {fixed: 'right', title: '操作', align: 'center', toolbar: '#link_toolbar', width: 150},
]]

layui.use(['element', 'laydate', 'table', 'form', 'upload', 'layer'], function() {
    var element = layui.element,
    laydate = layui.laydate,
    table = layui.table,
    form = layui.form,
    upload = layui.upload,
    layer = layui.layer;

    table.render({
        elem: '#table_demands',
        height: 'full-180',
        url: '/links/',
        page: true,
        cols: columns,
        toolbar: '#toolbar_left',
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
                    return;
                }
                if (form_data.s_value === '') {
                    layer.tips('请输入搜索条件', 'input[name="s_value"]', {tips:1});
                    return;
                }
                gl_condition = form_data;
                search_demands({[form_data.s_field]: form_data.s_value});
                break;
        }
    });

    // 表格重载
    var search_demands = function(condition) {
        table.reload('table_demands', {
            url: '/links/',
            where: condition,
            page: { curr: 1 }
        });
    }

    // 行事件监听
    table.on('tool(table_demands)', function(obj) {
        if (obj.event==='edit') {
            layer.open({
                type: 1,
                content: $('#edit_window'),
                area: ['700px', '500px'],
                btn: ['保存', '取消'],
                closeBtn: 1,
                btnAlign: 'c',
                yes: function(index, layero) {
                    $('#edit_submit').click();
                },
                end: function(index, layero) {
                    $('#edit_submit+button').click();
                },
                success: function(layero, index) {
                    form.val('edit_form_filter', obj.data);
                }
            });
        } else if (obj.event==='del') {
            layer.confirm('真的删除此条记录吗？', function(index) {
                del_demands(obj);
                layer.close(index);
            });
        }
    });

    // 删除需求
    function del_demands(obj) {
        $.ajax({
            url: '/links/' + obj.data.pcb_id + '/',
            type: 'delete',
            contentType: 'application/json',
            success: function(res) {
                console.log(res);
                if (res.code == 204) {
                    obj.del();
                    layer.msg(res.msg);
                } else {
                    layer.msg(res.msg, {anim: 6, skin: 'layui-layer-hui'});
                }
            },
            error: function(res) {
                var content = '删除失败，请确认原因<br>状态码：' + res.status +
                              '<br>提示信息：' + res.statusText;
                layer.msg(content, {anim: 6, skin: 'layui-layer-hui'});
                console.log(res);
            },
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

    // 渲染日期input框
    laydate.render({
        elem: 'input[name="act_start_date"]',
        min: 0,
        trigger: 'click', // 解决弹出层使用laydate闪退bug
    });
    laydate.render({
        elem: 'input[name="act_end_date"]',
        min: 0,
        trigger: 'click',
    });
    laydate.render({
        elem: 'input[name="act_mach_date"]',
        min: 0,
        trigger: 'click',
    });

    // 自定义表单验证
    form.verify({
        pcb_code: [/^0301[0-9][a-zA-Z]{3}$/, '投板编码格式应为0301+一位数字+三个字母'],
        pcb_name: [/^Hi.*/, '单板名称应以Hi开头'],
        pcb_class: [/[一二三四五六七八九十]层[一二三四五六七八九十]阶/, '单板层阶应填几层几阶'],
        total_pins: [/[1-9][0-9]*/, '总PIN数应大于0'],
    });

    // 编辑互连数据提交事件
    form.on('submit(edit_filter)', function(data) {
        $.ajax({
            url: '/links/' + data.field.pcb_id + '/',
            type: 'put',
            data: JSON.stringify(data.field),
            contentType: 'application/json',
            success: function(res) {
                if (res.code == 201) {
                    layer.msg(res.msg);
                } else {
                    layer.msg(res.msg, {anim: 6, skin: 'layui-layer-hui'});
                }
            },
            error: function(res) {
                var content = '保存失败，请确认原因<br>状态码：' + res.status +
                              '<br>提示信息：' + res.statusText;
                layer.msg(content, {anim: 6, skin: 'layui-layer-hui'});
                console.log(res);
            }
        });
        return false;
    });
});