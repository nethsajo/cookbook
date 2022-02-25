import * as model from './model.js';
//Configs
import { RELOAD, MODAL_CLOSE_SEC } from './config.js';

//Views
import HeroView from './views/heroView.js';
import RecipeView from './views/recipeView.js';
import SearchView from './views/searchView.js';
import ResultsView from './views/resultsView.js';
import PaginationView from './views/paginationView.js';
import BookmarksView from './views/bookmarksView.js';
import AddRecipeView from './views/addRecipeView.js';

//Polyfilling everything
import 'core-js/stable';
//Polyfilling async/await
import 'regenerator-runtime/runtime';

//Recipe control
const controlRecipes = async function () {
  try {
    //Get the id and remove the first character (#)
    const id = window.location.hash.slice(1);

    //If there is no id or id is false then return immediately
    if (!id) return;

    RecipeView.renderSpinner();

    //1. Update bookmarks view to mark selected search result
    BookmarksView.update(model.state.bookmarks);

    //2. Loading recipe - this loadRecipe function is an async function and so therefore it will return a promise.
    //So here we have to await that promise before we can move on in the next step in the execution of this async function (loadRecipe)
    await model.loadRecipe(id);

    //3. Rendering recipe and pass the state object to the recipe view
    RecipeView.render(model.state.recipe);
  } catch (error) {
    RecipeView.renderError();
    console.error(error);
  }
};

const controlSearchResults = async function () {
  try {
    ResultsView.renderSpinner();

    //1. Get search query
    const query = SearchView.getQuery();

    if (!query) return;

    //2. Load search results
    await model.loadSearchResults(query);

    //3. Render results
    // ResultsView.render(model.state.search);
    ResultsView.render(model.getSearchResultsPage());
    console.log(model.getSearchResultsPage());

    SearchView.toggleWindow();

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

  //1. Add/Remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  //else if the bookmarked is true, then you can remove a bookmark
  else model.removeBookmark(model.state.recipe.id);

  BookmarksView.addShowCountBookmarks(model.state.bookmarks.length);

  //2. Update the recipe view
  RecipeView.update(model.state.recipe);

  //3. Render bookmarks
  console.log(model.state.bookmarks);
  BookmarksView.render(model.state.bookmarks);
};

const contolBookmarks = function () {
  BookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    //Show loading spinner
    AddRecipeView.renderSpinner();

    //Upload the new recipe data
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    //Render added recipe
    RecipeView.render(model.state.recipe);

    //Success message
    AddRecipeView.renderSuccess();

    //Render bookmark view
    BookmarksView.render(model.state.bookmarks);

    //Change id in URL
    //pushState - takes three arguments
    //1st arg: state, 2nd arg: title, 3rd arg: url
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    //Close the form window
    setTimeout(() => {
      AddRecipeView.toggleWindow();
      //1e3 = 1 * 10^3
    }, MODAL_CLOSE_SEC * 1e3);
  } catch (error) {
    console.log('💥', error);
    AddRecipeView.renderError(error.message);
  }
};

const init = function () {
  BookmarksView.addHandlerRender(contolBookmarks);
  BookmarksView.addShowCountBookmarks(model.state.bookmarks.length);
  RecipeView.addHandlerRender(controlRecipes);
  RecipeView.addHandlerUpdateServings(controlServings);
  RecipeView.addHandlerAddBookmark(controlAddBookmark);
  SearchView.addHandlerSearch(controlSearchResults);
  PaginationView.addHandlerClick(controlPagination);
  AddRecipeView.addHandlerUpload(controlAddRecipe);
};

init();
