document.addEventListener('click', (event) => {
  const { target } = event;
  if (
    target.classList.contains('calendar__date') &&
    target.querySelector('.calendar__date-active')
  ) {
    target.querySelector('.calendar__date-active').classList.toggle('js-open');
    document.querySelector('.calendar__events-wrap').classList.toggle('js-close');
    document
      .querySelectorAll(
        `.calendar__event[data-day="${target.dataset.day}"][data-month="${target.dataset.month}"]`
      )
      .forEach((item) => item.classList.toggle('hidden'));
  }
});

let nowDate = new Date();
let nowDateNumber = nowDate.getDate();
let nowMonth = nowDate.getMonth();
let nowYear = nowDate.getFullYear();
let container = document.querySelector('#calendar');
let monthContainer = container.querySelectorAll('.calendar__title')[0];
let daysContainer = container.querySelector('.calendar__days');
let prevMonth = container.querySelector('.calendar__button_prev');
let nextMonth = container.querySelector('.calendar__button_next');
let monthName = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];

let curDate = nowDate.setMonth(nowDate.getMonth() - 1);

const setMonthCalendar = (year, month) => {
  let monthDays = new Date(year, month + 1, 0).getDate();
  let monthPrefix = new Date(year, month, 0).getDay();
  let monthDaysText = '';

  monthContainer.innerText = monthName[month];
  daysContainer.innerHTML = '';

  if (monthPrefix > 0) {
    for (let i = 1; i <= monthPrefix; i++) {
      monthDaysText += '<li></li>';
    }
  }

  let dataMonth = month + 1;

  for (let i = 1; i <= monthDays; i++) {
    
    monthDaysText +=
        `<li class="calendar__date" data-day="${i}" data-month="${dataMonth}">` + i + '</li>';
    /*
    if (i < 10) {
      monthDaysText +=
        `<li class="calendar__date" data-day="0${i}" data-month="${dataMonth}">` + i + '</li>';
    } else {
      monthDaysText +=
        `<li class="calendar__date" data-day="${i}" data-month="${dataMonth}">` + i + '</li>';
    }
    */
  }

  daysContainer.innerHTML = monthDaysText;

  if (month == nowMonth && year == nowYear) {
    days = daysContainer.getElementsByTagName('li');
  }
};

setMonthCalendar(nowYear, nowMonth);

prevMonth.addEventListener('click', () => {
  let curDate = new Date(nowYear, monthName.indexOf(monthContainer.textContent));
  curDate.setMonth(curDate.getMonth() - 1);
  let curYear = curDate.getFullYear();
  let curMonth = curDate.getMonth();
  setMonthCalendar(curYear, curMonth);
  document.querySelectorAll('.calendar__event').forEach((item) => {
    let span = document.createElement('span');
    span.classList.add('calendar__date-active');
    let day = document.querySelector(
      `.calendar__days li[data-day="${item.dataset.day}"][data-month="${item.dataset.month}"]`
    );
    day && day.prepend(span);
  });
  document
    .querySelectorAll('.calendar__date-active')
    .forEach((item) => item.classList.remove('js-open'));
  document.querySelector('.calendar__events-wrap').classList.add('js-close');
  document.querySelectorAll(`.calendar__event`).forEach((item) => item.classList.add('hidden'));
});

nextMonth.addEventListener('click', () => {
  let curDate = new Date(nowYear, monthName.indexOf(monthContainer.textContent));
  curDate.setMonth(curDate.getMonth() + 1);
  let curYear = curDate.getFullYear();
  let curMonth = curDate.getMonth();
  setMonthCalendar(curYear, curMonth);
  document.querySelectorAll('.calendar__event').forEach((item) => {
    let span = document.createElement('span');
    span.classList.add('calendar__date-active');
    let day = document.querySelector(
      `.calendar__days li[data-day="${item.dataset.day}"][data-month="${item.dataset.month}"]`
    );
    day && day.prepend(span);
  });
  document
    .querySelectorAll('.calendar__date-active')
    .forEach((item) => item.classList.remove('js-open'));
  document.querySelector('.calendar__events-wrap').classList.add('js-close');
  document.querySelectorAll(`.calendar__event`).forEach((item) => item.classList.add('hidden'));
});
const domen = `https://${window.location.hostname}`;
let monthNameShort = [
  'Янв',
  'Фев',
  'Мар',
  'Апр',
  'Май',
  'Июн',
  'Июл',
  'Авг',
  'Сен',
  'Окт',
  'Ноя',
  'Дек',
];

fetch('/pl/teach/control/schedule')
  .then((r) => r.text())
  .then((data) => {
    let html = document.createElement('div');
    html.innerHTML = data;
    let dates = html.querySelectorAll('table.table tr.state-');
    let arrEvents = [];
    let container = document.querySelector('.calendar__events-wrap');
    dates.forEach((item) => {
      let event = {
        date: item
          .querySelector('.lesson-state')
          .innerText.replace(/[\n\t]/g, ' ')
          .replace(/ {2,}/g, ' ')
          .trim(),
        title: item
          .querySelector('a')
          .innerText.replace(/[\n\t]/g, ' ')
          .replace(/ {2,}/g, ' ')
          .trim(),
        href: item.querySelector('a').href.replace(domen, ''),
      };
      arrEvents.push(event);
    });
    console.log(arrEvents);
    arrEvents.forEach((item) => {
      let event = document.createElement('a');
      event.href = item.href;
      event.classList.add('calendar__event');
      event.classList.add('hidden');
      if (item.date.includes('вчера')) {
        event.dataset.day = new Date(Date.now() - 86400000).getDate();
        event.dataset.month = new Date(Date.now() - 86400000).getMonth() + 1;
      } else if (item.date.includes('завтра')) {
        event.dataset.day = new Date(Date.now() + 86400000).getDate();
        event.dataset.month = new Date(Date.now() + 86400000).getMonth() + 1;
      } else if (item.date.includes('сегодня')) {
        event.dataset.day = new Date(Date.now()).getDate();
        event.dataset.month = new Date(Date.now()).getMonth() + 1;
      } else {
        event.dataset.day = `${item.date.split(' ')[1]}`;
        event.dataset.month = `${monthNameShort.indexOf(item.date.split(' ')[2]) + 1}`;
      }
      event.innerHTML = `
        <div class="calendar__event-date">${item.date}</div>
        <div class="calendar__event-title">${item.title}</div>      
      `;
      container.append(event);
      let span = document.createElement('span');
      span.classList.add('calendar__date-active');
      if (
        document.querySelector(
          `.calendar__days li[data-day="${event.dataset.day}"][data-month="${event.dataset.month}"]`
        )
      ) {
        document
          .querySelector(
            `.calendar__days li[data-day="${event.dataset.day}"][data-month="${event.dataset.month}"]`
          )
          .prepend(span);
      }
    });
  });
