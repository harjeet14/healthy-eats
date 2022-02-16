// create a new file (appCofig.js) and overwrite the config you need

import { userApiService, userFoodApi } from "./appConfig";

const _apiService = {
  url: "http://localhost",
  port: 8080,
};

const _foodApi = {
  url: "https://api.spoonacular.com/recipes/complexSearch",
  recipesBulkApiUrl: "https://api.spoonacular.com/recipes/informationBulk",
  recipeInfoUrl: "https://api.spoonacular.com/recipes/{id}/information",
  key: "YOUR KEY",
};

const apiService = { ..._apiService, ...userApiService };
const foodApi = { ..._foodApi, ...userFoodApi };

export const appConfig = { apiService, foodApi };
