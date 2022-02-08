// import { UnderConstruction } from "../../components/underConstruction/underConstruction";
import './recipeCard.scss'

export function RecipeCard({ recipe }) {
  return <div className="home-meal" key={recipe.idMeal}>
    <img src={recipe.strMealThumb} alt={recipe.strMeal} />
    <h4>{recipe.strMeal}</h4>
  </div>
}