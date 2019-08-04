$(document).ready(function(){
 $(window).scroll(function(){
     locateTocList();
 });
  function locateTocList(){
    var headers = $(".post-content :header"); // headers in article
    var toc_headers = $("#post-toc").find("a"); // headers in toc
    var scroll_height = $(window).scrollTop(); // scroll position
    for (var i=0;i<headers.length;i++){
      var a_height = $(headers[i]).offset().top; // position of header
      if (a_height-20<scroll_height){ // 20px for offset
        toc_headers.removeClass("toc-list-highlight");
        $(toc_headers[i]).addClass("toc-list-highlight");
      }

    }
  }

});
