$(function(){

$('.personal-account__form').each(function(){
  $(':required').on('blur', function() {
    $(this).parents('.personal-account__item').addClass('error');
    if($(this).val() != '') {
        $(this).parents('.personal-account__item').removeClass('error');
      }
  })
});

$('#personal-account').on('focus', function(){
    $('.personal-reference > div').removeClass('personal-reference__active');
    $('.personal-reference__account').addClass('personal-reference__active');
});

$('#personal-phone').on('focus', function(){
  $('.personal-reference > div').removeClass('personal-reference__active');
  $('.personal-reference__phone').addClass('personal-reference__active');
});

$('#personal-email').on('focus', function(){
  $('.personal-reference > div').removeClass('personal-reference__active');
  $('.personal-reference__email').addClass('personal-reference__active');
});

$('#personal-account, #personal-phone, #personal-email').on('blur', function(){
    $('.personal-reference > div').removeClass('personal-reference__active');
});

/*mask*/

$('#personal-account').mask('0000000');
$('#personal-phone').mask('+7(000)000-00-00');
$('#personal-room').mask('000');
$('#personal-gvs').mask('000');
$('#personal-hvs').mask('000');

});


$(function() {

  function validateForm(form){

      $(form).each(function(){
          // Объявляем переменные (форма и кнопка отправки)
          var form = $(this),
              btn = form.find('.personal-account__btn');

          // Добавляем каждому проверяемому полю, указание что поле пустое
          form.find('.personal-account__input:required').addClass('empty_field');

          // Функция проверки полей формы
          function checkInput(){
              form.find('.personal-account__input:required').each(function(){
                  if($(this).val() != ''){
                      // Если поле не пустое удаляем класс-указание
                      $(this).removeClass('empty_field');
                  } else {
                      // Если поле пустое добавляем класс-указание
                      $(this).addClass('empty_field');
                  }
              });
          }

          // Функция подсветки незаполненных полей
          function lightEmpty(){
              form.find('.empty_field').css({'border-color':'#d8512d'});
              // Через полсекунды удаляем подсветку
              setTimeout(function(){
                  form.find('.empty_field').removeAttr('style');
              },1000);
          }

          // Проверка в режиме реального времени
          setInterval(function(){
              // Запускаем функцию проверки полей на заполненность
              checkInput();
              // Считаем к-во незаполненных полей
              var sizeEmpty = form.find('.empty_field').length;
              console.log(sizeEmpty);
              // Вешаем условие-тригер на кнопку отправки формы
              if(sizeEmpty > 0){
                  if(btn.hasClass('disabled')){
                      return false
                  } else {
                      btn.addClass('disabled')
                  }
              } else {
                  btn.removeClass('disabled')
              }
          },500);

          // Событие клика по кнопке отправить
          btn.click(function(){
              if($(this).hasClass('disabled')){
                  // подсвечиваем незаполненные поля и форму не отправляем, если есть незаполненные поля
                  lightEmpty();
                  return false
              } else {
                  // Все хорошо, все заполнено, отправляем форму
                  form.submit();
              }
          });
      });
  }

    validateForm('.personal-account__form');
    validateForm('.online-pay__form');
});
