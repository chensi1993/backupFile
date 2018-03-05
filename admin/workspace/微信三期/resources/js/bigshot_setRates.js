/**
 * Created by chensi on 2017/7/28.
 */
$(document).ready( function(){

//-------------------折扣弹框插件部分----start----------------
    var mindiscount = "55";

    var data1 = []; //折扣十分位
    var data2 = []; //折扣个分位
    var data3 = []; /* 折 */
    var minnum1 = parseInt(mindiscount.substring(0,1)); //十分位最小值
    var minnum2 = parseInt(mindiscount.substring(1,2)); //个分位最小值

    //data1 数据生成
    for (var i = minnum1; i <= 9; i++) {
        var param = {};
        param["text"] = i;
        data1.push(param);
    };
    console.log(data1);
    //data1 数据生成
    for (var i = 0; i <= 9; i++) {
        var param = {};
        param["text"] = i;
        data2.push(param);
    };
    console.log(data2);
    //“折”字生成2
    var param3 = {};
    param3["text"] = '折';
    data3.push(param3);

    var picker2El = document.getElementById('sel_discount');
    var picker2 = new Picker({
        data: [data1, data2,data3]
    });

    picker2.on('picker.select', function (selectedVal, selectedIndex) {
        //选择的个分位值小于最小值
        if(minnum2 > parseInt(data2[selectedIndex[1]].text)){
            picker2El.innerText = data1[selectedIndex[0]].text + '.' + minnum2;
        }else{
            picker2El.innerText = data1[selectedIndex[0]].text + '.' + data2[selectedIndex[1]].text;
        }
        console.log(selectedIndex);

        //选择完费率折扣，计算签约费率
        var benchRate = $.trim($('#bench_rate').html());
        benchRate = parseFloat(benchRate);//基准费率
        //alert(benchRate)
        var setRate =  $.trim(picker2El.innerText); //费率折扣
        //alert(setRate.replace(/[^0-9]/ig,""));//取纯数字
        setRate = Number(setRate/10);
        //alert(setRate)
        //var signRate = (benchRate *setRate).toFixed(1);//签约费率
        var signRate =  Math.floor((benchRate *setRate)*10)/10;//签约费率
        //判断如果是0.0折，签约费率 = 基准费率
        if(setRate == 0.0){
            $('#sign_rate').html(benchRate + '‰');
        }else{
            $('#sign_rate').html(signRate+ '‰');
        }

    });


    picker2El.addEventListener('click', function () {
        picker2.show();
    });
    //-------------------折扣弹框插件部分----end----------------
    //点击提交按钮
    $('#setRates_btn').find(' button').on('click',function(){
        //判断是否设置费率
        if(picker2El.innerText == '') {
            $('#onSetRate').css('display','block');
        }

    })
});