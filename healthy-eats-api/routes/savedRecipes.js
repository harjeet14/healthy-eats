const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {
    // if (req.session.user) {
    const recipeId = req.query.recipeId;
    const userId = req.query.userId;
    const foodTitle = req.query.foodTitle;
    const foodImage = req.query.foodImage;
    let queryText =
      `insert into saved_recipes
      (user_id, recipe_id, food_title, food_image) values
      ($1, $2, $3, $4)
     RETURNING *`;
    const query = {
      text: queryText,
      values: [
        userId,
        recipeId,
        foodTitle,
        foodImage
      ]
    };

    db.query(query)
      .then(result => {
        res.status(201).json({});
      })
      .catch(err => console.log(err));
  });

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
      .catch(err => console.log(err));
  });

  router.get("/userId/:userId", (req, res) => {
    const userId = req.params.userId;
    let queryText = `select recipe_id, food_title, food_image from saved_recipes where user_id = $1`;
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
