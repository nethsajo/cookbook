import icons from 'url:../../icons/icons.svg';

class PaginationView {
  _parentElement = document.querySelector('.main');

  //Refactor this later!!
  render(data) {
    this._data = data;

    //For Pagination Container
    const markup = this._generateMarkupPagination();
    this._parentElement.insertAdjacentElement('beforeend', markup);

    //For Pagination Buttons
    const markupButton = this._generateMarkup();
    markup.insertAdjacentHTML('afterbegin', markupButton);
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btnElement = e.target.closest('.pagination__btn');

      if (!btnElement) return;

      const goToPage = +btnElement.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkupPagination() {
    const element = document.createElement('div');
    const classes = ['pagination', 'container'];
    element.classList.add(...classes);

    return element;
  }

  _generateMarkup() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
    console.log(numPages);

    //Page 1, and there are other pages
    if (currentPage === 1 && numPages > 1) {
      return this._generateMarkupButton('next');
    }

    //Last Page
    if (currentPage === numPages && numPages > 1) {
      return this._generateMarkupButton('prev');
    }

    //Other Page
    if (currentPage < numPages) {
      return this._generateMarkupButton('prev') + this._generateMarkupButton('next');
    }

    //Page 1, and there are no other pages
    return '';
  }

  _generateMarkupButton(direction) {
    const currentPage = this._data.page;
    const target = direction === 'prev' ? currentPage - 1 : currentPage + 1;
    const icon = direction === 'prev' ? 'icon-arrow-left' : 'icon-arrow-right';

    return `
      <button data-goto="${target}" class="pagination__btn pagination__btn--${direction}">
        <svg class="pagination__icon ${direction === 'prev' ? '' : 'u-d-none'}">
          <use href="${direction === 'prev' ? icons : ''}#${icon}"></use>
        </svg>
        <span class="pagination__text ${direction === 'next' ? 'u-mr-xs' : 'u-ml-xs'}">Page ${target}</span>
        <svg class="pagination__icon ${direction === 'next' ? '' : 'u-d-none'}">
          <use xlink:href="${direction === 'next' ? icons : ''}#${icon}""></use>
        </svg>
      </button>
    `;
  }
}

export default new PaginationView();
