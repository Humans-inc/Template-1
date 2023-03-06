document.addEventListener('DOMContentLoaded', () => {
  const modulesGC = document.querySelectorAll('.stream-table tr');
  const modulesCustom = document.querySelector('.custom-modules-wrap');
  let dataModules = Array.from(modulesGC).map((item, index) => {
    return {
      title: item.querySelector('.stream-title').innerText,
      number: index + 1,
      href: item.querySelector('a').href,
    };
  });
  for (let module of dataModules) {
    if (module.title !== 'Дашборд') {
      let xhr = new XMLHttpRequest();
      xhr.open('GET', module.href, false);
      xhr.send();
      let html = document.createElement('div');
      html.innerHTML = xhr.responseText;

      let allLessons = '0';
      let userLessons = '0';

      let newModule = document.createElement('a');
      newModule.href = module.href;
      newModule.classList.add('custom-module');
      newModule.innerHTML = `
        <span class="custom-module__number">Модуль ${module.number}</span>
        <span class="custom-module__title">${module.title}</span>
        <span class="custom-module__done"></span>
        <span class="custom-module__button">Перейти</span>
      `;

      let scales = html.querySelectorAll('#module-progress tbody tr');
      let scaleName = 'Модуль';

      if (scales.length >= 1) {
        scales.forEach((item) => {
          if (item.querySelector('a').innerText.includes(scaleName)) {
            let allLessonsStr = item.querySelector('a').innerText.split('/');
            allLessons = allLessonsStr[allLessonsStr.length - 1];
            userLessons = item.querySelector('.badge').innerText.split(' ')[0];
            newModule.querySelector(
              '.custom-module__done'
            ).innerHTML = `<b>${userLessons}</b>&nbsp;/ ${allLessons}`;
          }
        });
      } else {
        newModule.querySelector('.custom-module__done').style.display = 'none';
      }

      modulesCustom.append(newModule);
    }
  }
});
