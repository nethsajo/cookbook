import View from './View.js';
import icons from 'url:../../icons/icons.svg';

class ResultsView extends View {
  _parentElement = document.querySelector('.main');
  _data;
  _errorMessage = 'No recipes found for your query. Please try again!';

  _generateMarkup() {
    return `
      <section class="preview container">
        <h2 class="preview__results u-full-col-grid">${this._data.result} ${
      this._data.result > 1 ? 'results' : 'result'
    } for "${this._data.query}"
        </h2>
        ${this._data.recipes.map(this._generateMarkupRecipe).join('')}
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
