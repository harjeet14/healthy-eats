const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {
    // if (req.session.user) {
    const recipeId = req.query.recipeId;
    const userId = req.query.userId;
    const foodTitle = req.query.foodTitle;
    const foodImage = req.query.foodImage;
    const calories = req.query.calories;
    let queryText =
      `insert into saved_recipes
      (user_id, recipe_id, food_title, food_image, calories) values
      ($1, $2, $3, $4, $5)
     RETURNING *`;
    const query = {
      text: queryText,
      values: [
        userId,
        recipeId,
        foodTitle,
        foodImage,
        calories
      ]
    };

    db.query(query)
      .then(result => {
        res.status(201).json({});
      })
      .catch(err => console.log(err));
  });

  router.put("/new",(req,res) => {
    console.log("req", req.body)
    var pad = function(num) { return ('00'+num).slice(-2) };
    let date = new Date();
    date = date.getUTCFullYear()         + '-' +
            pad(date.getUTCMonth() + 1)  + '-' +
            pad(date.getUTCDate())       + ' ' +
            pad(date.getUTCHours())      + ':' +
            pad(date.getUTCMinutes())    + ':' +
            pad(date.getUTCSeconds());
    
    let query = {
      text: `insert into created_recipes (user_id, recipe_title, recipe_description, recipe_instructions, recipe_image_urls, created_at) values ($1,$2,$3, $4,$5, $6)
      RETURNING *`,
      values: [`${parseInt(req.body.userId)}`,`${req.body.newRecipe.recipeTitle}`,`${req.body.newRecipe.recipeDescription}`,`${req.body.newRecipe.recipeInstructions}`, `${req.body.newRecipe.recipeImageUrls}`, `${date}`]
    };
    db.query(query)
      .then(result=>{
        // res.status(204).json(result);
        return result
      })
      .then(result=>{
        for (const ingredient of req.body.newRecipe.recipeIngredients){
          query = {
            text: `insert into created_recipes_ingredients (created_recipe_id, ingredient_name, ingredient_servings, ingredient_unit) values ($1, $2, $3, $4) returning *`,
            values: [`${result.rows[0].recipe_id}`, `${ingredient.ingredient}`,`${ingredient.ingredientServings}`,`${ingredient.ingredientUnit}`]
          }
          console.log("the query", query)
  
          db.query(query)
          .then(result=>{
            res.status(204).json()
        })
        .catch(err=>console.log("error is", err))
      }
    })
    .catch(error=>console.log(error))


  })

  router.get("/createdRecipes/userId/:userId", (req,res)=>{
    const userId = req.params.userId;
    console.log("req", req.params)
    

    let query = {
      text: `select * from created_recipes where user_id = $1`,
      values: [`${userId}`]
    }
    db.query(query)
    .then(result=>{
    console.log("results", result.rows)
      
      const createdRecipes = result.rows
      res.status(200).json(createdRecipes)
    })
    .catch(err=>console.log("err",err))
  })

  router.delete("/", (req, res) => {
    // if (req.session.user) {
    const recipeId = req.query.recipeId;
    const userId = req.query.userId;

    let queryText = `delete from saved_recipes where user_id = $1 and recipe_id = $2
              RETURNING *`;

    const query = {
      text: queryText,
      values: [
        userId,
        recipeId
      ]
    };

    db.query(query)
      .then(result => {
        res.status(204).json();
      })
      .catch(err => console.log("error is",err));
  });

  router.get("/userId/:userId", (req, res) => {
    const userId = req.params.userId;
    let queryText = `select recipe_id, food_title, food_image, calories from saved_recipes where user_id = $1`;
    const query = {
      text: queryText,
      values: [
        userId
      ]
    };

    db.query(query)
      .then(result => {
        const savedRecipes = result.rows;
        res.status(200).json(savedRecipes);
      })
      .catch(err => console.log(err));
  });

  return router;
};
