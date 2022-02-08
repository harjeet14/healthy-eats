import styles from '../newRecipe/NewRecipe.scss'




export function NewRecipe(props) {
    return(
        <div className="overlay">
            <div className="modal">
                <h1>Add a new recipe</h1>

                <form>
                    <label>Title</label>
                    <input  type="text"/>
                    <label>Description</label>
                    <input className="new-recipe-input" type="text"/>
                    <label>Add Picture</label>
                    <input className="new-recipe-input" type="url"/>
                    <label>Ingredients</label>
                    <input className="new-recipe-input" type="text"/>
                    <label>Servings</label>
                    <input className="new-recipe-input" type="number"/>
                    <label>Prep Time</label>
                    <input className="new-recipe-input" type="number"/>
                    <label>Cook Time</label>
                    <input className="new-recipe-input" type="number"/>

                    
                </form>
                <button onClick={props.handleClick}>close</button>
            </div>
        </div>
    )
}