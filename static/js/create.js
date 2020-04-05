function hide_sel() {
    $('#vp_select').next().find('dl').css({'display': 'none'});
};
function show_sel() {
    var dl = $('#vp_select').next().find('dl').children();
    var j = 0;
    for (var i=0; i<dl.length; i++) {
        dl[i].classList.remove('layui-this')
    }
    $('#vp_select').next().find('dl').css({'display': 'block'});
};

layui.use(['form', 'laydate', 'layer'], function(){
    var form = layui.form,
    laydate = layui.laydate,
    layer = layui.layer;

    // 实现input和select联动
    form.on('select(vp_select)', function(data) {
        $('input[name="project"]').val(data.value);
        hide_sel();
        form.render();
    });
    window.search = function() {
        var value = $('input[name="project"]').val();
        form.render();
        show_sel();
        var dl = $('#vp_select').next().find('dl').children();
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
        elem: 'input[name="expect_design_date"]',
        min: 0,
    });
    laydate.render({
        elem: 'input[name="expect_end_date"]',
        min: 0,
    });
    laydate.render({
        elem: 'input[name="expect_board_date"]',
        min: 0,
    });

    // 自定义表单验证
    form.verify({
        pcb_code: [/^0301[0-9][a-zA-Z]{3}$/, '投板编码格式应为0301+一位数字+三个字母'],
        pcb_name: [/^Hi.*/, '单板名称应以Hi开头'],
        description: [/(\s*[^\s]+\s*){20,}/, '用途说明应不少于20字'],
    });

    // 复选项选“无”时其他项不可选，不选“无”时其他项自由组合
    form.on('checkbox(sim_filter)', function(data) {
        if (data.elem.checked) {
            $('input[name="sim_req"]').each(function() {
                if (this != data.elem) {
                    $(this).attr('disabled', true);
                    $(this).next().removeClass('layui-form-checked');
                    $(this).next().addClass('layui-checkbox-disbaled layui-disabled');
                }
            });
        } else {
            $('input[name="sim_req"]').each(function() {
                if (this != data.elem) {
                    $(this).attr('disabled', false);
                    $(this).prop('checked', false);  // 使用attr无效
                    $(this).next().removeClass('layui-checkbox-disbaled layui-disabled');
                }
            });
        }
    });

    // 投板编码和单板名称是否占用查询（唯一性）
    $(function() {
        // 单板名称是否要确保唯一性还待确认，先跳过
        //$('input[name="pcb_id"],input[name="pcb_name"]').blur(function() {
        $('input[name="pcb_id"],input[name="pcb_name"]').blur(function() {
            var reg = null;
            var tip_flag = 'pdb_id';
            if (this.name == 'pcb_id') {
                reg = /^0301[0-9][a-zA-Z]{3}$/;
            } else {
                reg = /^Hi.*/;
                tip_flag = 'pcb_name';
            }
            // 如果格式不符合没必要去后端查询
            if (!(reg.test(this.value))) {
                return;
            }
            $.ajax({
                // url: '/demands/' + this.name + '/' + this.value + '/count/',
                url: '/boards/' + this.value + '/count/',
                contentType: 'application/json',
                success: function(res) {
                    if (res.code != 200) {
                        layer.msg(res.msg, {anim: 6, skin: 'layui-layer-hui'});
                        return;
                    }
                    if (res.count != 0) {
                        if (tip_flag == 'pcb_id') {
                            layer.tips('投板编码已被占用', 'input[name="pcb_id"]', {tips: 1});
                        } else {
                            layer.tips('单板名称已被占用', 'input[name="pcb_name"]', {tips: 1});
                        }
                    }
                },
                error: function(res) {
                    var content = '查询失败，请确认原因<br>状态码：' + res.status +
                                  '<br>提示信息：' + res.statusText;
                    layer.msg(content, {anim: 6, skin: 'layui-layer-hui'});
                    console.log(res);
                },
            });
        });
    });

    // 更改表单提交方式
    form.on('submit(submit_filter)', function(data) {
        // 手动修正checkbox多选时form只能获取到最后一个值的问题
        var sim_req = '';
        $('input:checkbox[name="sim_req"]:checked').each(function() {
            sim_req += $(this).val() + ',';
        })
        data.field.sim_req = sim_req.slice(0, sim_req.length-1);
        $.ajax({
            url: '/boards/',
            type: 'post',
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
                var content = '创建失败，请确认原因<br>状态码：' + res.status +
                              '<br>提示信息：' + res.statusText;
                layer.msg(content, {anim: 6, skin: 'layui-layer-hui'});
                console.log(res);
            }
        });
        return false;
    });

});