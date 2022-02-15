import * as model from './Model.js';
import RecipeView from './views/recipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

//Fetch data from api
const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    RecipeView.renderSpinner();

    //1. Loading recipe
    await model.loadRecipe(id);

    //2. Rendering recipe
    RecipeView.render(model.state.recipe);
  } catch (error) {
    console.log(error);
  }
};

const init = function () {
  RecipeView.addHandlerRender(controlRecipe);
};

init();
