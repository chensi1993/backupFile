    function sliderFun(){
        //滑动关闭/开启收款通知
        var oBtn = document.getElementById('btn');
        var oLabel = document.getElementById('label');
        var oW, oLeft;
        var oSlider = document.getElementById('slider');
        var oTrack = document.getElementById('track');
        var Bandword = document.getElementById('bandWord');
        //var flag = 1;//flag为1时可以滑动，flag为0时不能滑动

        oBtn.addEventListener('touchstart', function (e) {
            //var e = e || window.e;
            //if (flag == 1) {
            console.log(e);
            var touches = e.touches[0];//获取第一个触点
            oW = touches.clientX - oBtn.offsetLeft;//clientX触摸点相对于当前屏幕的X位置;offsetLeft当前元素的外边框距离父级参照物的左偏移量

            oBtn.className = "button";
            oTrack.className = "track";
            //}

        }, false);

        oBtn.addEventListener("touchmove", function (e) {
            event.preventDefault();//阻止触摸时浏览器的缩放、滚动条滚动
            //if (flag == 1) {
            var touches = e.touches[0];
            oLeft = touches.clientX - oW;//触摸点距离盒子左侧距离
            if (oLeft < 0) {
                oLeft = 0;
                //2017.6.26修改
            } else if (oLeft > oSlider.clientWidth - oBtn.offsetWidth) {
                oLeft = (oSlider.clientWidth - oBtn.offsetWidth);
            }
            oBtn.style.left = oLeft + "px";

            oTrack.style.width = (oLeft + oBtn.offsetWidth) + 'px';
            //}

        }, false);

        oBtn.addEventListener("touchend", function () {

            if (oLeft >= (oSlider.clientWidth - oBtn.clientWidth)) {
                //2017.6.26修改
                oBtn.style.left = oSlider.clientWidth - oBtn.offsetWidth;
                oTrack.style.width = oSlider.clientWidth;
                Bandword.style.display = 'none';
                //flag=0;
            } else {
                oBtn.style.left = 0;
                oTrack.style.width = 0;
                Bandword.style.display = 'block';
            }
            oBtn.className = "button-on";
            oTrack.className = "track-on";
        }, false);
    }
    sliderFun();





 
    
