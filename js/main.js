/*preloader load*/
const loader = $(".loader");
$(window).on("load", function () {
  setTimeout(function () {
    loader.addClass("loader--done");
  }, 2500);
  if (loader.hasClass("loader--done")) {
    $("html, body").removeAttr("style");
  } else {
    $("html, body").css({
      overflow: "hidden",
    });
  }
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
        breakpoint: 991,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
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
    fitImagesInViewport: false,
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
    var modalName = $("#modalIntroName").val().trim();
    var modalphone = $("#modalIntroPhone").val().trim(),
      modalIntRegex = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
    var modalMessage = $("#modalIntroQuestion").val().trim();
    if (modalName.length < 4) {
      var mErrorNameText = $("#modalIntroName").attr("data-message");
      modalErrorMessage.text(mErrorNameText);
      return false;
    } else if (modalphone.length < 6 || !modalIntRegex.test(modalphone)) {
      var mErrorPhoneText = $("#modalIntroPhone").attr("data-message");
      modalErrorMessage.text(mErrorPhoneText);
      return false;
    } else if (modalMessage.length < 14) {
      var mErrorMessageText = $("#modalIntroQuestion").attr("data-message");
      modalErrorMessage.text(mErrorMessageText);
      return false;
    }
    modalErrorMessage.text("");
    $.ajax({
      url: "../php/modalMail.php",
      type: "POST",
      cache: false,
      data: {
        modalName: modalName,
        modalphone: modalphone,
        modalMessage: modalMessage,
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
});
