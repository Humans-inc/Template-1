document.addEventListener('DOMContentLoaded', () => {
  let trainingsGC = document.querySelectorAll('.stream-table tr');

  trainingsGC.forEach((item) => {
    if (item.classList.contains('noaccess-mode-show')) {
      item.style.order = 2;
      item.querySelector('a').insertAdjacentHTML(
        'afterbegin',
        '<div class="custom-training__state">Недоступен</div>'
      );
      item.querySelector('a').insertAdjacentHTML(
        'beforeend',
        '<div class="custom-training__lock"></div> <div class="custom-training__button">Купить курс</div>'
      );
    } else {
      item.style.order = 1;
      item.querySelector('a').insertAdjacentHTML(
        'afterbegin',
        '<div class="custom-training__state">Доступен</div>'
      );
      item.querySelector('a').insertAdjacentHTML(
        'beforeend',
        '<div class="custom-training__button">Войти в тренинг</div>'
      );
    }
  });
});
