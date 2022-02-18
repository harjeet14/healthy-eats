import axios from 'axios'
import { useState, useEffect } from 'react'
import styles from '../newRecipe/NewRecipe.scss'
import HealthyEatsApiService from '../../services/healthyEatsApiService';
import foodService from '../../services/foodService'
import newRecipeIngredients from '../newRecipe/newRecipeIngredients/NewRecipeIngredients'




export function NewRecipe(props) {

    const [recipeTitle, setRecipeTitle] = useState("")
    const [recipeDescription, setRecipeDescription] = useState("")
    const [recipeImageUrls, setRecipeImageUrls] = useState("")
    const [recipeIngredients, setRecipeIngredients] = useState([])
    const [ingredient, setIngredient] = useState([])
    const [ingredientServings, setIngredientServings] = useState("1")
    const [ingredientUnit, setIngredientUnit] = useState("Cups")

    const setIsNewRecipeActive = props.handleClick;



    const [recipeServings, setRecipeServings] = useState("")

    const addRecipe=(e)=>{
        setIsNewRecipeActive(false);
        e.preventDefault()
       const newRecipe = {
           recipeTitle,
           recipeDescription,
           recipeImageUrls,
           recipeIngredients           
       }

       HealthyEatsApiService.addNewRecipe(sessionStorage.sessionUserId, newRecipe)
     
            
        };
    
    const addIngredients=(e)=>{
        e.preventDefault()
        console.log("ingredients added",ingredient, ingredientServings,ingredientUnit)
        setRecipeIngredients([
            ...recipeIngredients,
            {
                "ingredient": ingredient,
                "ingredientServings" : ingredientServings,
                "ingredientUnit": ingredientUnit

            }
        ])
        console.log("recipe ingredients are:",recipeIngredients)
    }
    
    useEffect(()=>{
        const ingredientList = foodService.getIngredientsList(ingredient);
        ingredientExamples = ingredientList.map((ingredient) => {
            return (
                <newRecipeIngredients name={ingredient.name}/>
            );
        })
      },[ingredient])


    return(
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
                    <label>Add Picture</label>
                    <input  
                    type="url"
                    value={recipeImageUrls}
                    onChange={(e) => setRecipeImageUrls(e.target.value)}/>
                    <div className="form-ingredients">
                        <label>Add Ingredient</label>
                        <input  
                        type="text"
                        value={ingredient}
                        onChange={(e) => setIngredient(e.target.value)}
                        />
                        <label>Ingredient Servings</label>
                        <input 
                        className = "servings-num" 
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
                                <option value="Grams">g</option>
                                <option value="Kilogram">Kg</option>
                                <option value="Millileter">mL</option>
                                <option value="Leter">L</option>
                            </select>
                    <button onClick={addIngredients}>+</button>

                    </div>
                    <label>How many servings does this meal serve?</label>
                    <input  
                    type="number"
                    value={recipeServings}
                    onChange={(e) => setRecipeServings(e.target.value)}
                    />
                    <div>
                        {recipeIngredients.map((ingredient) => {
                            return (
                                <div className="ingredients-list">
                                    
                                    <h2>{ingredient.ingredient}</h2>
                                    <p>{ingredient.ingredientServings}</p>
                                    <p>{ingredient.ingredientUnit}</p>

                                </div>
                            );
                        })}
                    </div>
                   <button onClick={addRecipe}>Add Recipe</button>
                </form>

                
                <button onClick={props.handleClick}>close</button> 
            </div>
        </div>
    )
}