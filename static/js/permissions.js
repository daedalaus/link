var columns = [[
    {type: 'checkbox', fixed: 'left'},
    {type: 'numbers', title: '序号'},
    {field: 'id', title: 'ID'},
    {field: 'view', title: '所属分类'},
    {field: 'action', title: '动作'},
    {field: 'description', title: '描述'},
]]

var win_index;

layui.use(['table', 'form', 'layer'], function() {
    var table = layui.table,
    form = layui.form,
    layer = layui.layer;

    table.render({
        elem: '#table_permissions',
        height: 'full-100',
        url: '/permissions/',
        page: true,
        cols: columns,
        response: {
            statusCode: 200,
        },
    });

    // 弹窗
    $('#add_btn').click(function() {
        win_index = layer.open({
            type: 1,
            content: $('#add_window'),
            area: ['460px', '350px'],
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
        $.ajax({
            url: '/permissions/',
            type: 'post',
            async: false,
            data: JSON.stringify(data.field),
            contentType: 'application/json',
            success: function(res) {
                if (res.code == 201) {
                    layer.close(win_index);
                    table.reload('table_permissions', {
                        url: '/permissions/',
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