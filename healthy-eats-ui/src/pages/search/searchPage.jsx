import { useState, useEffect } from "react";
import RecipeCard from "../../components/recipes/recipeCard";
import FoodService from "../../services/foodService";
import HealthyEatsApiService from "../../services/healthyEatsApiService";
import { Grid, Container, Box, Button, TextField } from "@mui/material";
import './searchPage.scss'
import { RecipeInfoModal } from "../recipeInfoModal/recipeInfoModal";


export function SearchPage() {

  const [searchTerm, setSearchTerm] = useState("");
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [likedRecipes, setLikedRecipes] = useState([]);
  const [recipes, setRecipes] = useState([]);

  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {

    HealthyEatsApiService.getSavedRecipes(sessionStorage.sessionUserId)
      .then(res => {
        setSavedRecipes(res || []);
      });

    HealthyEatsApiService.getLikedRecipes(sessionStorage.sessionUserId)
      .then(res => {
        setLikedRecipes(res || []);
      });

  }, []);

  const fetchRecipes = function () {
    // FoodService.getRecipesTheMealDb(searchTerm)
    FoodService.getRecipes(searchTerm)
      .then(res => {

        res.forEach(r => {
          r.isSaved = savedRecipes.some(sr => sr.recipe_id === r.foodId);
          r.isLiked = likedRecipes.some(sr => sr.recipe_id === r.foodId);
        });

        setRecipes(res);
      });
  };

  const saveUnsaveRecipe = function (recipe, setIsSaved) {

    if (!recipe.isSaved) {
      HealthyEatsApiService.createSavedRecipes(
        sessionStorage.sessionUserId,
        recipe.foodId,
        recipe.foodTitle,
        recipe.foodImage)
        .then((res) => {
          setIsSaved(true);
          recipe.isSaved = true;
        });
    } else {
      HealthyEatsApiService.deleteSavedRecipes(sessionStorage.sessionUserId, recipe.foodId)
        .then((res) => {
          setIsSaved(false);
          recipe.isSaved = false;
        });
    }
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

  return (

    <div>
      <Container>
        <Box display="flex" justifyContent="center" padding={2} >
          <TextField id="outlined-search" label="Search" type="search"
            onChange={(e) => setSearchTerm(e.target.value)} />
          <Button sx={{ color: 'text.primary', fontWeight: 'bold' }} onClick={fetchRecipes} >Submit</Button>
        </Box>
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
                likeUnlikeRecipe={likeUnlikeRecipe} />
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
  );
};