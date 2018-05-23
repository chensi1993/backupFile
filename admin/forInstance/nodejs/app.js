/**
 * Created by admin on 2018/5/23.
 */
var fs = require('fs');//文件
//写
//1.同步写
//第一个参数：地址，第二个参数：内容，第三个参数：文本格式
//var res = fs.writeFileSync('www/w1.txt','第一个文字','utf8');
//console.log(res);
//console.log("111");

//2.异步写
//第一个参数：地址，第二个参数：内容，第三个参数：文本格式，第四个参数：回调函数
//fs.writeFile('www/t1.txt','111111','utf8',function(err){
//    console.log(err);
//    if(err){
//        console.log("写入失败");
//        throw  err;
//    }
//    console.log("写入成功");
//});
//console.log("222");

//读
//3.同步读
var data = fs.readFileSync('www/w1.txt','utf8');
console.log(data);

//4.异步读
fs.readFile('www/t1.txt','utf8',function(err,data){
    console.log(err);
    console.log(data.toString());
    if(err){
        console.log("读错了");
        throw err;
    }
    console.log(data.toString());
});