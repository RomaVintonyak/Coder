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
    /*back to top scroll btn*/
    var topBtn = $("#backTop");
    topBtn.fadeOut(500);
    var introScreen = $("#intro");
    var firstScreenHeight = introScreen.height();
    $(window).on("scroll", function(){
      if($(this).scrollTop() > firstScreenHeight){
        topBtn.fadeIn(500);
        topBtn.css({
          "bottom": 0
        });
      }else{
        topBtn.fadeOut(500);
        topBtn.css({
          "bottom": -4 + "rem"
        });
      }
    });
    topBtn.on("click", function(){
      $("html, body").animate({
        scrollTop : 0
      }, 1000);
    });
    /*relax script setings*/
    var rellax = new Rellax('.rellax', {

    });
    /*mail validation script*/
    var sendButton = $("#formButton");
    var errorMessage = $("#errorMessage");
    sendButton.on("click", function(){
      var name = $("#formName").val().trim();
      var lastName = $("#formLastName").val().trim();
      var mail = $("#formEmail").val().trim(),
          emailReg = /^[a-z0-9_-]+@[a-z0-9-]+\.([a-z]{1,6}\.)?[a-z]{2,6}$/i;
      var phone = $("#formPhone").val().trim(),
          intRegex =  /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
      var message = $("#formMessage").val().trim();
      if (name.length < 4){
        //var errorNameText = $("#errorName").text();
        errorMessage.text("Enter your name");
        return false;
      }else if(lastName.length < 4){
        //var errorLastText = $("#errorLast").text();
        errorMessage.text("Enter your last name");
        return false;
      }else if(mail == "" || !emailReg.test(mail)){
        //var errorMailText = $("#errorMail").text();
        errorMessage.text("Enter your email");
        return false;
      }else if(phone.length < 6 || !intRegex.test(phone)){
        //var errorPhoneText = $("#errorPhone").text();
        errorMessage.text("Enter your phone number");
        return false;
      }else if(message.length < 10 ){
        //var errorMessageText = $("#errorMessage").text();
        errorMessage.text("Enter your message");
        return false;
      }
      errorMessage.text("");
      $.ajax({
        url: '../php/mail.php',
        type: 'POST',
        cache: false,
        data: {'name': name, 'lastName': lastName, 'phone': phone, 'mail': mail, 'message': message},
        dataType: 'html',
        beforeSend: function(){
          sendButton.prop("disabled", true);
        },
        success: function(data){
          if(!data)
            alert("Something is wrong, try again");
          else
          $(".contact__form").trigger("reset");
          alert(data);
          sendButton.prop("disabled", false);
        }
      });
    });
});