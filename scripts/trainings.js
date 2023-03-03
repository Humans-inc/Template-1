window.addEventListener('load', () => {
  let trainingsGC = document.querySelectorAll('.stream-table tr');
  let avaliableTrainings = Array.from(trainingsGC).map((item) => item.dataset.trainingId);
  console.log(avaliableTrainings);

  let trainingsCustom = document.querySelectorAll('.custom-training');
  trainingsCustom.forEach((item) => {
    if (avaliableTrainings.includes(item.dataset.trainingId)) {
      item.classList.remove('custom-training_not-avaliable');
      item.closest('.xdget-html').style.order = 1;
      item.querySelector('.custom-training__state').innerText = 'Доступен';
      item.querySelector('.custom-training__button').innerText = 'Войти в тренинг';
    } else {
      item.closest('.xdget-html').style.order = 2;
    }
  });
});
