export const appConfig = {
    apiService: {
      url: "http://localhost",
      port: 8080,
    },
  
    foodApi: {
        url: "https://api.spoonacular.com/recipes/complexSearch",
        recipesBulkApiUrl: "https://api.spoonacular.com/recipes/informationBulk",
        recipeInfoUrl: "https://api.spoonacular.com/recipes/{id}/information",
        ingredientListUrl: "https://api.spoonacular.com/food/ingredients/search",
        key: "f09113c516164b48a0f46e07fb989871",
    },
  };
  
  
  export default appConfig;