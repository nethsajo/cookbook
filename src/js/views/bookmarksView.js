class BookmarkView {
  _parentElement = document.querySelector('.bookmarks');
  _btnOpenBookmark = document.querySelector('.header__menu-bookmark');
  _btnCloseBookmark = document.querySelector('.bookmarks__btn-close');

  constructor() {
    this._addShowBookmarks();
    this._addHideBookmarks();
  }

  toggleWindow() {
    this._parentElement.classList.toggle('active');
  }

  _addShowBookmarks() {
    this._btnOpenBookmark.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHideBookmarks() {
    this._btnCloseBookmark.addEventListener('click', this.toggleWindow.bind(this));
  }
}

export default new BookmarkView();
