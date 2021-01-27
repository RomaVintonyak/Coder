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
  /*hove efect to we do collum icon*/
  var ideaIcon = $("#ideaIcon"),
      conceptIcon = $("#conceptIcon"),
      designIcon = $("#designIcon"),
      developIcon = $("#developIcon");
  ideaIcon.hover(function(){
    conceptIcon.addClass("border__icon");
  });
  ideaIcon.mouseleave(function(){
    conceptIcon.removeClass("border__icon");
  });
  conceptIcon.hover(function(){
    designIcon.addClass("border__icon");
  });
  conceptIcon.mouseleave(function(){
    designIcon.removeClass("border__icon");
  });
  designIcon.hover(function(){
    developIcon.addClass("border__icon");
  });
  designIcon.mouseleave(function(){
    developIcon.removeClass("border__icon");
  });
  developIcon.hover(function(){
    ideaIcon.addClass("border__icon");
    conceptIcon.addClass("border__icon");
    designIcon.addClass("border__icon");
  });
  developIcon.mouseleave(function(){
    ideaIcon.removeClass("border__icon");
    conceptIcon.removeClass("border__icon");
    designIcon.removeClass("border__icon");
  });
    /*initialized slick slider to work block*/
    var workSlider = $("#workSlider");
    workSlider.slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: false,
      arrows: false,
      dots: true,
      swipe: false,
      touchMove: false,
      focusOnSelect: false,
      fade: false,
      responsive: [
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 3
          }
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 2
          }
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
            fade: true,
            swipe: true,
            touchMove: true
          }
        }]
    });
    /*lightbox seting*/
    lightbox.option({
      'resizeDuration': 500,
      'wrapAround': true,
      'fadeDuration': 1000,
      'fitImagesInViewport': false,
      'showImageNumberLabel': false,
      'disableScrolling': true
    });
});