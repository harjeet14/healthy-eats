import HealthyEatsApiService from '../../services/healthyEatsApiService';
import './savedRecipeCard.scss';
export function SavedRecipeCard({ recipe }) {

  const deleteRecipe = function () {

    HealthyEatsApiService.deleteSavedRecipes(sessionStorage.sessionUserId, recipe.foodId)

  };

  return <div className="saved-meal" key={recipe.foodId}>
    <img src={recipe.foodImage} alt={recipe.foodTitle} />
    <h4 className='name'>{recipe.foodTitle}</h4>
    <button className='button-delete' onClick={deleteRecipe}>
      Delete
    </button>
    <button className='button-Add'>
      Add to planner
    </button>
  </div>
}