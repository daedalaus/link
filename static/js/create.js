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

    form.verify({
        pcb_code: [/^0301[0-9][a-z]{3}$/, '投板编码格式应为0301+一位数字+三个小写字母'],
        pcb_name: [/^Hi.*/, '单板名称应以Hi开头'],
        description: [/(\s*[^\s]+\s*){20,}/, '用途说明应不少于20字'],
    });

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

    // 更改表单提交方式
    form.on('submit(submit_filter)', function(data) {
        $.ajax({
            url: '/demands',
            type: 'post',
            data: JSON.stringify(data.field),
            contentType: 'application/json',
            success: function(res) {
                if (res.code == 0) {
                    layer.msg("提交成功");
                }
            }
        });
        return false;
    })

});