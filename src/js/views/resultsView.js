import View from './View.js';
import icons from 'url:../../icons/icons.svg';

class ResultsView extends View {
  _parentElement = document.querySelector('.main');
  _data;
  _errorMessage = 'No recipes found for your query. Please try again!';
  _successMessage = '';

  _generateMarkup() {
    return `
      <section class="preview">
        <h2 class="preview__results u-full-col-grid">${this._data.results.length} ${
      this._data.results.length > 1 ? 'results' : 'result'
    } for "${this._data.query}"
        </h2>
        ${this._data.results.map(this._generateMarkupRecipe).join('')}

        <div class="pagination u-full-col-grid">
          <button data-goto="1" class="pagination__btn pagination__btn--next">
            <svg class="pagination__icon">
              <use xlink:href="${icons}#icon-arrow-left"></use>
            </svg>
            <span class="pagination__text u-ml-xs">Page 1</span>
          </button>
          <button data-goto="2" class="pagination__btn pagination__btn--prev">
            <span class="pagination__text u-mr-xs">Page 2</span>
            <svg class="pagination__icon">
              <use xlink:href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
        </div>
      </section>
    `;
  }

  _generateMarkupRecipe(recipe) {
    const { id, publisher, title, image } = recipe;
    return `
      <a href="#${id}" class="preview__link">
        <article class="preview__box">
          <div class="preview__img-box">
            <img src="${image}" alt="${title}" class="preview__img" />
          </div>
          <div class="preview__text-box">
            <span class="preview__publisher">${publisher}</span>
            <h3 class="preview__title u-mb-xs">${title}</h3>
            <div class="preview__footer">
              <div class="preview__duration">
                <svg class="preview__duration-icon">
                  <use xlink:href="${icons}#icon-arrow-up-right"></use>
                </svg>
                <span class="preview__view-text">View Details</span>
              </div>
            </div>
          </div>
        </article>
      </a>
    `;
  }
}

export default new ResultsView();
