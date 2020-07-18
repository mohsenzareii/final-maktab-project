$(document).ready(function(){
    $('.profile').mouseover(function(){
        
        $('.cover').css('opacity','0.5');
        $('.text-cover').css('opacity','1');
    });
    $('.profile').mouseleave(function(){
        $('.cover').css('opacity','0');
        $('.text-cover').css('opacity','0');
    });
});


