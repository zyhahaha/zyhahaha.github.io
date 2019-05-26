/**
 * Created by RedSpite on 2016/9/27.
 */


//背景随机
$(function() {
    var length = 3;
    $(".bg-img li:nth-child(2)").show();
    setInterval(function () {
        var randomBgIndex = Math.round(Math.random() * length);
        $("#section1 .bg-img li").eq(randomBgIndex).addClass("show").siblings().removeClass("show");
    },5000);
});

$(function() {
    //编辑器控制
    $("h4,.nav b").css("color","#fff");

    $(".fades").addClass("fadesin");
    $(" h1.fade").addClass("fadesin1");
    $(" h3.fade").addClass("fadesin2");
    $(" span.fade").addClass("fadesin3");

    var _top;
    var top1 = $("#section2").offset().top-30;
    var top2 = $("#section3").offset().top-30;
    var top3 = $("#section4").offset().top-30;
    var top4 = $("#section5").offset().top-30;
    var top5 = $("#section6").offset().top-30;
    var top6 = $("#section7").offset().top-30;
    var tops = [top1,top2,top3,top4,top5,top6];
    $(window).resize();

    //回到顶部
    $("#top").click(function () {
        $('html,body').stop().animate({
            scrollTop: 0
        }, 700);
    });
    showScroll();
    var min_height = document.documentElement.clientHeight /2;
    function showScroll() {
        $(window).scroll(function() {
            var s = $(window).scrollTop();
            s > min_height ? $('#top,#down').fadeIn() : $('#top,#down').fadeOut();
        });
    }
});
