window.addEventListener('load', () => {
  const burgerButton = document.querySelector('.custom-nav__button');
  const navigationList = document.querySelector('.custom-nav__list');
  const navigationContainer = document.querySelector('.custom-nav');

  document.addEventListener('click', (event) => {
    const { target } = event;
    if(!target.closest('.custom-nav')) navigationList.classList.remove('js-visible');
    if (target === burgerButton) navigationList.classList.toggle('js-visible');
  });
});
