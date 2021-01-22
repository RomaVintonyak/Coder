jQuery(document).ready(function(){
  "use script";
  /*smoth scroll to section*/
  var navLinks = $(".nav__link");
  navLinks.on("click", function(event){
    event.preventDefault();
    var linkId = $(this).attr("href");
    var scrollPos = $(linkId).offset().top;
    $("html, body").animate({
      scrollTop: scrollPos
    }, 800);
  });
  /*menuScroll add class*/
  $("#menuScroll").singlePageNav({
    offset: 0,
	  currentClass: 'nav__link--active',
    currentThreshold: 0,
    duration: 1000,
    effect: 'swing',
  });
});