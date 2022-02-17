import * as model from './model.js';
import HeroView from './views/heroView.js';
import RecipeView from './views/recipeView.js';
import SearchView from './views/searchView.js';
import ResultsView from './views/resultsView.js';

//Config
import { SEARCH_POPUP_SEC } from './config.js';

//Polyfilling everything
import 'core-js/stable';
//Polyfilling async/await
import 'regenerator-runtime/runtime';

if (module.hot) {
  module.hot.accept();
}

//Recipe control
const controlRecipes = async function () {
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

const controlSearchResults = async function () {
  try {
    ResultsView.renderSpinner();
    console.log(ResultsView);

    //1. Get search query
    const query = SearchView.getQuery();

    if (!query) return;

    //2. Load search results
    await model.loadSearchResults(query);

    setTimeout(function () {
      SearchView.toggleWindow();
    }, SEARCH_POPUP_SEC * 1000);

    ResultsView.render(model.state.search);
  } catch (error) {
    console.log(error);
  }
};

const init = function () {
  RecipeView.addHandlerRender(controlRecipes);
  SearchView.addHandlerSearch(controlSearchResults);
};

init();
