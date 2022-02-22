import { useState } from 'react'
import HealthyEatsApiService from '../../services/healthyEatsApiService';
import './newRecipe.scss'




export function NewRecipe(props) {

    const [recipeTitle, setRecipeTitle] = useState("")
    const [recipeDescription, setRecipeDescription] = useState("")
    const [recipeInstructions, setRecipeInstructions] = useState("")

    const [recipeImageUrls, setRecipeImageUrls] = useState("")
    const [recipeIngredients, setRecipeIngredients] = useState([])
    const [ingredient, setIngredient] = useState("")
    const [ingredientServings, setIngredientServings] = useState("1")
    const [ingredientUnit, setIngredientUnit] = useState("Cups")


    const setIsNewRecipeActive = props.handleClick;



    const [recipeServings, setRecipeServings] = useState("")

    const addRecipe = (e) => {
        setIsNewRecipeActive(false);
        e.preventDefault()
        const newRecipe = {
            recipeTitle,
            recipeDescription,
            recipeInstructions,
            recipeImageUrls,
            recipeIngredients
        }

        HealthyEatsApiService.addNewRecipe(sessionStorage.sessionUserId, newRecipe)


    };

    const addIngredients = (e) => {
        e.preventDefault()
        console.log("ingredients added", ingredient, ingredientServings, ingredientUnit)
        setRecipeIngredients([
            ...recipeIngredients,
            {
                "ingredient": ingredient,
                "ingredientServings": ingredientServings,
                "ingredientUnit": ingredientUnit

            }
        ])
        console.log("recipe ingredients are:", recipeIngredients)
    }

    const deleteIngredient = (e) => {
        e.preventDefault();
        setRecipeIngredients(
            recipeIngredients.filter(recipeIngredient => recipeIngredient.ingredient !== e.target.value)
        )
    }




    return (
        <div className="overlay">
            <div className="modal">
                <h1>Add a new recipe</h1>
                <form>
                    <label>Recipe Title</label>
                    <input
                        type="text"
                        value={recipeTitle}
                        onChange={(e) => setRecipeTitle(e.target.value)}
                    />
                    <label>Description</label>
                    <input
                        type="text"
                        value={recipeDescription}
                        onChange={(e) => setRecipeDescription(e.target.value)}
                    />
                    <label>Instructions</label>
                    <input
                        type="text"
                        value={recipeInstructions}
                        onChange={(e) => setRecipeInstructions(e.target.value)}
                    />
                    <label>Add Picture</label>
                    <input
                        type="url"
                        value={recipeImageUrls}
                        onChange={(e) => setRecipeImageUrls(e.target.value)} />
                    <div className="form-ingredients">

                        <label>Add Ingredient</label>
                        <input
                            type="text"
                            value={ingredient}
                            onChange={(e) => setIngredient(e.target.value)}
                        />
                        <label>Ingredient Servings</label>
                        <input
                            className="servings-num"
                            type="number"
                            value={ingredientServings}
                            onChange={(e) => setIngredientServings(e.target.value)}
                        />
                        <select
                            id="unit"
                            name="unit"
                            value={ingredientUnit}
                            onChange={(e) => setIngredientUnit(e.target.value)}
                        >
                            <option value="Cups">Cups</option>
                            <option value="Tbsp">Tbsp</option>
                            <option value="Tsp">Tsp</option>
                            <option value="g">g</option>
                            <option value="Kg">Kg</option>
                            <option value="mL">mL</option>
                            <option value="L">L</option>
                        </select>
                        <button onClick={addIngredients}>+</button>
                    </div>

                    <div className="ingredients-list">
                        {recipeIngredients.map((ingredient) => {
                            return (
                                <div className="ingredient" >

                                    <p>{ingredient.ingredient}</p>
                                    <p>{ingredient.ingredientServings}</p>
                                    <p>{ingredient.ingredientUnit}</p>

                                    <button className="delete-button" value={ingredient.ingredient} onClick={(e) => deleteIngredient(e)}>X</button>
                                </div>
                            );
                        })}
                    </div>

                    <label>How many servings does this meal serve?</label>
                    <input
                        type="number"
                        value={recipeServings}
                        onChange={(e) => setRecipeServings(e.target.value)}
                    />

                    <button onClick={addRecipe}>Add Recipe</button>
                </form>

                <button onClick={props.handleClick}>close</button>
            </div>
        </div>
    )
}