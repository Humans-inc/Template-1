window.addEventListener('load', () => {
  let str = document
    .querySelector('.user-product-block')
    .innerText.split(/\n/)[0]
    .replace(/[а-яА-Я ёЁ]*(?=\d)/, '');
  const accessContainer = document.querySelector('.access__content');

  const createDate = (str) => {
    let data = str.split(' ');
    let arr = [];
    data.forEach((item, index) => {
      if (index % 2 === 0) {
        let obj = {
          count: item,
          unit: data[index + 1],
        };
        arr.push(obj);
      }
    });
    arr.forEach((item) => {
      let date = document.createElement('div');
      date.classList.add('access__date');
      date.innerHTML = `
          <div class="access__number">${item.count}</div>
          <div class="access__units">${item.unit}</div>
        `;
      accessContainer.append(date);
    });
    return arr;
  };

  createDate(str);

  document.querySelector('.access__button').addEventListener('click', () => {
    document.querySelector('.btn-prolongate').click();
  });
});
