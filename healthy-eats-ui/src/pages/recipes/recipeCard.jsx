// import { UnderConstruction } from "../../components/underConstruction/underConstruction";
import './recipeCard.scss'

export function RecipeCard(props) {

  const recipe = props.recipe;

  return <div className="home-meal" key={recipe.idMeal}>
    <img src={recipe.strMealThumb} alt="#" />
    <h4>{recipe.strMeal}</h4>
  </div>
}