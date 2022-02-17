import icons from 'url:../../icons/icons.svg';
import image from 'url:../../images/test-img.jpg';

class HeroView {
  _parentElement = document.querySelector('.main');

  constructor() {
    this.render();
  }

  render() {
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  _generateMarkup() {
    return `
      <section class="intro">
        <div class="intro__content">
          <h1 class="heading__primary u-mb-xs t-center">Are you hungry?</h1>
          <p class="intro__text t-center u-mb-lg">
            Start by searching for a recipe or an ingredient. Discover recipes, cooks and how-to's based on the food you
            love.
          </p>
          <button class="intro__btn-search btn__search">
            <svg class="intro__btn-icon">
              <use xlink:href="${icons}#icon-search"></use>
            </svg>
          </button>
        </div>
      </section>
      <a href="#5ed6604591c37cdc054bcd09">RECIPE 1</a>
      <a href="#5ed6604591c37cdc054bcb37">RECIPE 2</a>

      <!-- <section class="preview">
        <article class="preview__box">
          <img src="${image}" alt="Preview Name" class="preview__img" />
          <div class="preview__text-box">
            <span class="preview__publisher">The Pioneer Woman</span>
            <h3 class="preview__title u-mb-xs">Teriyaki Salmon</h3>
            <div class="preview__footer">
              <div class="preview__duration">
                <svg class="preview__duration-icon">
                  <use xlink:href="${icons}#icon-clock"></use>
                </svg>
                <span class="preview__time">45 minutes</span>
              </div>
            </div>
          </div>
        </article>
        <article class="preview__box">
          <img src="${image}" alt="Preview Name" class="preview__img" />
          <div class="preview__text-box">
            <span class="preview__publisher">The Pioneer Woman</span>
            <h3 class="preview__title u-mb-xs">Teriyaki Salmon</h3>
            <div class="preview__footer">
              <div class="preview__duration">
                <svg class="preview__duration-icon">
                  <use xlink:href="${icons}#icon-clock"></use>
                </svg>
                <span class="preview__time">45 minutes</span>
              </div>
            </div>
          </div>
        </article>
        <article class="preview__box">
          <img src="${image}" alt="Preview Name" class="preview__img" />
          <div class="preview__text-box">
            <span class="preview__publisher">The Pioneer Woman</span>
            <h3 class="preview__title u-mb-xs">Teriyaki Salmon</h3>
            <div class="preview__footer">
              <div class="preview__duration">
                <svg class="preview__duration-icon">
                  <use xlink:href="${icons}#icon-clock"></use>
                </svg>
                <span class="preview__time">45 minutes</span>
              </div>
            </div>
          </div>
        </article>
      </section> -->
    `;
  }
}

export default new HeroView();
