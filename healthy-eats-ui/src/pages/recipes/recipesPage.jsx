import HealthyEatsApiService from '../../services/healthyEatsApiService';
import RecipeCard from "../../components/recipes/recipeCard";
import { RecipeInfoModal } from "../recipeInfoModal/recipeInfoModal";
import { Grid, Container, Button } from "@mui/material";
import "../recipes/recipesPage.scss"
import { useEffect, useState } from 'react';
import { NewRecipe } from '../newRecipe/NewRecipe';


export function RecipesPage() {
  const [recipes, setRecipes] = useState([]);
  const [isNewRecipeActive, setIsNewRecipeActive] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);


  const handleNewRecipeClick = (e) => {
    e.preventDefault();
    setIsNewRecipeActive(true)
  }

 
  useEffect(() => {
    async function fetchData() {

      let newRecipes = await HealthyEatsApiService.getNewRecipes(sessionStorage.sessionUserId);
      let newRecipes2 = newRecipes.map((newRecipe) => {
        return (
          {
            ...newRecipe,
            foodImage: newRecipe.recipe_image_urls
          }
        )
      })

      setRecipes(newRecipes2)

    }
    fetchData();
  }, [])

  return (
    <div className="recipesPage">
      <Container> 
      <div className="button-div">
        <Button style={{backgroundColor: "#21b6ae"}} variant="contained" onClick={handleNewRecipeClick}>Add a new recipe!</Button>
        
      </div>

        <Grid container marginX={20} spacing={{ lg: 2 }} columns={{ lg: 4 }} >
          {recipes.map((recipe, index) =>
            <Grid item lg={1} key={index}>
              <RecipeCard
                onClick={async (food) => {

                  setSelectedRecipe({...recipe, title:recipe.recipe_title, image: recipe.foodImage, summary: recipe.recipe_description, instructions: recipe.recipe_instructions});
                }}
                key={`recipe-${recipe.foodId}`}
                recipe={{...recipe, foodTitle: recipe.recipe_title}}
                isDeletable={true}
              />
            </Grid>
          )}
        </Grid>
      </Container >
      {!!selectedRecipe &&
        <RecipeInfoModal selectedRecipe={selectedRecipe} onClose={() => {
          setSelectedRecipe(null);
        }} />
      }
      {isNewRecipeActive && <NewRecipe handleClick={() => { setIsNewRecipeActive(false) }} />}
    </div>
  );
};
