import icons from 'url:../../icons/icons.svg';

class ThemeView {
  _body = document.querySelector('body');
  _themeBtn = document.querySelector('.header__menu-theme');
  _themeIcon = '';

  addHandlerRender(handler) {
    this._themeBtn.addEventListener('click', function (e) {
      const click = e.target.closest('.header__menu-theme-icon').querySelector('use');
      const use = click.getAttribute('xlink:href');
      this._themeIcon = use.slice(use.indexOf('#') + 1);
      click.setAttribute('xlink:href', `${icons}#${this._themeIcon === 'icon-moon' ? 'icon-sun' : 'icon-moon'}`);

      handler('dark', this._themeIcon);
    });
  }

  getTheme() {}

  setTheme(theme, icon) {
    localStorage.setItem('theme', theme);
    localStorage.setItem('icon', icon);
  }
}

export default new ThemeView();
