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
      return `
        <button data-goto="${currentPage + 1}" class="pagination__btn pagination__btn--next">
          <span class="pagination__text u-mr-xs">Page ${currentPage + 1}</span>
          <svg class="pagination__icon">
            <use xlink:href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
      `;
    }

    //Last Page
    if (currentPage === numPages && numPages > 1) {
      return `
        <button data-goto="${currentPage - 1}" class="pagination__btn pagination__btn--prev">
          <svg class="pagination__icon">
            <use xlink:href="${icons}#icon-arrow-left"></use>
          </svg>
          <span class="pagination__text u-ml-xs">Page ${currentPage - 1}</span>
        </button>
      `;
    }

    //Other Page
    if (currentPage < numPages) {
      return `
        <button data-goto="${currentPage - 1}" class="pagination__btn pagination__btn--prev">
          <svg class="pagination__icon">
            <use xlink:href="${icons}#icon-arrow-left"></use>
          </svg>
          <span class="pagination__text u-ml-xs">Page ${currentPage - 1}</span>
        </button>

        <button data-goto="${currentPage + 1}" class="pagination__btn pagination__btn--next">
          <span class="pagination__text u-mr-xs">Page ${currentPage + 1}</span>
          <svg class="pagination__icon">
            <use xlink:href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
      `;
    }

    //Page 1, and there are no other pages
    return '';
  }
}

export default new PaginationView();
