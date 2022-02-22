import { UnderConstruction } from "../../components/underConstruction/underConstruction";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import HealthyEatsApiService from '../../services/healthyEatsApiService';
import RecipeCard from "../../components/recipes/recipeCard";
import { RecipeInfoModal } from "../recipeInfoModal/recipeInfoModal";
import { Grid, Container, Box, Button, TextField } from "@mui/material";
import styles from "../recipes/recipesPage.scss"

import {NewRecipe} from "../newRecipe/NewRecipe"
import { useState, useEffect } from "react";

export function RecipesPage() {
    const [recipes, setRecipes] = useState([]);
    const [isNewRecipeActive, setIsNewRecipeActive] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState(null);


    const handleNewRecipeClick=(e)=>{
        e.preventDefault();
        setIsNewRecipeActive(true)
    }

    useEffect( ()=>{
      async function fetchData(){

        let newRecipes = await HealthyEatsApiService.getNewRecipes(sessionStorage.sessionUserId);
        let newRecipes2  = newRecipes.map((newRecipe)=>{
          return(
            {...newRecipe,
              foodTitle:newRecipe.recipe_title,
              foodImage: newRecipe.recipe_image_urls
            }
          )
        })
        console.log("new recipes", newRecipes)
        console.log("new recipes2", newRecipes2)



        setRecipes(newRecipes2)
            
      }
      console.log("recipes", recipes)
       fetchData();
    }, [])

    return (
      <div>
      <Container>
   
        <Grid container marginX={20} spacing={{ lg: 2 }} columns={{ lg: 4 }} >
          {recipes.map((recipe, index) =>
            <Grid item lg={1} key={index}>
              <RecipeCard
                onClick={async (food) => {

                  setSelectedRecipe({...recipe, title:recipe.recipe_title, image: recipe.foodImage, summary: recipe.recipe_description, instructions: recipe.recipe_instructions});
                }}
                key={`recipe-${recipe.foodId}`}
                recipe={recipe}
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
      <button onClick={handleNewRecipeClick}>Or add your own!</button>
        {isNewRecipeActive && <NewRecipe handleClick={()=>{setIsNewRecipeActive(false)}} />}
    </div>
     

       


  
    );
  };
