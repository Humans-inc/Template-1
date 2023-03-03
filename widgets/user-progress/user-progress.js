function declOfNum(n, text_forms) {
  n = Math.abs(n) % 100;
  var n1 = n % 10;
  if (n > 10 && n < 20) {
    return text_forms[2];
  }
  if (n1 > 1 && n1 < 5) {
    return text_forms[1];
  }
  if (n1 == 1) {
    return text_forms[0];
  }
  return text_forms[2];
}
const textForms = ['задание', 'задания', 'заданий'];
window.addEventListener('load', () => {
  let userPoint = 0;
  let allPoint = 0;
  let scale = 0;
  const scaleName = 'Достижения';
  let scales = document.querySelectorAll('#user-progress tbody tr');
  scales.forEach((item) => {
    if (item.querySelector('a').innerText.includes(scaleName)) {
      userPoint = +item.querySelector('.badge').innerText.split(' ')[0];
      document.querySelector('.user-progress__count-number').innerText = `${userPoint} ${declOfNum(
        userPoint,
        textForms
      )}`;
      let scaleNameArr = item.querySelector('a').innerText.split('/');
      allPoint = +scaleNameArr[scaleNameArr.length - 1];
      scale = Math.round((userPoint / allPoint) * 100);
    }
  });

  document.querySelector('.user-progress__text').innerText = `${scale}%`;
  const radius = 80;
  const colorShadow = getComputedStyle(document.querySelector('.user-progress')).getPropertyValue(
    '--up-progress-color-shadow'
  );

  const progressSVG = document.querySelector('#progress');

  const circleLength = 2 * 3.14 * radius;
  let dash = (circleLength / 100) * scale;

  const progress = progressSVG.querySelector('circle');
  progress.setAttribute('stroke-dasharray', `${dash} ${circleLength}`);
  setTimeout(() => {
    progressSVG.style.filter = `drop-shadow(0px 0px 10px ${colorShadow})`;
  }, 1000);
});
