$(function() {
var country_data = [];
function get_country(){
    $.ajax({
        url: '/CarlcareManager/swap/recycling-initial-price/country-select',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded',
        async: false,
        success: function(res) {
            var arr = res.rows;
            for (var i=0; i<arr.length; i++) {
                var obj = {};
                obj.text = arr[i];
                obj.value = arr[i];
                country_data.push(obj);
            }
        }

    });
}

get_country();

$('#checkedLevel').multipleSelect({
　　　　addTitle: true, //鼠标点悬停在下拉框时是否显示被选中的值
　　　　selectAll: false, //是否显示全部复选框，默认显示
　　　　name: "质控级别",
　　　　selectAllText: "选择全部", //选择全部的复选框的text值
　　　　allSelected: "全部", //全部选中后显示的值
　　　　//delimiter: ', ', //多个值直接的间隔符，默认是逗号
　　　　placeholder: "质控级别", //不选择时下拉框显示的内容
        data: country_data,
        minimumCountSelected: country_data.length+1,
　　});
var raw_country = 'china,egypt,nigeria,kenya'
var pro_country = raw_country.split(',')
for (var i=0; i<pro_country.length; i++) {
    pro_country[i] = pro_country[i].slice(0,1).toUpperCase() + pro_country[i].slice(1);
}
console.log(pro_country);

//$('#checkedLevel').multipleSelect('setSelects', pro_country);
$('#checkedLevel').multipleSelect('setSelects', []);

});