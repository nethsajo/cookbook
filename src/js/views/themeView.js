import icons from 'url:../../icons/icons.svg';

class ThemeView {
  _body = document.querySelector('body');
  _themeBtn = document.querySelector('.header__menu-theme');
  _themeIconContainer = document.querySelector('.header__menu-theme-icon');
  _theme = 'dark';
  _themeIcon = 'icon-sun';

  addHandlerRender(handler) {
    this._themeBtn.addEventListener('click', handler);
  }

  getCurrentTheme() {
    const theme = document.body.classList.contains(this._theme) ? 'light' : 'dark';
    const use = this._themeIconContainer.querySelector('use').getAttribute('xlink:href');
    const icon = use.slice(use.indexOf('#') + 1);
    return { icon, theme };
  }

  getTheme() {
    const theme = localStorage.getItem('theme');
    const icon = localStorage.getItem('icon');
    console.log(this._themeIcon, icon);

    if (theme) {
      document.body.classList[theme === 'dark' ? 'add' : 'remove'](this._theme);
      this._themeIconContainer
        .querySelector('use')
        .setAttribute('xlink:href', `${icons}#icon-${this._themeIcon === icon ? 'moon' : 'sun'}`);
    }
  }

  setTheme() {
    const { icon, theme } = this.getCurrentTheme();
    console.log(this._themeIcon, icon);
    document.body.classList.toggle(this._theme);
    this._themeIconContainer
      .querySelector('use')
      .setAttribute('xlink:href', `${icons}#icon-${this._themeIcon === icon ? 'moon' : 'sun'}`);

    localStorage.setItem('theme', theme);
    localStorage.setItem('icon', icon);
  }
}

export default new ThemeView();
