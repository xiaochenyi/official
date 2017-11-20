/**
 * Created by Administrator on 17-11-17.
 */
var loading = document.querySelector(".loading");
var loadingProcess = loading.getElementsByTagName("p")[0];
var swiperWrapper = document.querySelector(".swiper-wrapper");
var swiperSlide = document.querySelectorAll(".swiper-slide");

var picArr = [
    "../img/loading.gif","../img/small/logo.png","../img/small/bg1.png","../img/bg11.png","../img/bg12.png","../img/bg13.png"
    ,"../img/small/bg2.png","../img/page2-cont.png","../img/btn-down-ios.png","../img/btn-down-andr.png"
    ,"../img/bg3.png"
    ,"../img/small/bg4-1.png","../img/icon1.png","../img/icon2.png","../img/icon3.png","../img/icon1-active.png","../img/icon2-active.png","../img/icon3-active.png"
    ,"../img/small/bg4-2.png"
    ,"../img/small/bg4-3.png"
    ,"../img/small/bg5.png","../img/small/cont5.png"
    ,"../img/map.png","../img/contact.png"
];

var img =  new Image();
var sum = picArr.length;
var now = 0;

loadImg();
function loadImg(){
    img.src = picArr[now];

    function go () {
        now ++ ;
//		console.log(now);
        loadingProcess.innerHTML = parseInt( now/sum *100 ) + "%";
        if(now < picArr.length){
            loadImg()
        }else{
//			console.log("全部加载完成");
            loading.style.display = "none";
            swiperWrapper.style.opacity = "1";

            
            $(".top-menu").on("click", function() {
                var el = $(this);
                if(el.hasClass("cross")) {
                    el.removeClass("cross");
                    $(".menu-list").fadeOut(500);
                } else {
                    el.addClass("cross");
                    $(".menu-list").fadeIn(500);
                }
            });

            action();
        }
    }
    img.onerror = go;
    img.onload = go;
}

function action() {
    document.getElementsByTagName("html")[0].style.background = "black";
    var mySwiper = new Swiper('.swiper-container', {
        direction : '',
        initialSlide : 0,
        speed:800,
//        followFinger : false,
//        touchRatio : 0.1,
//        resistanceRatio : 0,
        onSlideChangeStart:function(swiper){
            swiperSlide[swiper.previousIndex].style.zIndex = -9999;
            for (var i = 0; i < swiperSlide.length; i++) {
                swiperSlide[i].classList.add("swiper-no-swiping")
            }
            setTimeout(function(){
                for (var i = 0; i < swiperSlide.length; i++) {
                    if(i!=1){
                        swiperSlide[i].classList.remove("swiper-no-swiping")
                    }
                }
            },1000);

            if(swiper.activeIndex>swiper.previousIndex){
                swiperSlide[swiper.previousIndex].style.transform = "translateY("+ mySwiper.height +"px) scale(0.8)";
                swiperSlide[swiper.previousIndex].style.webkitFilter = "brightness(0.5)";
            }else{
                swiperSlide[swiper.previousIndex].style.transform = "translateY("+ -mySwiper.height +"px) scale(0.8)";
                swiperSlide[swiper.previousIndex].style.webkitFilter = "brightness(0.5)"
            }

            if(swiper.activeIndex === 0){
                first();
                li_on(0)
            }
            if(swiper.activeIndex === 1){
                second();
                li_on(1)
            }
            if(swiper.activeIndex === 2){
                li_on(2)
            }
            if(swiper.activeIndex === 3){
                li_on(3);
                // forth();
                var tabsSwiper = new Swiper('#tabs-container',{
                    direction: "horizontal",
                    speed:500,
                    wrapperClass : 'my-wrapper',
                    slideClass : 'my-slide',
                    touchMoveStopPropagation:false,
                    onSlideChangeStart: function(tabsSwiper){
                        console.log(123);
                        $(".tabs .active").removeClass('active');
                        $(".tabs a").eq(tabsSwiper.activeIndex).addClass('active');
                    }
                });
                $(".tabs a").on('click',function(e){
                    e.preventDefault();
                    $(".tabs .active").removeClass('active');
                    $(this).addClass('active');
                    tabsSwiper.slideTo( $(this).index());
                })
            }
            if(swiper.activeIndex === 4){
                li_on(4);
                fifth();
            }
            if(swiper.activeIndex === 5){
                li_on(5);
            }
            if(swiper.activeIndex === 6){
                li_on(6)
            }
        },
        onSlideChangeEnd: function(swiper){
//		swiperSlide[swiper.previousIndex].style.transform = "translateY(0px) translateZ(0px)";
            swiperSlide[swiper.previousIndex].style.transform = "translateY(0px) scale(1)";
            swiperSlide[swiper.previousIndex].style.zIndex = 0;
            swiperSlide[swiper.previousIndex].style.webkitFilter = "brightness(1)"
        },
        nextButton:'.next',
        noSwiping : true
    });

    $(".menu-list li").on('click',function(e){
        e.preventDefault()
        $(".menu-list .on").removeClass('on')
        $(this).addClass('on')
        mySwiper.slideTo( $(this).index());
        $(".top-menu").removeClass("cross");
        $(".menu-list").fadeOut(500);
    });


    function li_on(i) {
        $(".menu-list .on").removeClass('on')
        $(".menu-list li").eq(i).addClass('on')
    }


    //----------------------------------------------------------------------第一屏-------
    var html = document.documentElement;
    var width = html.getBoundingClientRect().width;
    var fs = width/16;
    tl1 = new TimelineMax();
    tl1_2 = new TimelineMax();
    tl1_3 = new TimelineMax();
    var onoff = true;
    first ();
    function first() {
        //第一屏动画
        if(onoff) {
            // 第一部分字掉下来
            tl1.staggerFrom(".bg11",3,{
                opacity:0,
                y:-12*fs,
                ease:Back,
                delay:0
            });
            tl1_2.staggerFrom(".bg12",3,{
                y:12*fs,
                ease:Elastic.easeOut,
                delay:0
            });
            tl1_3.staggerFrom(".bg13",3,{
                y:12*fs,
                ease:Elastic.easeOut,
                delay:0
            });

            onoff = false;
        }else{
            tl1.restart();
            tl1_2.restart();
            tl1_3.restart();
        }
    }

    //----------------------------------------------------------------------第二屏-------
    var tl2 = new TimelineMax();
    var onoff2 = true;
    function second () {
       if(onoff2){

           tl2.staggerFrom(".bg2",4,{
               opacity:0,
               ease:Elastic.easeOut,
               delay:0.5
           });
           onoff2 = false;
       }else{
           tl2.restart();
       }

       swiperSlide[1].classList.remove("swiper-no-swiping");
    }

    //----------------------------------------------------------------------第五屏-------
    var tl5 = new TimelineMax();
    var onoff5 = true;
    function fifth () {
        if(onoff5){

            tl5.staggerFrom(".bg5",3,{
                opacity:0,
                ease:Quint.easeOut,
                delay:0.5
            });
            onoff5 = false;
        }else{
            tl5.restart();
        }
    }


}




