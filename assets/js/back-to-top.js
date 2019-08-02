$(document).ready(function(){
    // move down 20px, show the back to top button, second window=this
    $(window).scroll(function(){
        if ($(window).scrollTop() > 20) {
            $('#btn-top').fadeIn(500);
        } else {
            $('#btn-top').fadeOut(500);
        }
    });
    $('#btn-top').click(function(){
        $('html, body').animate({scrollTop : 0}, 800);
                return false;
                });
});
