import './recipeCard.scss'

export function RecipeCard({ recipe }) {
  return <div className="home-meal" key={recipe.foodId}>
    <img src={recipe.foodImage} alt={recipe.foodTitle} />
    <h4 className='name'>{recipe.foodTitle}</h4>
    <button className='button'>
      Save
    </button>
  </div>
}