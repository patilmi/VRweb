
function init() {

var getslide = $('.main-box li').length - 1;

var slidecal = 30/getslide+'%';

// $('.main-box').css({"width": '70vw', "height": '40vh'});


$('.box').css({"width": slidecal});

$('.box').click(function(){
    $(this).siblings().removeClass('active');
   $(this).addClass('active');
});

};

