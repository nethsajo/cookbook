import { API_URL, API_KEY, RESULT_PER_PAGE } from './config.js';
// import { getJSON, sendJSON } from './helpers.js';
import { AJAX } from './helpers.js';

//Contains an object for recipe, search and bookmarks
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RESULT_PER_PAGE,
  },
  bookmarks: [],
};

const createRecipeObject = function (data) {
  const { recipe } = data.data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    //Remember that the AND operator short-circuits.
    //So if recipe.key is a falsy value or if doesn't exist then nothing happens here
    //So then the destructing here, well does basically nothing
    //If recipe.key is some value, then the second part of the operator is executed and returned
    //So in that case, it is the object {key: recipe.key} here basically that is going to be returned
    ...(recipe.key && { key: recipe.key }),
  };
};

//This function will be the one responsible for actually fetching the recipe data from the api
export const loadRecipe = async function (id) {
  try {
    const data = await AJAX(`${API_URL}${id}`);
    state.recipe = createRecipeObject(data);

    //if there is any bookmark, which has the bookmark ID equal to the id that we just received
    //then set the bookmarked as true else set it to false
    if (state.bookmarks.some(bookmark => bookmark.id === id)) state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;

    console.log(state.recipe);
  } catch (error) {
    console.error(`${error} 💥💥💥`);
    throw error;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await AJAX(`${API_URL}?search=${query}`);

    const { recipes } = data.data;

    state.search.results = recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
      };
    });
    state.search.page = 1;
  } catch (error) {
    console.error(`${error} 💥💥💥`);
    throw error;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage; //0;
  const end = page * state.search.resultsPerPage; //12;

  return {
    query: state.search.query,
    result: state.search.results.length,
    recipes: state.search.results.slice(start, end),
  };
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ingredient => {
    ingredient.quantity = (ingredient.quantity * newServings) / state.recipe.servings;
  });

  state.recipe.servings = newServings;
};

const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const addBookmark = function (recipe) {
  //Add bookmark
  state.bookmarks.push(recipe);
  console.log(state.bookmarks);

  //Mark current recipe as bookmarked
  //This will add a new property in state.recipe if the condition is true
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

  persistBookmarks();
};

export const removeBookmark = function (id) {
  const index = state.bookmarks.findIndex(element => element.id === id);

  //Remove bookmark
  state.bookmarks.splice(index, 1);

  //Mark recipe as not bookmarked
  if (id === state.recipe.id) state.recipe.bookmarked = false;

  persistBookmarks();
};

const init = function () {
  const storage = localStorage.getItem('bookmarks');

  if (storage) state.bookmarks = JSON.parse(storage);
};
init();

export const uploadRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ingredient => {
        const ingredientsArray = ingredient[1].split(',');

        if (ingredientsArray.length !== 3) throw new Error('Wrong ingredient format! Please use the correct format');

        const [quantity, unit, description] = ingredientsArray;

        return { quantity: quantity ? +quantity : null, unit, description };
      });

    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.imageURL,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cooking_time,
      servings: +newRecipe.servings,
      ingredients,
    };

    const data = await AJAX(`${API_URL}?key=${API_KEY}`, recipe);
    state.recipe = createRecipeObject(data);
    //Call addBookmark with created recipe object
    addBookmark(state.recipe);
  } catch (error) {
    throw error;
  }
};
