import { useState, useEffect } from 'react';
import FoodService from '../../services/foodService';
import RecipeCard from "../../components/recipes/recipeCard";
import HealthyEatsApiService from '../../services/healthyEatsApiService';
import './savedRecipes.scss'
import { Grid, Container } from "@mui/material";
import { RecipeInfoModal } from '../recipeInfoModal/recipeInfoModal';

export function SavedRecipes() {

  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const saveUnsaveRecipe = function (recipe, setIsSaved) {

    HealthyEatsApiService.deleteSavedRecipes(sessionStorage.sessionUserId, recipe.foodId)
      .then((res) => {
        setIsSaved(false);

        // recipe.isSaved = false;
        const newRecipes = recipes.filter(r => r.foodId !== recipe.foodId);
        setRecipes(newRecipes);
      });

  };

  const likeUnlikeRecipe = function (recipe, setIsLiked) {

    if (!recipe.isLiked) {
      HealthyEatsApiService.createLikedRecipes(sessionStorage.sessionUserId, recipe.foodId)
        .then((res) => {
          setIsLiked(true);
          recipe.isLiked = true;
        });
    } else {
      HealthyEatsApiService.deleteLikedRecipes(sessionStorage.sessionUserId, recipe.foodId)
        .then((res) => {
          setIsLiked(false);
          recipe.isLiked = false;
        });
    }
  };

  useEffect(() => {

    // inner function to avoid race condition
    async function inner() {

      const savedRecipes = await HealthyEatsApiService.getSavedRecipes(sessionStorage.sessionUserId);
      const likedRecipes = await HealthyEatsApiService.getLikedRecipes(sessionStorage.sessionUserId);

      savedRecipes.forEach(r => {
        r.foodId = r.recipe_id;
        r.foodTitle = r.food_title;
        r.foodImage = r.food_image;
        r.isLiked = likedRecipes.some(sr => sr.recipe_id === r.foodId);
      });
      setRecipes(savedRecipes);
    }

    inner();

  }, []);

  return (
    <div>
      <Container>
        <br />
        <Grid container marginX={20} spacing={{ lg: 2 }} columns={{ lg: 4 }} >
          {recipes.map((recipe, index) =>
            <Grid item lg={1} key={index}>
              <RecipeCard
                onClick={async (food) => {
                  let res = await FoodService.getRecipeInfo(food.foodId)
                  setSelectedRecipe(res);
                }}
                key={`recipe-${recipe.foodId}`}
                recipe={recipe}
                saveUnsaveRecipe={saveUnsaveRecipe}
                likeUnlikeRecipe={likeUnlikeRecipe}
                isDeletable="true" />
            </Grid>
          )}
        </Grid>
      </Container >

      {!!selectedRecipe &&
        <RecipeInfoModal selectedRecipe={selectedRecipe} onClose={() => {
          setSelectedRecipe(null);
        }} />
      }
    </div>
  )
}