import icons from 'url:../../icons/icons.svg';

export default class View {
  _data;
  //Render method takes the data (state) and stores it inside of this._data that can be access all over the place inside of this object
  render(data) {
    //if there is no data or if there is data, but that data is an array and it is empty
    if (!data || (Array.isArray(data.recipes) && data.recipes.length === 0)) return this.renderError();

    // if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    const markup = `
      <div class="spinner">
        <div class="lds-dual-ring"></div>
      </div>
    `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
      <div class="message">
        <div class="message__icon-box  u-mb-xs">
          <svg class="message__icon message__icon--error">
            <use xlink:href="${icons}#icon-alert-triangle "></use>
          </svg>
        </div>
        <p class="message__text">${message}</p>
      </div>
    `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderSuccess(message = this._successMessage) {
    const markup = `
      <div class="message">
        <div class="message__icon-box  u-mb-xs">
          <svg class="message__icon message__icon--success">
            <use xlink:href="${icons}#icon-check-circle"></use>
          </svg>
        </div>
        <p class="message__text">${message}</p>
      </div>
    `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
