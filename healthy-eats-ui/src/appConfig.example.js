// create a new file (appCofig.js) and overwrite the config you need

import { userApiService, userFoodApi } from "./appConfig.example";

const _apiService = {
  url: "http://localhost",
  port: 8080,
};

const _foodApi = {
  url: "https://api.spoonacular.com/recipes/complexSearch",
  recipesBulkApiUrl: "https://api.spoonacular.com/recipes/informationBulk",
  recipeInfoUrl: "https://api.spoonacular.com/recipes/{id}/information",
  ingredientListUrl: "https://api.spoonacular.com/food/ingredients/search",
  key: "f09113c516164b48a0f46e07fb989871",

};

const apiService = { ..._apiService, ...userApiService };
const foodApi = { ..._foodApi, ...userFoodApi };

export const appConfig = { apiService, foodApi };
