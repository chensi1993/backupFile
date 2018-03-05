/**
 * Created by chensi on 2017/8/4.
 */
window.onload = function(){
	$('#myModal').modal('hide');
}
$(function(){
	
    showModal("弹框");

    var html = '';
    html += '<div class="manage_li background_one row" onclick="javascript:bankCheck();">'
        +       '<div class="manage_img col-xs-3">'
        +           '<img src="resources/img/zhaoshang@3x.png">'
        +       '</div>'
        +       '<div class="manage_detail col-xs-9">'
        +           '<h3>'+'招商银行'+'</h3>'
        +           '<p class="card_type">'+'借记卡'+'</p>'
        +           '<p class="card_number">'+'**** **** **** 9999'+'</p>'
        +       '</div>'
        +       '<img class="right_img" src="resources/img/yinlian@3x.png">'
        +   '</div>';
    $('.manage_list').append(html);

});
function bankCheck(){
    window.location.href = "bankCard_detail.html";
}
function Checked(){
    window.location.href = "bankCard_add.html";
}