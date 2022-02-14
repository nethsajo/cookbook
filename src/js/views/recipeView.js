import icons from 'url:../../icons/icons.svg';

class RecipeView {
  #parentElement = document.querySelector('.section__content');
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
      <div class="recipe__img-box">
        <div class="recipe__heading">
          <h2 class="heading__secondary u-mb-md t-center">
            ${this.#data.title}
          </h2>
        </div>
        <img
          src="${this.#data.image}"
          alt="${this.#data.title}"
          class="recipe__img"
        />
        <div class="recipe__details">
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
            <span class="recipe__info-data recipe__info-data-people">${
              this.#data.servings
            }</span>
            <span class="recipe__info-text">servings</span>
            <div class="recipe__info-button">
              <button class="recipe__btn recipe__btn--decrease">
                <svg>
                  <use
                    xlink:href="${icons}#icon-minus-circle"
                  ></use>
                </svg>
              </button>
              <button class="recipe__btn recipe__btn--increase">
                <svg>
                  <use
                    xlink:href="${icons}#icon-plus-circle"
                  ></use>
                </svg>
              </button>
            </div>
          </div>
          <div class="recipe__bookmark">
            <button class="btn__round btn__bookmark">
              <svg>
                <use xlink:href="${icons}#icon-bookmark"></use>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div class="recipe__content">
        <div class="recipe__ingredients u-mb-lg">
          <h2 class="heading__tertiary t-uppercase t-center u-mb-md">
            Recipe Ingredients
          </h2>
          <ul class="recipe__ingredient-list">
            ${this.#data.ingredients
              .map(ingredient => {
                const { quantity, unit, description } = ingredient;
                return `
                <li class="recipe__ingredient">
                  <svg class="recipe__icon">
                    <use xlink:href="${icons}#icon-check"></use>
                  </svg>
                  <div class="recipe__quantity">${quantity ?? ''}</div>
                  <div class="recipe__description">
                    <span class="recipe__unit">${unit}</span>
                    ${description}
                  </div>
                </li>
              `;
              })
              .join('')}
          </ul>
        </div>
        <div class="recipe__directions">
          <h2 class="heading__tertiary t-uppercase t-center u-mb-md">
            How to cook it
          </h2>
          <p class="recipe__directions-text u-mb-sm">This recipe was carefully designed and tested by <span class="recipe__publisher">${
            this.#data.publisher
          }</span>. Please check out directions at their website.
          </p>
          <a href="${this.#data.sourceUrl}" class="btn btn--primary btn--sm">
            <span class="btn__text u-mr-xs">Directions</span>
            <svg class="btn__icon">
              <use xlink:href="${icons}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>
      </div>
    `;
  }
}

export default new RecipeView();
