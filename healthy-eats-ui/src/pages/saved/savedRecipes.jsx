import { useState, useEffect } from 'react';
import FoodService from '../../services/foodService';
import HealthyEatsApiService from '../../services/healthyEatsApiService';
import { SavedRecipeCard } from './savedRecipeCard'
import './savedRecipes.scss'

export function SavedRecipes() {

  const [recipes, setRecipes] = useState([]);

  useEffect(() => {

    const recipeIds = [];
    HealthyEatsApiService.getSavedRecipes(sessionStorage.sessionUserId)
      .then(res => {
        console.log("recipes",res)
        res?.forEach(element => {
          console.log("recipe",element)
          recipeIds.push(element.recipe_id);
        });
      })
      .then(() => {
        console.log(recipeIds)
        FoodService.getRecipesBulk(recipeIds)
          .then(res => {
            console.log("res",res)
            setRecipes(res);
          });
      })
      .catch((error)=>console.log(error))
      ;
  }, []);

  return (<div className='saved'>
    <div className='saved-box'>
      <h2>Saved <button>+ Add</button></h2>

    </div>
    {recipes.map((recipe) => <h2>{recipe}</h2>)}
        
    {recipes.map((recipe) => <SavedRecipeCard key={`recipe-${recipe.foodId}`}
      recipe={recipe}
    />)}

  </div>

  )
}