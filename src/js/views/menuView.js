class MenuView {
  _menuButton = document.querySelector('.btn__hamburger');
  _menuContainer = document.querySelector('.header__menu');

  constructor() {
    this._addHandlerShowMenu();
  }

  toggleMenu() {
    this._menuButton.classList.toggle('active');
    this._menuContainer.classList.toggle('active');
  }

  _addHandlerShowMenu() {
    this._menuButton.addEventListener('click', this.toggleMenu.bind(this));
  }
}

export default new MenuView();
