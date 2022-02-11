const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {
    // if (req.session.user) {
    const recipeId = req.query.recipeId;
    const userId = req.query.userId;

    let queryText = `insert into saved_recipes (user_id, recipe_id) values ($1,$2)
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

  return router;
}
