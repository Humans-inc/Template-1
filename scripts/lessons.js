window.addEventListener('load', () => {
  const lessonsGC = document.querySelectorAll('.lesson-list li:not(.divider)');
  const lessonsCustom = document.querySelector('.custom-lessons-wrap');
  let dataLessons = Array.from(lessonsGC).map((item, index) => {
    return {
      title: item.querySelector('.link.title').innerText.replace('просмотрено', ''),
      number: index + 1,
      href: item.querySelector('a').href,
      state: item.classList[0],
    };
  });
  for (let lesson of dataLessons) {
    switch (lesson.state) {
      case 'user-state-accomplished':
        lessonStateText = 'Принят';
        break;
      case 'user-state-reached':
        lessonStateText = 'Доступен';
        break;
      case 'user-state-need_accomplish':
        lessonStateText = 'Есть задание';
        break;
      case 'user-state-answered':
        lessonStateText = 'На проверке';
        break;
      case 'user-state-has_mission':
        lessonStateText = 'Есть задание';
        break;
      case 'user-state-not_reached':
        lessonStateText = 'Не доступен';
        break;
    }
    console.log(lesson);
    let newLesson = document.createElement('a');
    newLesson.href = lesson.href;
    newLesson.classList.add('custom-lesson', lesson.state);
    newLesson.innerHTML = `
        <span class="custom-lesson__number">Урок ${lesson.number}</span>
        <span class="custom-lesson__title">${lesson.title}</span>
        <span class="custom-lesson__state">${lessonStateText}</span>
        <span class="custom-lesson__button">Перейти</span>
      `;
    lessonsCustom.append(newLesson);
  }
});
