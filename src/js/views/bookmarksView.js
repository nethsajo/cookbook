import View from './View.js';
import icons from 'url:../../icons/icons.svg';

class BookmarkView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _window = document.querySelector('.bookmarks');
  _bookmarksBadge = document.querySelector('.bookmarks__count');
  _btnOpenBookmark = document.querySelector('.header__menu-bookmark');
  _btnCloseBookmark = document.querySelector('.bookmarks__btn-close');
  _menuButton = document.querySelector('.btn__hamburger');
  _menuContainer = document.querySelector('.header__menu');
  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it.';

  constructor() {
    //Since this is a child class, we need to start by calling super
    super();
    this._addShowBookmarks();
    this._addHideBookmarks();
  }

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  toggleWindow() {
    this._window.classList.toggle('active');

    if (this._menuContainer.classList.contains('active')) {
      this._menuButton.classList.remove('active');
      this._menuContainer.classList.remove('active');
    }
  }

  _addShowBookmarks() {
    this._btnOpenBookmark.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHideBookmarks() {
    this._btnCloseBookmark.addEventListener('click', this.toggleWindow.bind(this));
  }

  addShowCountBookmarks(data) {
    this._bookmarksBadge.textContent = data ?? 0;
  }

  _generateMarkup() {
    return this._data.map(bookmark => this._generateMarkupBookmark(bookmark)).join('');
  }

  _generateMarkupBookmark(bookmark) {
    const query = window.location.hash.slice(2);
    const recipeId = query.split('/')[1];

    const { id, publisher, title, image, key } = bookmark;

    return `
      <li class="bookmarks__view">
        <a href="#/${this._query}/${id}" class="bookmarks__link ${id === recipeId ? 'bookmarks__link--active' : ''}">
          <figure class="bookmarks__figure">
            <img src="${image}" alt="${title}"/>
          </figure>
          <div class="bookmarks__data">
            <h4 class="bookmarks__title">${title}</h4>
            <p class="bookmarks__publisher">${publisher}</p>
            <div class="bookmarks__user-generated ${key ? '' : 'u-d-none'}">
              <svg>
                <use xlink:href="${icons}#icon-user"></use>
              </svg>
            </div>
          </div>
        </a>
      </li>
    `;
  }
}

export default new BookmarkView();
