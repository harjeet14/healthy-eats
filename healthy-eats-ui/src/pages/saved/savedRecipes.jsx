import { useState, useEffect } from 'react';
import FoodService from '../../services/foodService';
import RecipeCard from "../../components/recipes/recipeCard";
import HealthyEatsApiService from '../../services/healthyEatsApiService';
import './savedRecipes.scss'
import { Grid, Container, Box, Button, TextField } from "@mui/material";

export function SavedRecipes() {

  const [recipes, setRecipes] = useState([]);

  const saveUnsaveRecipe = function (recipe, setIsSaved) {

    HealthyEatsApiService.deleteSavedRecipes(sessionStorage.sessionUserId, recipe.foodId)
      .then((res) => {
        setIsSaved(false);
        // recipe.isSaved = false;
        const newRecipes = recipes.filter(r => r.foodId != recipe.foodId);
        setRecipes(newRecipes);
      });

  };

  useEffect(() => {

    const recipeIds = [];
    HealthyEatsApiService.getSavedRecipes(sessionStorage.sessionUserId)
      .then(res => {
        res?.forEach(element => {
          recipeIds.push(element.recipe_id);
        });
      })
      .then(() => {
        FoodService.getRecipesBulk(recipeIds)
          .then(res => {
            setRecipes(res);
          });
      })
      ;
  }, []);

  return (
    <Container>
      <Grid container marginX={20} spacing={{ lg: 2 }} columns={{ lg: 4 }} >
        {recipes.map((recipe, index) =>
          <Grid item lg={1} key={index}>
            <RecipeCard
              key={`recipe-${recipe.foodId}`}
              recipe={recipe}
              saveUnsaveRecipe={saveUnsaveRecipe}
              isDeletable="true" />
          </Grid>
        )}
      </Grid>
    </Container >
  )
}