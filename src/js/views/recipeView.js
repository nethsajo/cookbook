import icons from 'url:../../icons/icons.svg';
import fracty from 'fracty';

class RecipeView {
  #parentElement = document.querySelector('.main');
  #data;

  render(data) {
    this.#data = data;
    const markup = this._generateMarkup();
    this.#clear();
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  #clear() {
    this.#parentElement.innerHTML = '';
  }

  renderSpinner() {
    const markup = `
      <div class="spinner">
        <div class="lds-dual-ring"></div>
      </div>
    `;

    this.#parentElement.innerHTML = '';
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _generateMarkup() {
    return `
      <section class="recipe">
        <div class="recipe__header">
          <div class="recipe__header-textbox">
            <div class="recipe__heading u-mb-md">
              <h2 class="heading__secondary u-mb-sm t-center">
                ${this.#data.title}
              </h2>
              <p class="recipe__publisher t-center">By: ${this.#data.publisher}</p>
            </div>
            <div class="recipe__details u-mb-lg">
              <div class="recipe__info">
                <svg class="recipe__info-icon">
                  <use xlink:href="${icons}#icon-clock"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data-minutes"
                  >${this.#data.cookingTime}</span
                >
                <span class="recipe__info-text">minutes</span>
              </div>
              <div class="recipe__info">
                <svg class="recipe__info-icon">
                  <use xlink:href="${icons}#icon-users"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data-people">${this.#data.servings}</span>
                <span class="recipe__info-text">servings</span>
              </div>
            </div>
            <div class="recipe__bookmark">
              <button class="btn btn--primary btn--sm" btn__bookmark">
                <svg class="btn__icon">
                  <use xlink:href="${icons}#icon-bookmark"></use>
                </svg>
                <span class="btn__text t-uppercase u-ml-xs">Add to bookmark</span>
              </button>
            </div>
          </div>
          <figure class="recipe__img-box">
            <img src="${this.#data.image}" alt="${this.#data.title}" class="recipe__img"/>
          </figure>
        </div>
        <div class="recipe__content">
          <div class="container">
            <div class="recipe__ingredients">
              <h2 class="heading__tertiary t-uppercase t-center u-mb-md">
                Recipe Ingredients
              </h2>
              <div class="recipe__info-button">
                <button class="recipe__btn recipe__btn--decrease">
                  <svg>
                    <use
                      xlink:href="${icons}#icon-minus-circle"
                    ></use>
                  </svg>
                  <span>Decrease</span>
                </button>
                <button class="recipe__btn recipe__btn--increase">
                  <svg>
                    <use
                      xlink:href="${icons}#icon-plus-circle"
                    ></use>
                  </svg>
                  <span>Increase</span>
                </button>
              </div>
              <ul class="recipe__ingredient-list">
                ${this.#data.ingredients.map(this._generateMarkupIngredients).join('')}
              </ul>
            </div>
          </div>
        </div>
        <div class="recipe__directions">
          <h2 class="heading__tertiary t-uppercase t-center u-mb-md">
            How to cook it
          </h2>
          <p class="recipe__directions-text u-mb-sm">This recipe was carefully designed and tested by <span class="recipe__publisher">${
            this.#data.publisher
          }</span>. Please check out directions at their website.
          </p>
          <a href="${this.#data.sourceUrl}" class="btn btn--primary btn--sm" target="_blank">
            <span class="btn__text t-uppercase u-mr-xs">Directions</span>
            <svg class="btn__icon">
              <use xlink:href="${icons}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>
      </section>
    `;
  }

  _generateMarkupIngredients(ingredient) {
    const { quantity, unit, description } = ingredient;
    return `
      <li class="recipe__ingredient">
        <svg class="recipe__icon">
          <use xlink:href="${icons}#icon-check"></use>
        </svg>
        ${quantity ? `<div class="recipe__quantity">${fracty(quantity).toString()}</div>` : ''}
        <div class="recipe__description">
          <span class="recipe__unit">${unit}</span>
          ${description}
        </div>
      </li>
    `;
  }
}

export default new RecipeView();
