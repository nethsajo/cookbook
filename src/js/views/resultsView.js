import View from './View.js';
import icons from 'url:../../icons/icons.svg';
import lazyload from 'url:../../images/lazy-img.jpg';

class ResultsView extends View {
  _parentElement = document.querySelector('.main');
  _errorMessage = 'No recipes found for your query. Please try again!';

  _generateMarkup() {
    console.log(this._query);
    return `
      <section class="preview container">
        <h2 class="preview__results u-full-col-grid">${this._data.result} ${
      this._data.result > 1 ? 'results' : 'result'
    } for "${this._data.query}"
        </h2>
        ${this._data.recipes.map(recipe => this._generateMarkupRecipe(recipe)).join('')}
      </section>
    `;
  }

  _generateMarkupRecipe(recipe) {
    const { id, publisher, title, image, key } = recipe;
    return `
      <a href="#/${this._query}/${id}" class="preview__link">
        <article class="preview__box">
          <div class="preview__img-box">
            <img src="${lazyload}" data-src="${image}" alt="${title}" class="preview__img" />
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
              <div class="preview__user-generated ${key ? '' : 'u-d-none'}">
                <svg>
                  <use xlink:href="${icons}#icon-user"></use>
                </svg>
              </div>
            </div>
          </div>
        </article>
      </a>
    `;
  }

  generateLazyLoadImage() {
    const imageTargets = document.querySelectorAll('img[data-src]');

    const loadImage = function (entries, observe) {
      entries.forEach(entry => {
        //if entry is not intersecting, return immediately
        if (!entry.isIntersecting) return;

        //if not, replace src with the original image
        entry.target.src = entry.target.dataset.src;

        entry.target.addEventListener('load', function () {
          entry.target.style.filter = 'brightness(0.6)';
        });

        observe.unobserve(entry.target);
      });
    };

    const imageObserver = new IntersectionObserver(loadImage, {
      root: null,
      threshold: 0,
      rootMargin: '0px',
    });

    imageTargets.forEach(function (image) {
      imageObserver.observe(image);
    });
  }
}

export default new ResultsView();
