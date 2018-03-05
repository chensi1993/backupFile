/**
 * Created by admin on 2017/12/25.
 */
var http = require('http');
var server = http.createServer();
server.on('request',function(req,res){
    res.writeHead(200,{'Content-Type':'text/plain'});
    res.end('Hello World\n');
});
server.listen('80');
console.log('Server running');
