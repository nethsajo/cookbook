import * as model from './model.js';
import RecipeView from './views/recipeView.js';

//Polyfilling everything
import 'core-js/stable';
//Polyfilling async/await
import 'regenerator-runtime/runtime';

//Recipe control
const controlRecipe = async function () {
  try {
    //Get the id and remove the first character (#)
    const id = window.location.hash.slice(1);

    //If there is no id or id is false then return immediately
    if (!id) return;

    RecipeView.renderSpinner();

    //1. Loading recipe - this loadRecipe function is an async function and so therefore it will return a promise. So here we have to await that promise before we can move on in the next step in the execution of this async function (loadRecipe)
    await model.loadRecipe(id);

    //2. Rendering recipe and pass the state object to the recipe view
    RecipeView.render(model.state.recipe);
  } catch (error) {
    RecipeView.renderError();
  }
};

const init = function () {
  RecipeView.addHandlerRender(controlRecipe);
};

init();
