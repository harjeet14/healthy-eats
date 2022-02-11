import HttpService from '../../services/httpService';
import { useState } from 'react';
import './recipeCard.scss'

export function RecipeCard({ recipe }) {

  const [strSaveButton, setStrSaveButton] = useState('Save');

  const saveUnsaveRecipe = function () {

    if (strSaveButton === 'Save') {
      HttpService.post('/api/savedRecipes', null, { 'userId': 1, 'recipeId': recipe.foodId })
        .then(res => {
          setStrSaveButton('Saved');
        });
    } else {
      HttpService.delete('/api/savedRecipes', { 'userId': 1, 'recipeId': recipe.foodId })
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