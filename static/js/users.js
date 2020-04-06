var schedule_tpl = function(data) {
    var color = 'blue';
    if (data.xxx=='xxx') {
        color = 'xxx'
    }
    var pb_text = data.schedule ? data.schedule : 0;
    return '<div class="progress_bar">' + pb_text + '</div>'
}

var columns = [[
    {type: 'checkbox', fixed: 'left'},
    {type: 'numbers', title: '序号', width: 120},
    {field: 'user_id', title: '工号'},
    {field: 'username', title: '姓名'},
    {field: 'email', title: '邮箱'},
    {field: 'role', title: '角色'},
    {field: 'role_id', title: '角色ID', hide: true},
    {fixed: 'right', title: '操作', align: 'center', toolbar: '#link_toolbar', width: 150},
]]

var win_index;

var action;

layui.use(['table', 'form', 'layer'], function() {
    var table = layui.table,
    form = layui.form,
    layer = layui.layer;

    function get_all_roles() {
        // 获取所有角色
        $.ajax({
            url: '/all_roles/',
            contentType: 'application/json',
            async: false,
            success: function(res) {
                if (res.code == 200) {
                    var content_html = '<option value=""></option>';
                    for (var i=0; i<res.data.length; i++) {
                        content_html += '<option value="' + res.data[i].id +
                                        '">' + res.data[i].name + '</option>';
                    }
                    $('select[name="role_id"]').html(content_html);
                    form.render();
                } else {
                    layer.msg(res.msg, {anim: 6, skin: 'layui-layer-hui'});
                }
            },
            error: function(res) {
                var content = '保存失败，请确认原因<br>状态码：' + res.status +
                              '<br>提示信息：' + res.statusText;
                layer.msg(content, {anim: 6, skin: 'layui-layer-hui'});
                console.log(res);
            },
        });
    }

    table.render({
        elem: '#table_users',
        height: 'full-100',
        url: '/users/',
        page: true,
        cols: columns,
        response: {
            statusCode: 200,
        },
        done: function(res, curr, count) {
        }
    });

    // 弹窗
    $('#add_btn').click(function() {
        action = 'add';
        win_index = layer.open({
            type: 1,
            content: $('#add_window'),
            area: ['700px', '500px'],
            btn: ['保存', '取消'],
            closeBtn: 1,
            btnAlign: 'c',
            success: function(layero, index) {
                get_all_roles();
            },
            yes: function(index, layero) {
                $('#add_submit').click();
            },
            end: function(index, layero) {
                $('#add_submit+button').click();
            },
        });
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
            url: '/users/',
            where: condition,
            page: { curr: 1 }
        });
    }

    // 行事件监听
    table.on('tool(table_filter)', function(obj) {
        if (obj.event==='edit') {
            action = 'edit';
            layer.open({
                type: 1,
                content: $('#add_window'),
                area: ['700px', '500px'],
                btn: ['保存', '取消'],
                closeBtn: 1,
                btnAlign: 'c',
                yes: function(index, layero) {
                    $('#add_submit').click();
                },
                end: function(index, layero) {
                    $('#add_submit+button').click();
                },
                success: function(layero, index) {
                    get_all_roles();
                    form.val('add_form_filter', obj.data);
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
            url: '/users/' + obj.data.user_id + '/',
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

    // 自定义表单验证
    form.verify({
        pcb_code: [/^0301[0-9][a-zA-Z]{3}$/, '投板编码格式应为0301+一位数字+三个字母'],
        pcb_name: [/^Hi.*/, '单板名称应以Hi开头'],
        pcb_class: [/[一二三四五六七八九十]层[一二三四五六七八九十]阶/, '单板层阶应填几层几阶'],
        total_pins: [/[1-9][0-9]*/, '总PIN数应大于0'],
    });

    // 添加用户或编辑用户
    form.on('submit(add_filter)', function(data) {
        var url, method;
        if (action === 'add') {
            url = '/users/';
            method = 'post';
        } else if (actio === 'edit') {
            url = '/users/' + data.field.user_id + '/';
            method = 'put';
        }
        $.ajax({
            url: url,
            type: method,
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
