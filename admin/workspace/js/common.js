var myTime = setTimeout("Timeout()", 6000);
function resetTime() {
    clearTimeout(myTime);
    myTime = setTimeout('Timeout()', 6000);
}
function Timeout() {
    alert("您的登录已超时, 请点确定后重新登录!");
    document.location.href='index7.html';
}
document.documentElement.onkeydown=resetTime;
document.documentElement.onclick=resetTime;