import View from './View.js';
import icons from 'url:../../icons/icons.svg';

class BookmarkView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _window = document.querySelector('.bookmarks');
  _btnOpenBookmark = document.querySelector('.header__menu-bookmark');
  _btnCloseBookmark = document.querySelector('.bookmarks__btn-close');
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
  }

  _addShowBookmarks() {
    this._btnOpenBookmark.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHideBookmarks() {
    this._btnCloseBookmark.addEventListener('click', this.toggleWindow.bind(this));
  }

  _generateMarkup() {
    return this._data.map(this._generateMarkupBookmark).join('');
  }

  _generateMarkupBookmark(bookmark) {
    const recipeId = window.location.hash.slice(1);

    const { id, publisher, title, image, key } = bookmark;

    return `
      <li class="bookmarks__view">
        <a href="#${id}" class="bookmarks__link ${id === recipeId ? 'bookmarks__link--active' : ''}">
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
