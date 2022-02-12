import { useState } from 'react';
import HealthyEatsApiService from '../../services/healthyEatsApiService';
import './recipeCard.scss'

export function RecipeCard({ recipe }) {

  const [strSaveButton, setStrSaveButton] = useState(recipe.isSaved ? 'Saved' : 'Save');

  const saveUnsaveRecipe = function () {

    if (strSaveButton === 'Save') {
      HealthyEatsApiService.createSavedRecipes(sessionStorage.sessionUserId, recipe.foodId)
        .then(res => {
          setStrSaveButton('Saved');
        });
    } else {
      HealthyEatsApiService.deleteSavedRecipes(sessionStorage.sessionUserId, recipe.foodId)
        .then(res => {
          setStrSaveButton('Save');
        });
    }
  };
  return <div className="home-meal" key={recipe.foodId}>
    <img src={recipe.foodImage} alt={recipe.foodTitle} />
    <h4 className='name'>{recipe.foodTitle}</h4>
    <button className='button' onClick={saveUnsaveRecipe}>
      {strSaveButton}
    </button>
  </div>
}