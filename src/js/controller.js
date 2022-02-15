import * as Model from './Model.js';
import RecipeView from './views/recipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const timeout = function (seconds) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${seconds} seconds`));
    }, seconds * 1000);
  });
};

//Fetch data from api
const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    RecipeView.renderSpinner();

    //1. Loading recipe
    await Model.loadRecipe(id);

    //2. Rendering recipe
    RecipeView.render(Model.state.recipe);
  } catch (error) {
    console.log(error);
  }
};

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));
