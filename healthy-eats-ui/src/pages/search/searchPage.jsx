import { useState, useEffect } from "react";
import RecipeCard from "../../components/recipes/recipeCard";
import FoodService from "../../services/foodService";
import HealthyEatsApiService from "../../services/healthyEatsApiService";
import { Grid, Container, Box, Button, TextField } from "@mui/material";
import './searchPage.scss'

export function SearchPage() {

  const [searchTerm, setSearchTerm] = useState("");
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {

    HealthyEatsApiService.getSavedRecipes(sessionStorage.sessionUserId)
      .then(res => {
        setSavedRecipes(res || []);
      });

  }, []);

  const fetchRecipes = function () {
    // FoodService.getRecipesTheMealDb(searchTerm)
    FoodService.getRecipes(searchTerm)
      .then(res => {

        res.forEach(r => {
          r.isSaved = savedRecipes.some(sr => sr.recipe_id === r.foodId);
        });

        setRecipes(res);
      });
  };

  const saveUnsaveRecipe = function (recipe, setIsSaved) {

    if (!recipe.isSaved) {
      HealthyEatsApiService.createSavedRecipes(sessionStorage.sessionUserId, recipe.foodId)
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

  return (

    <Container>
      <Box display="flex" justifyContent="center" padding={2} >
        <TextField id="outlined-search" label="Search" type="search"
          onChange={(e) => setSearchTerm(e.target.value)} />
        <Button onClick={fetchRecipes}>Submit</Button>
      </Box>
      <Grid container marginX={20} spacing={{ lg: 2 }} columns={{ lg: 4 }} >
        {recipes.map((recipe, index) =>
          <Grid item lg={1} key={index}>
            <RecipeCard
              key={`recipe-${recipe.foodId}`}
              recipe={recipe}
              saveUnsaveRecipe={saveUnsaveRecipe} />
          </Grid>
        )}
      </Grid>
    </Container >
  );
};