import icons from 'url:../../icons/icons.svg';

export default class View {
  _data;

  //Render method takes the data (state) and stores it inside of this._data
  //this._data can be access all over the place inside of this object
  render(data) {
    //if there is no data or if there is data, but that data is an array and it is empty
    if (
      !data ||
      (Array.isArray(data) && data.length === 0) ||
      (Array.isArray(data.recipes) && data.recipes.length === 0)
    )
      return this.renderError();

    // if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    //convert markup string to a DOM object.
    //The createContextualFragment() will convert the string into real DOM node objects
    //The newDOM will become like a big object
    const newDOM = document.createRange().createContextualFragment(newMarkup);

    //get all the elements in the newDOM
    //store the converted newDOM into an array (shallow-copy)
    const newElements = Array.from(newDOM.querySelectorAll('*'));

    //get the actual elements that are currently on the page
    //store the current elements to a real array
    const currentElements = Array.from(this._parentElement.querySelectorAll('*'));

    //Loop the newElements
    newElements.forEach((newElement, i) => {
      //The currentElement is eqaul currentElements at position i.
      const currentElement = currentElements[i];

      //Updates changed TEXT
      //isEqualNode will compare the content of newElement and currentElement; returs true or false
      //if newElement and currentElement is not equal or they are different
      //Then change the text content of the currentElement to the textContent of the newElement
      //Another check: select the firstChild of newElement that is actually what contains the text
      if (!newElement.isEqualNode(currentElement) && newElement.firstChild?.nodeValue.trim() !== '') {
        // console.log('💥', newElement.firstChild.nodeValue.trim());
        //This is essentially updating the DOM only in places where it has changed or where it was about to change
        currentElement.textContent = newElement.textContent;
      }

      //Updates changed ATTRIBUTES
      //if newElement and currentElement is not equal or they are different
      if (!newElement.isEqualNode(currentElement)) {
        //Convert it to an array and loop over newElement attributes
        //For each of them is an attribute then on the currentElement set the attribute.
        Array.from(newElement.attributes).forEach(attr => currentElement.setAttribute(attr.name, attr.value));
      }
    });
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
        <div class="message__icon-box u-mb-xs">
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
