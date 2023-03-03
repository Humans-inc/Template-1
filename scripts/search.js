// поиск
document.addEventListener('click', (event) => {
  if (!event.target.closest('.custom-search')) {
    if (document.querySelector('.custom-search__search-results-wrap')) {
      document
        .querySelectorAll('.custom-search__search-results-wrap')
        .forEach((item) => item.remove());
    }
  }
});
document.querySelector('#search').addEventListener('input', (event) => {
  const { target } = event;
  if (target.value.length > 1) {
    setTimeout(() => {
      fetch(
        `https://${window.location.hostname}/c/sa/search?searchStr=${
          target.value
        }&ccc=${Date.now()}`
      )
        .then((response) => response.json())
        .then((json) => {
          if (document.querySelector('.custom-search__search-results-wrap')) {
            document
              .querySelectorAll('.custom-search__search-results-wrap')
              .forEach((item) => item.remove());
          }
          if (json.success) {
            const { data } = json;
            console.log(data.blocks);
            const resWrap = document.createElement('div');
            const results = document.createElement('div');
            resWrap.classList.add('custom-search__search-results-wrap');
            results.classList.add('custom-search__search-results');
            resWrap.append(results);
            target.parentElement.append(resWrap);
            data.blocks.forEach((item) => {
              if (item.text) {
                let linkTitle = document.createElement('span');
                linkTitle.innerText = item.text;
                linkTitle.classList.add('custom-search__search-subtitle');
                results.append(linkTitle);
              } else if (item.url || item.shortRoute) {
                let link = document.createElement('a');
                link.innerText = item.title;
                link.classList.add('custom-search__search-item');
                results.append(link);
                if (item.description) {
                  let descr = document.createElement('span');
                  descr.classList.add('custom-search__search-item-descr');
                  descr.innerText = item.description;
                  link.append(descr);
                }
                if (item.onClick) {
                  link.href = item.onClick.url;
                } else {
                  link.href = `/user/control/user/update/id/${item.shortRoute.replace(/\D+/, '')}`;
                }
              }
            });
          }
        })
        .catch((error) => console.warn(error.message));
    }, 300);
  } else {
    if (document.querySelector('.custom-search__search-results-wrap')) {
      document
        .querySelectorAll('.custom-search__search-results-wrap')
        .forEach((item) => item.remove());
    }
  }
});


