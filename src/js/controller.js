import * as model from './model.js';
import HeroView from './views/heroView.js';
import RecipeView from './views/recipeView.js';
import SearchView from './views/searchView.js';
import ResultsView from './views/resultsView.js';
import PaginationView from './views/paginationView.js';
import BookmarksView from './views/bookmarksView.js';

//Config
import { SEARCH_POPUP_SEC } from './config.js';

//Polyfilling everything
import 'core-js/stable';
//Polyfilling async/await
import 'regenerator-runtime/runtime';

// if (module.hot) {
//   module.hot.accept();
// }

//Recipe control
const controlRecipes = async function () {
  try {
    //Get the id and remove the first character (#)
    const id = window.location.hash.slice(1);

    //If there is no id or id is false then return immediately
    if (!id) return;

    RecipeView.renderSpinner();

    //1. Loading recipe - this loadRecipe function is an async function and so therefore it will return a promise.
    //So here we have to await that promise before we can move on in the next step in the execution of this async function (loadRecipe)
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
    console.log(query);

    if (!query) return;

    //2. Load search results
    await model.loadSearchResults(query);

    //3. Render results
    // ResultsView.render(model.state.search);
    ResultsView.render(model.getSearchResultsPage());
    console.log(model.getSearchResultsPage());

    setTimeout(function () {
      SearchView.toggleWindow();
    }, SEARCH_POPUP_SEC * 1000);

    history.pushState({ query: model.state.search.query }, '', `/${model.state.search.query}/`);

    //4. Render initial pagination buttons
    PaginationView.render(model.state.search);
  } catch (error) {
    console.log(error);
  }
};

const controlPagination = function (goToPage) {
  //1. Render NEW results
  ResultsView.render(model.getSearchResultsPage(goToPage));

  //2. Render NEW pagination buttons
  PaginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  //Update the recipe servings (in state)
  model.updateServings(newServings);

  //Update the recipe view
  RecipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  //When do we actually want to add a bookmark?
  //Actually only when the recipe is not yet bookmarked
  //So here, if the bookmarked is false, then you can add to bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  //else if the bookmarked is true, then you can remove a bookmark
  else model.removeBookmark(model.state.recipe.id);

  console.log(model.state.recipe.bookmarked);

  RecipeView.update(model.state.recipe);
  console.log(model.state.recipe);
};

const init = function () {
  RecipeView.addHandlerRender(controlRecipes);
  RecipeView.addHandlerUpdateServings(controlServings);
  RecipeView.addHandlerAddBookmark(controlAddBookmark);
  SearchView.addHandlerSearch(controlSearchResults);
  PaginationView.addHandlerClick(controlPagination);
};

init();
