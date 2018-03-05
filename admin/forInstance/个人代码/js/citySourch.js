/**
 * Created by chensi on 2017/11/23.
 */
var citydata ="";
var citySet = new Set();
//直接搜索
function btnSearch(){
    var cityKey=$("#J-select-city-form")[0].value.trim();
    //searchKey =encodeURI(searchKey);
    //if(cityKey != ""){
    //    location.href="../index.jsp?city="+cityKey;
    //}
    citydata=cityKey;
    if(citySet.has(citydata)){
        location.href="../index.jsp?city="+cityKey;
    }


    localStorage.setItem("city", citydata);
}
//点击enter键搜索
function citySearch(){
    var event = window.event || arguments.callee.caller.arguments[0];
    if(event.keyCode ==13)
    {
        btnSearch()
    }
}

function set(city){
    localStorage.setItem("city", city);
}
var params={
    "flag":"all"// hot:热门城市，other：其他城市，all：热门城市和其他城市
};
$.ajax({
    type : "POST",
    url : "json/city.json",
    contentType : "application/json; charset=utf-8",
    dataType : "json",
    data : JSON.stringify(params),
    success : function(data) {
        var hotCities=data.hotCities;
        //热门城市
        for (var i=0;i<hotCities.length;i++){
            $(".p-city-list").children(".hot-city").append("<a onclick='set(\""+hotCities[i]+"\")' href='../index.jsp?city="+hotCities[i]+"'>"+hotCities[i]+"</a>");
            /* localStorage.setItem("city", hotCities[i]);*/
            citydata=hotCities[i];
            //$(".p-city-list").children(".hot-city").append("<a href='../index.jsp'>"+hotCities[i]+"</a>");
            //document.cookie="city="+hotCities[i];
        }
        var cityInfos=data.cityInfos;
        //所有城市
        var cityStr="";
        $.each(cityInfos,function(i,json){
            var character=json.character;
            var cities=json.cities;
            cityStr+='<li class="city-list clearfix">'
            +'<span class="letter fl">'+character+'</span>'
            +'<ul class="cities fl cf">';
            for(var j=0;j<cities.length;j++){
                cityStr+="<li>"+"<a onclick='set(\""+cities[j]+"\")' href='../index.jsp?city="+cities[j]+"'>"+cities[j]+"</a>"+"</li>";
                citydata=cities[j];
                citySet.add(cities[j]);
                /* localStorage.setItem("city", cities[j]);*/
            }
            citySet.forEach(function (item) {
                //alert(item.toString());
            });
            cityStr+='</ul>'
            +'</li>'
        });
        $("#J-city-list").html(cityStr);
    }
});

var html="";
var city = localStorage.getItem("city");
if(city == null ){
    html+="<a href='../'>"+"<b>"+"北京"+"</b>"+"<span class='arrow'>"+">>>"+"</span>"+"</a>";
}else if(city != ""||city != null||city != undefined){
    html+="<a href='../'>"+"<b>"+city+"</b>"+"<span class='arrow'>"+">>>"+"</span>"+"</a>";
}

$(".enter-city").append(html);