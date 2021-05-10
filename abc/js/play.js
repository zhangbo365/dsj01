var stop = true;//按钮是否可以点击
var colWidth ;//设置柱子宽度
var i=0;//当前关卡
function moveMan(){
        var stickW = $(".stick").width();//获取倒下棍子的长度
        setTimeout(function(){
            $(".man").find("img").attr("src","images/stick.gif");
            $(".man").find("img").animate({"left":stickW+"px"},1000,function(){
                //判断人物是否落下
                var wellL = $(".well").eq(i+1).offset().left;//柱子距离屏幕左侧的距离
                // var well0 = $(".well").eq(i).offset().left;//柱子距离屏幕左侧的距离
                colWidth= $(".well").eq(i).width();
                // console.log("wellL:"+wellL+" - well0:"+well0+" - colWidth:"+colWidth);
                // var range = wellL-well0-colWidth;//获取两个柱子之间的距离
                var range = wellL-colWidth;//获取两个柱子之间的距离
                // console.log("range:"+range+" - stickW:"+stickW);
                if( (stickW < range) || (stickW > wellL)){
                    $(".man").animate({"bottom":"0px"});
                }else{
                    //如果成功
                    $(".man").find("img").attr("src","images/stick_stand.png").css({"left":0}).hide();//人物变为初始
                    $(".stick").removeClass("stickDown").width(0);//棍子变为初始
                    // var oldL = $(".well-box").offset().left;
                    $(".well-box").animate({"left":-wellL},500,function(){
                        $(".man").find("img").show();
                        stop = true;//按钮可以点击
                        i++;//关卡加1
                    });//柱子移动
                }
            });
        },600);
    }


$(function(){
    //鼠标按下棍子变长
    $(".btnClick").mousedown(function(){
        if(stop){
            $(".stick").animate({"width":"500px"},2500);//棍子变长
        }
    });
    //鼠标弹起
    $(".btnClick").mouseup(function(){
        if(stop){
            $(".stick").stop();//棍子停止变长
            stop = false;
            $(".stick").addClass("stickDown");//棍子倒下
            moveMan();
        }
    });
})

