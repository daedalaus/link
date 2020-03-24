var schedule_tpl = function(data) {
    var color = 'blue';
    if (data.xxx=='xxx') {
        color = 'xxx'
    }
    // 为什么style不生效？
    return '<div class="layui-progress layui-progress-big" lay-showPercent="yes">' +
           '<div class="layui-progress-bar" style:"background-color:#3fdc49" lay-percent="' +
           data.schedule + '%"></div></div>'
}

columns = [[
    {type: 'checkbox', fixed: 'left'}, // 框架有bug，如果不设置fixed，行删除后checkbox会失效
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
    {fixed: 'right', title: '操作', align: 'center', toolbar: '#link_toolbar', width: 150},
]]

function hide_sel() {
    $('#cl_select').next().find('dl').css({'display': 'none'});
};
function show_sel() {
    var dl = $('#cl_select').next().find('dl').children();
    var j = 0;
    for (var i=0; i<dl.length; i++) {
        dl[i].classList.remove('layui-this')
    }
    $('#cl_select').next().find('dl').css({'display': 'block'});
};

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
        url: '/demands?mode=a',
        page: true,
        cols: columns,
        toolbar: '#toolbar_left', // 自定义toolbar备忘录 lay-event: 筛选列-LAYTABLE_COLS
                            // 导出-LAYTABLE_EXPORT 打印-LAYTABLE_PRINT
        defaultToolbar: ['filter', 'exports',
            {title: '下载模板', layEvent: 'LAYTABLE_TPL', icon: 'layui-icon-template-1'},
            {title: '导入', layEvent: 'LAYTABLE_IMPORT', icon: 'layui-icon-upload'},
        ],
        done: function(res, curr, count) {
            element.init();
        }
    });

    table.on('tool(table_demands)', function(obj) {
        if (obj.event==='edit') {

            layer.open({
                type: 1,
                content: $('#edit_window'),
                area: ['700px', '500px'],
                btn: ['保存', '取消'],
                yes: function(index, layero) {
                    alert('保存成功');
                },
                btnAlign: 'c',
            });
        } else if (obj.event==='del') {
            layer.confirm('真的删除此条记录吗？', function(index) {
                obj.del();
                layer.close(index);
            });
        }
    });

    // 实现input和select联动
    form.on('select(cl_select)', function(data) {
        $('input[name="pcb_class"]').val(data.value);
        hide_sel();
        form.render();
    });
    window.search = function() {
        var value = $('input[name="pcb_class"]').val();
        form.render();
        show_sel();
        var dl = $('#cl_select').next().find('dl').children();
        var j = 0;
        for (var i=0; i<dl.length; i++) {
            if (dl[i].innerHTML.indexOf(value)<=-1) {
                dl[i].style.display = 'none';
                j++;
            }
        }
        if (j==dl.length) {
            hide_sel();
        }
    }
    // 点击无关区域隐藏option选项
    document.onclick = hide_sel
    $('#hide_tool').click(
        function(e) {e.stopPropagation();}
    );

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
    // 左工具栏事件监听
    table.on('toolbar(table_demands)', function(obj) {
        switch(obj.event) {
            case 'search':
                layer.msg("查询");
                break;
            case 'more':
                layer.msg('更多条件');
                break;
        }
    });
});