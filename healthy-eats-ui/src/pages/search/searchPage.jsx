import { useEffect, useState, useContext, useCallback } from "react";
import axios from "axios";
import { RecipeCard } from "../../pages/recipes/recipeCard";
import './searchPage.scss'

export function SearchPage() {

  const [searchTerm, setsearchTerm] = useState("");
  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = function (params) {
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
      .then(res => {
        setRecipes(res.data.meals);
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
        {recipes ? (
          recipes.map((recipe) => (
            <RecipeCard
              recipe={recipe}
            />
          ))
        ) : (
          <h2>No meals found! Try another word...</h2>
        )}
      </div>
    </div>
  );
};