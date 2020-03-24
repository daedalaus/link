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

layui.use(['form', 'laydate'], function(){
    var form = layui.form,
    laydate = layui.laydate;

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

});