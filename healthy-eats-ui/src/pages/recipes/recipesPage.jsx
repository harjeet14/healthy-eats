import { UnderConstruction } from "../../components/underConstruction/underConstruction";
import { Link, Route, Routes, useNavigate } from "react-router-dom";

import { RecipeCard } from "./recipeCard";
import {NewRecipe} from "../newRecipe/NewRecipe"
import { useState } from "react";
import axios from "axios";

export function RecipesPage() {
    const [searchTerm, setsearchTerm] = useState("");
    const [recipes, setRecipes] = useState([]);
    const [isNewRecipeActive, setIsNewRecipeActive] = useState(false);
  
    const handleNewRecipeClick=(e)=>{
        e.preventDefault();
        setIsNewRecipeActive(true)
    }

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

       <button onClick={handleNewRecipeClick}>Or add your own!</button> 
        {isNewRecipeActive && <NewRecipe handleClick={()=>{setIsNewRecipeActive(false)}} />}

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
