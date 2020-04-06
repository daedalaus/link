var permission_tpl = function(data) {
    var content = '';
    for (var i=0; i<data.permissions.length; i++) {
        content += data.permissions[i] + ',  '
    }
    return content
}

var columns = [[
    {type: 'checkbox', fixed: 'left'},
    {type: 'numbers', title: '序号'},
    {field: 'name', title: '角色名'},
    {field: 'permissions', title: '拥有权限', templet: permission_tpl},
    {field: 'description', title: '描述'},
    {field: 'is_active', title: '状态'},
]]

var win_index;

var permission_list = new Array();

layui.use(['table', 'form', 'layer', 'transfer'], function() {
    var table = layui.table,
    form = layui.form,
    layer = layui.layer,
    transfer = layui.transfer;

    // 获取所有权限
    $.ajax({
        url: '/all_permissions/',
        contentType: 'application/json',
        success: function(res) {
            if (res.code == 200) {
                for (var i=0; i<res.data.length; i++) {
                    var obj = {
                        'value': res.data[i]['id'],
                        'title': res.data[i]['description'],
                        'disabled': '',
                        'checked': '',
                    }
                    permission_list.push(obj);
                }
                // 穿梭框渲染
                transfer.render({
                    elem: '#transfer',
                    id: 'permissions_transfer',
                    data: permission_list,
                    title: ['所有权限', '已有权限'],
                    showSearch: true,
                    width: 205,
                    height: 260,
                });
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


    // 角色表格渲染
    table.render({
        elem: '#table_roles',
        height: 'full-100',
        url: '/roles/',
        page: true,
        cols: columns,
        response: {
            statusCode: 200,
        },
    });

    // 行事件监听
    table.on('tool(table_filter)', function(obj) {
        if (obj.event === 'detail') {
            form.val('add_form_filter', obj.data);
            var edit_permission_list = permission_list.slice(0);
            var role_permissions = obj.data.permissions;
            for (var i=0; i<edit_permission_list.length; i++) {
                if (role_permissions.includes(edit_permission_list[i].id)) {
                    edit_permission_list[i].checked = true;
                }
            }
            transfer.render({
                elem: '#transfer',
                data: edit_permission_list,
            });
        } else if (obj.event === 'del') {

        }
    });
    // 弹窗
    $('#add_btn').click(function() {
        win_index = layer.open({
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
        });
    });

    // 表单提交
    form.on('submit(add_filter)', function(data) {
        var transfer_data = transfer.getData('permissions_transfer');
        var permissions = new Array();
        for (var i=0; i<transfer_data.length; i++) {
            permissions.push(transfer_data[i].value);
        }
        data.field.perms = permissions;
        $.ajax({
            url: '/roles/',
            type: 'post',
            async: false,
            data: JSON.stringify(data.field),
            contentType: 'application/json',
            success: function(res) {
                if (res.code == 201) {
                    layer.close(win_index);
                    table.reload('table_permissions', {
                        url: '/roles/',
                    });
                    layer.msg(res.msg);
                } else {
                    layer.msg(res.msg, {anim: 6, skin: 'layui-layer-hui'});
                }
            },
            error: function(res) {
                var content = '创建失败，请确认原因<br>状态码：' + res.status +
                              '<br>提示信息：' + res.statusText;
                layer.msg(content, {anim: 6, skin: 'layui-layer-hui'});
                console.log(res);
            }
        });
        return false;
    });
});