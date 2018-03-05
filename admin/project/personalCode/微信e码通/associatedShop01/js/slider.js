    //滑动关闭/开启收款通知
        var oBtn = document.getElementById('btn');
        var oW,oLeft;
        var oSlider=document.getElementById('slider');
        var oTrack=document.getElementById('track');
        var Bandword=document.getElementById('bandWord');
        var flag=1;

        oBtn.addEventListener('touchstart',function(e){
            if(flag==1){
                console.log(e);
                var touches = e.touches[0];
                oW = touches.clientX - oBtn.offsetLeft;
                oBtn.className="button";
                oTrack.className="track";
            }

        },false);

        oBtn.addEventListener("touchmove", function(e) {
            if(flag==1){
                var touches = e.touches[0];
                oLeft = touches.clientX - oW;
                if(oLeft < 0) {
                    oLeft = 0;
                //}else if(oLeft > document.documentElement.clientWidth - oBtn.offsetWidth-110) {
                //    oLeft = (document.documentElement.clientWidth - oBtn.offsetWidth-110);
                }else if(oLeft > document.documentElement.clientWidth - oBtn.offsetWidth-70) {
                    oLeft = (document.documentElement.clientWidth - oBtn.offsetWidth-70);
                }
                oBtn.style.left = oLeft + "px";

                oTrack.style.width=(oLeft + oBtn.offsetWidth) +'px';
            }

        },false);

        oBtn.addEventListener("touchend",function() {
            if(oLeft>=(oSlider.clientWidth-oBtn.clientWidth)){
                //oBtn.style.left = (document.documentElement.clientWidth - oBtn.offsetWidth-110);
                //oTrack.style.width= (document.documentElement.clientWidth - oBtn.offsetWidth-110);
                oBtn.style.left = (document.documentElement.clientWidth - oBtn.offsetWidth-70);
                oTrack.style.width= (document.documentElement.clientWidth - oBtn.offsetWidth-70);
                Bandword.style.display='none';
                //flag=0;
            }else{
                oBtn.style.left = 0;
                oTrack.style.width= 0;
                Bandword.style.display='block';
            }
            oBtn.className="button-on";
            oTrack.className="track-on";
        },false);








 
    
