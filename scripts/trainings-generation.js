document.addEventListener('DOMContentLoaded', () => {
  let trainingsGC = document.querySelectorAll('.stream-table tr');
  let trainingsCustomContainer = document.querySelector('.custom-trainings-wrap');

  let trainingsData = [];
  trainingsGC.forEach((item, index) => {
    let obj = {
      title: item.querySelector('.stream-title').innerText,
      descr: item.querySelector('a div').innerText,
      link: item.querySelector('a').href.replace(`https://${window.location.hostname}`, ''),
    };
    trainingsData.push(obj);
  });
  trainingsData.forEach((item) => {
    let training = document.createElement('a');
    training.classList.add('custom-training');
    training.href = item.link;
    training.innerHTML = `
      <div class="custom-training__state">Доступен</div>
      <div class="custom-training__title">${item.title}</div>
      <div class="custom-training__description">${item.descr}</div>
      <div class="custom-training__button">Войти в тренинг</div>
    `;
    trainingsCustomContainer.append(training);
  });
});
