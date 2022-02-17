class SearchView {
  _parentElement = document.querySelector('.search__form');
  _window = document.querySelector('.search');
  _btnOpenSearch = document.querySelectorAll('.btn__search');
  _btnCloseSearch = document.querySelector('.search__close-btn');

  constructor() {
    this._addHandlerShowSearch();
    this._addHandlerHideSearch();
  }

  toggleWindow() {
    this._window.classList.toggle('active');
  }

  _addHandlerShowSearch() {
    this._btnOpenSearch.forEach(btn => btn.addEventListener('click', this.toggleWindow.bind(this)));
  }

  _addHandlerHideSearch() {
    this._btnCloseSearch.addEventListener('click', this.toggleWindow.bind(this));
  }
}

export default new SearchView();
