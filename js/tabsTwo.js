
function init() {

var getslide = $('.main-box li').length - 1;

var slidecal = 30/getslide+'%';


$('.box').css({"width": slidecal});

$('.box').click(function(){
    $(this).siblings().removeClass('active');
   $(this).addClass('active');
});

};

