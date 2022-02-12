import { useState, useEffect } from "react";
import { RecipeCard } from "../../pages/recipes/recipeCard";
import FoodService from "../../services/foodService";
import HttpService from "../../services/httpService";
import './searchPage.scss'

export function SearchPage() {

  const [searchTerm, setsearchTerm] = useState("");
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {

    HttpService.get('/api/savedRecipes/userId/1', null)
      .then(res => {
        setSavedRecipes(res || []);
      });

  }, []);

  const fetchRecipes = function () {
    FoodService.getRecipes(searchTerm)
      .then(res => {

        res.forEach(r => {
          r.isSaved = savedRecipes.some(sr => sr.recipe_id === r.foodId);
        });

        setRecipes(res);
      });

  };

  return (
    <div className="search-page">
      <div className="search-page-search">
        <input
          type="text"
          placeholder="Type meal name here..."
          value={searchTerm}
          onChange={(e) => setsearchTerm(e.target.value)} />
        <button onClick={fetchRecipes} >Search</button>
      </div>
      <div className="search-page-grid">

        {recipes.map((recipe, index) => <RecipeCard key={`recipe-${recipe.foodId}`}
          recipe={recipe}
        />
        )}
        {!recipes.length && <h2>No meals found! Try another word...</h2>}
      </div>
    </div>
  );
};