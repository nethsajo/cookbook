import icons from 'url:../../icons/icons.svg';

class HeroView {
  _parentElement = document.querySelector('.main');
  _year = document.querySelector('.footer__year');

  constructor() {
    this.render();
    this._generateFullYear();
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
        <div class="intro__content container">
          <h1 class="heading__primary u-mb-xs t-center">Are you hungry?</h1>
          <p class="intro__text t-center u-mb-lg">
            Start by searching for a recipe or an ingredient. Discover recipes, cooks and how-to's based on the food you
            love.
          </p>
        </div>
      </section>
    `;
  }

  _generateFullYear() {
    const year = new Date().getFullYear();
    this._year.textContent = year;
  }
}

export default new HeroView();
