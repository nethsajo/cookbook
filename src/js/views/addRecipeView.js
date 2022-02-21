import View from './View.js';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _window = document.querySelector('.modal__content');
  _overlay = document.querySelector('.modal');
  _btnOpenModal = document.querySelector('.header__menu-add');
  _btnCloseModal = document.querySelectorAll('.btn--close-modal');

  constructor() {
    //Since this is a child class, we need to start by calling super
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  //Know that the this keyword inside of a handler function points to the element on which that listener is attached to.
  _addHandlerShowWindow() {
    //this.toggleWindow.bind(this) - the this keyword points to the current object (AddRecipeView)
    this._btnOpenModal.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHandlerHideWindow() {
    this._btnCloseModal.forEach(btn => btn.addEventListener('click', this.toggleWindow.bind(this)));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      //In the FormData we have to pass in an element that is a form and so that form in this case is the this keyword
      //because we are inside of a handler function and so the this keyword points to the _parentElement (upload form)
      const data = [...new FormData(this)];
      handler(data);
    });
  }

  _generateMarkup() {}
}

export default new AddRecipeView();
