$(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 1200,
        adaptiveHeight: true,
        autoplay: false,
        autoplaySpeed: 1500,
        prevArrow: '<button type="button" class="slick-prev"><img src="img/arrow_left.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="img/arrow_right.svg"></button>',
        responsive: [
            {
              breakpoint: 991,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: true,
                arrows: false,
                autoplay: false,
                autoplaySpeed: 1500,
                focusOnSelect: true
              }
            },
          ]
    });

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
      $(this)
        .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
        .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    $('.catalog-item__link').each(function(i) {
      $(this).on('click', function(e) {
        e.preventDefault();
        $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
        $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
      })
  });
  $('.catalog-item__back').each(function(i) {
    $(this).on('click', function(e) {
      e.preventDefault();
      $('.catalog-item__content ').eq(i).toggleClass('catalog-item__content_active');
      $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
    })
})

// Modal 

$('[data-modal=consultation]').on('click', function() {
  $('.overlay, #consultation').fadeIn('slow');
});
$('.modal__close').on('click', function() {
  $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
});

$('.button_mini').each(function(i) {
    $(this).on('click', function() {
      $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
      $('.overlay, #order').fadeIn('slow');

    })

});

function valideForms(form){
  $(form).validate({
    rules: {
      name: {
        required: true,
        minlength: 10
      },
      phone: "required",
      email: {
        required: true,
        email: true
  
  
  
      }
    },
    messages: {
      name: {
        required: "Пожалуйста, введите свое имя",
        minlength: jQuery.validator.format("Введите {0} символов!")
      },
      phone: "Пожалуйста, введите номер телефона",
      email:{
        required: "Пожалуйста, введите свою почту",
        email: "Неправильно введен e-mail"
  
      }
    }
  
  
  });
  
  

};

valideForms('#consultation form');
valideForms('#cosultation-form');
valideForms('#order form');

$('input[name=phone').mask("+38 (999) 999-9999");

$('form').submit(function(e) {
  e.preventDefault();

  if ($(this).valid()) {   

  $.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize()
  }).done(function() {
      $(this).find("input").val("");
      $('#consultation, #order').fadeOut();
      $('.overlay, #thanks').fadeIn('slow'); 

      $('form').trigger('reset');
  });
}
  return false;
});


});




     
          