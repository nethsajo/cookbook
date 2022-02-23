import View from './View.js';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _successMessage = 'Recipe was successfully uploaded!';
  _window = document.querySelector('.modal');
  _body = document.querySelector('body');
  _btnOpenModal = document.querySelector('.header__menu-add');
  _btnCloseModal = document.querySelectorAll('.btn--close-modal');

  constructor() {
    //Since this is a child class, we need to start by calling super
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  toggleWindow(marginValue, overflowValue) {
    this._body.style.margin = marginValue;
    this._body.style.overflow = overflowValue;
    this._window.classList.toggle('hidden');
  }

  //Know that the this keyword inside of a handler function points to the element on which that listener is attached to.
  _addHandlerShowWindow() {
    let scrollBarWidth = window.innerWidth - this._body.offsetWidth;
    let marginValue = '0 ' + scrollBarWidth + 'px 0 0';

    //this.toggleWindow.bind(this) - the this keyword points to the current object (AddRecipeView)
    this._btnOpenModal.addEventListener('click', this.toggleWindow.bind(this, marginValue, 'hidden'));
  }

  _addHandlerHideWindow() {
    this._btnCloseModal.forEach(btn => btn.addEventListener('click', this.toggleWindow.bind(this, '', '')));
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      //In the FormData we have to pass in an element that is a form and so that form in this case is the this keyword
      //because we are inside of a handler function and so the this keyword points to the _parentElement (upload form)
      const dataArray = [...new FormData(this)];

      //Object.fromEntries method transforms a list of key-value pairs into an object
      //So therefore, dataArray will be converted into an object and data var will handled it
      const data = Object.fromEntries(dataArray);
      handler(data);
    });
  }

  _generateMarkup() {}
}

export default new AddRecipeView();
