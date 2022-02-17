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
    `;
  }
}

export default new HeroView();
