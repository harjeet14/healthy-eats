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
        res?.forEach(element => {
          recipeIds.push(element.recipe_id);
        });
      })
      .then(() => {
        FoodService.getRecipesBulk(recipeIds)
          .then(res => {
            setRecipes(res);
          });
      })
      ;
  }, []);

  return (<div className='saved'>
    <div className='saved-box'>
      <h2>Saved <button>+ Add</button></h2>

    </div>

    {recipes.map((recipe) => <SavedRecipeCard key={`recipe-${recipe.foodId}`}
      recipe={recipe}
    />)}

  </div>

  )
}