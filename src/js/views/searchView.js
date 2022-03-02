class SearchView {
  _parentElement = document.querySelector('.search__form');
  _window = document.querySelector('.search');
  _btnOpenSearch = document.querySelectorAll('.btn__search');
  _btnCloseSearch = document.querySelector('.search__close-btn');
  _menuButton = document.querySelector('.btn__hamburger');
  _menuContainer = document.querySelector('.header__menu');

  constructor() {
    this._addHandlerShowSearch();
    this._addHandlerHideSearch();
  }

  getQuery() {
    const query = this._parentElement.querySelector('.search__field').value;
    return query;
  }

  _clearInput() {
    this._parentElement.querySelector('.search__field').value = '';
  }

  addHandlerSearch(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }

  toggleWindow() {
    this._window.classList.toggle('active');
    this._clearInput();

    if (this._menuContainer.classList.contains('active')) {
      this._menuButton.classList.remove('active');
      this._menuContainer.classList.remove('active');
    }
  }

  _addHandlerShowSearch() {
    this._btnOpenSearch.forEach(btn => btn.addEventListener('click', this.toggleWindow.bind(this)));
  }

  _addHandlerHideSearch() {
    this._btnCloseSearch.addEventListener('click', this.toggleWindow.bind(this));
  }
}

export default new SearchView();
