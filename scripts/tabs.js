window.addEventListener('load', () => {
  document.querySelector('.active-module__title').innerText =
    document.querySelector('.page-header h1').innerText;

  document.querySelector('.custom-nav__list-link_all-trainings').href = '/teach/control';
  const links = document.querySelectorAll('.content-link');
  const parts = document.querySelectorAll('.content-part');

  document.querySelectorAll(`.content-dashboard .content-module`).forEach((module, idx) => {
    setTimeout(() => module.classList.add('active'), idx * 200);
  });

  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      links.forEach((l) => l.classList.remove('active-nav-item'));
      e.target.classList.add('active-nav-item');

      const hashLink = e.target.hash.replace('#', '');
      parts.forEach((part) => part.classList.remove('active'));
      if (document.querySelectorAll(`.${hashLink} .content-module`).length) {
        document.querySelectorAll(`.${hashLink} .content-module`).forEach((module, idx) => {
          setTimeout(() => module.classList.add('active'), idx * 200);
        });
      }
      document.querySelectorAll('.content-part').forEach((module) => {
        module.classList.remove('active');
      });
      document.querySelector(`.${hashLink}`).classList.add('active');
    });
  });
});
