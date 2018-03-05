/**
 * Created by admin on 2017/12/26.
 */
//    实例1

//var fs = require("fs");
//
//fs.readFile('../input.txt', function (err, data) {
//    if (err) return console.error(err);
//    console.log(data.toString());
//});
//
//console.log("程序执行结束!");

//实例2  Node.js 事件循环

//// 引入 events 模块
//var events = require('events');
//// 创建 eventEmitter 对象
//var eventEmitter = new events.EventEmitter();
//
//// 创建事件处理程序
//var connectHandler = function connected() {
//    console.log('连接成功。');
//
//    // 触发 data_received 事件
//    eventEmitter.emit('data_received');
//};
//
//// 绑定 connection 事件处理程序
//eventEmitter.on('connection', connectHandler);
//
//// 使用匿名函数绑定 data_received 事件
//eventEmitter.on('data_received', function(){
//    console.log('数据接收成功。');
//});
//
//// 触发 connection 事件
//eventEmitter.emit('connection');
//
//console.log("程序执行完毕。");
//
////
//var fs = require("fs");
//
//fs.readFile('input.txt', function (err, data) {
//    if (err){
//        console.log(err.stack);
//        return;
//    }
//    console.log(data.toString());
//});
//console.log("程序执行完毕");

//实例3
//var fs = require("fs");
//
//fs.readFile('../input.txt', function (err, data) {
//    if (err){
//        console.log(err.stack);
//        return;
//    }
//    console.log(data.toString());
//});
//console.log("程序执行完毕");


//通过 connection（连接）事件演示了 EventEmitter 类的应用
var events = require('events');
var eventEmitter = new events.EventEmitter();

// 监听器 #1
var listener1 = function listener1() {
    console.log('监听器 listener1 执行。');
};

// 监听器 #2
var listener2 = function listener2() {
    console.log('监听器 listener2 执行。');
};

// 绑定 connection 事件，处理函数为 listener1
eventEmitter.addListener('connection', listener1);

// 绑定 connection 事件，处理函数为 listener2
eventEmitter.on('connection', listener2);

var eventListeners = require('events').EventEmitter.listenerCount(eventEmitter,'connection');
console.log(eventListeners + " 个监听器监听连接事件。");

// 处理 connection 事件
eventEmitter.emit('connection');

// 移除监绑定的 listener1 函数
eventEmitter.removeListener('connection', listener1);
console.log("listener1 不再受监听。");

// 触发连接事件
eventEmitter.emit('connection');

eventListeners = require('events').EventEmitter.listenerCount(eventEmitter,'connection');
console.log(eventListeners + " 个监听器监听连接事件。");

console.log("程序执行完毕。");