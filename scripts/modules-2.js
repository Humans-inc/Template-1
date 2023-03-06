document.addEventListener("DOMContentLoaded", () => {
  const modulesGC = document.querySelectorAll(".stream-table tr");
  const modulesCustom = document.querySelector(".custom-modules-wrap");

  const lessonClassDone = 'user-state-accomplished';
  const lessonClassAll = ''; // .user-state-need_accomplish

  let dataModules = Array.from(modulesGC).map((item, index) => {
    return {
      title: item.querySelector(".stream-title").innerText,
      number: index + 1,
      href: item.querySelector("a").href
    };
  });
  for (let module of dataModules) {
    console.log(module);
    if (module.title !== "Дашборд") {
      let xhr = new XMLHttpRequest();
      xhr.open("GET", module.href, false);
      xhr.send();
      let html = document.createElement("div");
      html.innerHTML = xhr.responseText;

      let allLessons = html.querySelectorAll(`.lesson-list li:not(.divider)${lessonClassAll}`).length;
      let userLessons = Array.from(allLessons).filter(item => item.classList.contains(lessonClass)).length;

      let newModule = document.createElement("a");
      newModule.href = module.href;
      newModule.classList.add("custom-module");
      newModule.innerHTML = `
        <span class="custom-module__number">Модуль ${module.number}</span>
        <span class="custom-module__title">${module.title}</span>
        <span class="custom-module__done"><b>${userLessons}</b>&nbsp;/ ${allLessons}</span>
        <span class="custom-module__button">Перейти</span>
      `;
      if (allLessons == 0) newModule.querySelector('.custom-module__done').style.display = 'none';
      modulesCustom.append(newModule);
    }
  }
});
