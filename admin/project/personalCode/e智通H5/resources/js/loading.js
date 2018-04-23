/**
 * Created by chensi on 2018/4/19.
 */
//function loadHtml(){
//    var loadHtml = '';
//    loadHtml +='<div class="loadAnimate">'
//    + '<div id="loading3">';
//    for(var i=0;i<8;i++){
//        loadHtml +='<div class="demo3"></div>';
//    }
//    loadHtml +='</div>'
//    +'<p>加载中···</p>'
//    +'</div>';
//    $("body").append(loadHtml);
//}

var loadHtml=setTimeout(function(){
    var loadHtml = '';
    loadHtml +='<div class="loadAnimate">'
    + '<div id="loading3">';
    for(var i=0;i<8;i++){
        loadHtml +='<div class="demo3"></div>';
    }
    loadHtml +='</div>'
    +'<p>加载中···</p>'
    +'</div>';
    $("body").append(loadHtml);
},2000);
//loadHtml();

