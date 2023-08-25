/*preloader load*/
const loader = $(".loader");
$(window).on("load", function () {
  $("html, body").css({
    overflow: "hidden",
  });
  setTimeout(function () {
    loader.addClass("loader--done");
    if (loader.hasClass("loader--done")) {
      $("html, body").removeAttr("style");
    }
  }, 2000);
});
jQuery(document).ready(function () {
  "use script";
  /*smoth scroll to section*/
  var navLinks = $(".nav__link");
  navLinks.on("click", function (event) {
    event.preventDefault();
    var linkId = $(this).attr("href");
    var scrollPos = $(linkId).offset().top;
    $("html, body").animate(
      {
        scrollTop: scrollPos,
      },
      800
    );
    $("#sideBar").removeClass("main__sidebar--open");
  });
  /*menuScroll add class*/
  $("#menuScroll").singlePageNav({
    offset: 0,
    currentClass: "nav__link--active",
    currentThreshold: 0,
    duration: 1000,
    effect: "swing",
  });
  /*hove efect to we do collum icon*/
  var ideaIcon = $("#ideaIcon"),
    conceptIcon = $("#conceptIcon"),
    designIcon = $("#designIcon"),
    developIcon = $("#developIcon");
  ideaIcon.hover(function () {
    conceptIcon.addClass("border__icon");
  });
  ideaIcon.mouseleave(function () {
    conceptIcon.removeClass("border__icon");
  });
  conceptIcon.hover(function () {
    designIcon.addClass("border__icon");
  });
  conceptIcon.mouseleave(function () {
    designIcon.removeClass("border__icon");
  });
  designIcon.hover(function () {
    developIcon.addClass("border__icon");
  });
  designIcon.mouseleave(function () {
    developIcon.removeClass("border__icon");
  });
  developIcon.hover(function () {
    ideaIcon.addClass("border__icon");
    conceptIcon.addClass("border__icon");
    designIcon.addClass("border__icon");
  });
  developIcon.mouseleave(function () {
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
        breakpoint: 1366,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          dots: false,
          fade: true,
          swipe: true,
          touchMove: true,
        },
      },
    ],
  });
  /*lightbox seting*/
  lightbox.option({
    resizeDuration: 500,
    wrapAround: true,
    fadeDuration: 1000,
    fitImagesInViewport: true,
    showImageNumberLabel: false,
    disableScrolling: true,
  });
  /*back to top scroll btn*/
  var topBtn = $("#backTop");
  topBtn.fadeOut(500);
  var introScreen = $("#intro");
  var firstScreenHeight = introScreen.height();
  $(window).on("scroll", function () {
    if ($(this).scrollTop() > firstScreenHeight) {
      topBtn.fadeIn(500);
      topBtn.css({
        bottom: 0,
      });
    } else {
      topBtn.fadeOut(500);
      topBtn.css({
        bottom: -4 + "rem",
      });
    }
  });
  topBtn.on("click", function () {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      1000
    );
  });
  /*relax script setings*/
  var rellax = new Rellax(".rellax", {});
  /*mail validation script*/
  var sendButton = $("#formButton");
  var errorMessage = $("#errorMessage");
  sendButton.on("click", function () {
    var name = $("#formName").val().trim();
    var lastName = $("#formLastName").val().trim();
    var mail = $("#formEmail").val().trim(),
      emailReg = /^[a-z0-9_-]+@[a-z0-9-]+\.([a-z]{1,6}\.)?[a-z]{2,6}$/i;
    var phone = $("#formPhone").val().trim(),
      intRegex = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
    var message = $("#formMessage").val().trim();
    if (name.length < 4) {
      var errorNameText = $("#formName").attr("data-message");
      errorMessage.text(errorNameText);
      return false;
    } else if (lastName.length < 4) {
      var errorLastText = $("#formLastName").attr("data-message");
      errorMessage.text(errorLastText);
      return false;
    } else if (mail == "" || !emailReg.test(mail)) {
      var errorMailText = $("#formEmail").attr("data-message");
      errorMessage.text(errorMailText);
      return false;
    } else if (phone.length < 6 || !intRegex.test(phone)) {
      var errorPhoneText = $("#formPhone").attr("data-message");
      errorMessage.text(errorPhoneText);
      return false;
    } else if (message.length < 10) {
      var errorMessageText = $("#formMessage").attr("data-message");
      errorMessage.text(errorMessageText);
      return false;
    }
    errorMessage.text("");
    $.ajax({
      url: "../php/mail.php",
      type: "POST",
      cache: false,
      data: {
        name: name,
        lastName: lastName,
        phone: phone,
        mail: mail,
        message: message,
      },
      dataType: "html",
      beforeSend: function () {
        sendButton.prop("disabled", true);
      },
      success: function (data) {
        if (!data) alert("Something is wrong, try again");
        else $(".contact__form").trigger("reset");
        alert(data);
        sendButton.prop("disabled", false);
      },
    });
  });
  /*show modal script*/
  var openModalBtn = $("#askBtn");
  var closeModalBtn = $("#introModalClose");
  var modalWindow = $("#introModal");
  openModalBtn.on("click", function (event) {
    event.preventDefault();
    modalWindow.addClass("intro__modal--open");
    $("html, body").css({
      overflow: "hidden",
    });
  });
  closeModalBtn.on("click", function () {
    modalWindow.removeClass("intro__modal--open");
    $("html, body").removeAttr("style");
  });
  modalWindow.on("click", function () {
    $(this).removeClass("intro__modal--open");
    $("html, body").removeAttr("style");
  });
  $(".intro__modal--content").on("click", function (event) {
    event.stopPropagation();
  });
  /* modal form*/
  var modalsendButton = $("#modalIntroButton");
  var modalErrorMessage = $("#modalErrorMessage");
  modalsendButton.on("click", function () {
    /*contact information*/
    var mainName = $("#mainName").val().trim();
    var mainOrganisation = $("#mainOrganisation").val().trim();
    var mainMail = $("#mainMail").val().trim(),
        mainMaillReg = /^[a-z0-9_-]+@[a-z0-9-]+\.([a-z]{1,6}\.)?[a-z]{2,6}$/i;
    var mainPhone = $("#mainPhone").val().trim(),
        mainPhoneIntRegex = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
    /*company information*/
    var companyUrl = $("#companyUrl").val().trim();
    var companyServicess = $("#companyServicess").val().trim();
    var companyMission = $("#companyMission").val().trim();
    var companyAdvantages = $("#companyAdvantages").val().trim();
    /*target__information*/
    var targetTask = $("#targetTask").val().trim();
    var targetUseful = $("#targetUseful").val().trim();
    var targetAction = $("#targetAction").val().trim();
    /*type__information*/
    var modalIntroSelect = $("#modalIntroSelect option:selected").val().trim();
    /*design__information*/
    var designUrl = $("#designUrl").val().trim();
    var designColor = $("#designColor").val().trim();
    var designWishes = $("#designWishes").val().trim();
    /*radio__items*/
    
    var finishedDesign = $("#finishedDesign").is(':checked');
    var individualDesign = $("#individualDesign").is(':checked');
    
    console.log(finishedDesign);
    console.log(individualDesign);
    
    /*contact information varification*/
    if (mainName.length < 4) {
      var errorMainNameText = $("#mainName").attr("data-message");
      $("#mainName").css({
        "border-color": "#ee171f"
      });
      modalErrorMessage.text(errorMainNameText);
      return false;
    } else if (mainOrganisation.length < 4){
      $("#mainName").removeAttr("style");
      var errorMainOrganisationText = $("#mainOrganisation").attr("data-message");
      $("#mainOrganisation").css({
        "border-color": "#ee171f"
      });
      modalErrorMessage.text(errorMainOrganisationText);
      return false;
    }else if (mainMail == "" || !mainMaillReg.test(mainMail)){
      $("#mainOrganisation").removeAttr("style");
      var errorMainMailText = $("#mainMail").attr("data-message");
      $("#mainMail").css({
        "border-color": "#ee171f"
      });
      modalErrorMessage.text(errorMainMailText);
      return false;
    }else if (mainPhone.length < 6 || !mainPhoneIntRegex.test(mainPhone)){
      $("#mainMail").removeAttr("style");
      var errorMainPhoneText = $("#mainPhone").attr("data-message");
      $("#mainPhone").css({
        "border-color": "#ee171f"
      });
      modalErrorMessage.text(errorMainPhoneText);
      return false;
    }
    /*company information verification*/
    else if(companyUrl.length < 6){
      $("#mainPhone").removeAttr("style");
      var errorCompanyUrlText = $("#companyUrl").attr("data-message");
      $("#companyUrl").css({
        "border-color": "#ee171f"
      });
      modalErrorMessage.text(errorCompanyUrlText);
      return false;
    }else if(companyServicess.length < 15){
      $("#companyUrl").removeAttr("style");
      var errorCompanyServicessText = $("#companyServicess").attr("data-message");
      $("#companyServicess").css({
        "border-color": "#ee171f"
      });
      modalErrorMessage.text(errorCompanyServicessText);
      return false;
    }else if(companyMission.length < 8){
      $("#companyServicess").removeAttr("style");
      var errorCompanyMissionText = $("#companyMission").attr("data-message");
      $("#companyMission").css({
        "border-color": "#ee171f"
      });
      modalErrorMessage.text(errorCompanyMissionText);
      return false;
    }else if(companyAdvantages.length < 5){
      $("#companyMission").removeAttr("style");
      var errorCompanyAdvantagesText = $("#companyAdvantages").attr("data-message");
      $("#companyAdvantages").css({
        "border-color": "#ee171f"
      });
      modalErrorMessage.text(errorCompanyAdvantagesText);
      return false;
    }
    /*target information verification*/
    else if(targetTask.length < 10){
      $("#companyAdvantages").removeAttr("style");
      var errorTargetTaskText = $("#targetTask").attr("data-message");
      $("#targetTask").css({
        "border-color": "#ee171f"
      });
      modalErrorMessage.text(errorTargetTaskText);
      return false;
    }else if(targetUseful.length <10){
      $("#targetTask").removeAttr("style");
      var errorTargetUsefulText = $("#targetUseful").attr("data-message");
      $("#targetUseful").css({
        "border-color": "#ee171f"
      });
      modalErrorMessage.text(errorTargetUsefulText);
      return false;
    }else if(targetAction.length < 10){
      $("#targetUseful").removeAttr("style");
      var errorTargetActionText = $("#targetAction").attr("data-message");
      $("#targetAction").css({
        "border-color": "#ee171f"
      });
      modalErrorMessage.text(errorTargetActionText);
      return false;
    }
    /*type information validation*/
    else if(modalIntroSelect === "1"){
      $("#targetAction").removeAttr("style");
      var errorModalIntroSelectText = $("#modalIntroSelect").attr("data-message");
      $("#modalIntroSelect").css({
        "border-color": "#ee171f"
      });
      modalErrorMessage.text(errorModalIntroSelectText);
      return false;
    }
    /*design information validation*/
    else if(designUrl.length < 10){
      $("#modalIntroSelect").removeAttr("style");
      var errorDesignUrlText = $("#designUrl").attr("data-message");
      $("#designUrl").css({
        "border-color": "#ee171f"
      });
      modalErrorMessage.text(errorDesignUrlText);
      return false;
    }else if(designColor.length < 8){
      $("#designUrl").removeAttr("style");
      var errorDesignColorText = $("#designColor").attr("data-message");
      $("#designColor").css({
        "border-color": "#ee171f"
      });
      modalErrorMessage.text(errorDesignColorText);
      return false;
    }else if(designWishes.length < 8){
      $("#designColor").removeAttr("style");
      var errorDesignWishesText = $("#designColor").attr("data-message");
      $("#designWishes").css({
        "border-color": "#ee171f"
      });
      modalErrorMessage.text(errorDesignWishesText);
      return false;
    }
    /*radio items verification*/
    else if(finishedDesign.length > 0 /*== true*/){
      $("#designWishes").removeAttr("style");
      var finishedDesignData =  $("#finishedDesign").attr("value");
      console.log(finishedDesignData);
      return false;
    }else if(individualDesign.lenght > 0 /*== true*/){
      $("#designWishes").removeAttr("style");
      var individualDesignData = $("#individualDesign").attr("value");
      console.log(individualDesignData);
      return false;
    }
    $("[data-message]").removeAttr("style");
    modalErrorMessage.text("");
    $.ajax({
      url: "../php/modalMail.php",
      type: "POST",
      cache: false,
      data: {
        mainName: mainName,
        mainOrganisation: mainOrganisation,
        mainMail: mainMail,
        mainPhone: mainPhone,
        companyUrl: companyUrl,
        companyServicess: companyServicess,
        companyMission: companyMission,
        companyAdvantages: companyAdvantages,
        targetTask: targetTask,
        targetUseful: targetUseful,
        targetAction: targetAction,
        modalIntroSelect: modalIntroSelect,
        designUrl: designUrl,
        designColor: designColor,
        designWishes: designWishes
      },
      dataType: "html",
      beforeSend: function () {
        modalsendButton.prop("disabled", true);
      },
      success: function (data) {
        if (!data) alert("Something is wrong, try again");
        else $(".modal__form").trigger("reset");
        alert(data);
        modalsendButton.prop("disabled", false);
      },
    });
  });
  /*vanta init*/
  VANTA.NET({
    el: "#vantaefect",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,
    color: 0x707172,
    backgroundColor: 0xf6f6f6,
    points: 4.00,
    maxDistance: 22.00,
    spacing: 20.00,
    showDots: false
  });
  /*mobile  menu*/
  var assideBtn = $("#asideButton");
  assideBtn.on("click", function(event){
    event.preventDefault();
    $("#sideBar").toggleClass("main__sidebar--open");
  });
  /*aos animation*/
  AOS.init();
});
