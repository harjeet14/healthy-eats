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

  router.put("/new",(req,res) => {
    var pad = function(num) { return ('00'+num).slice(-2) };
    let date = new Date();
    date = date.getUTCFullYear()         + '-' +
            pad(date.getUTCMonth() + 1)  + '-' +
            pad(date.getUTCDate())       + ' ' +
            pad(date.getUTCHours())      + ':' +
            pad(date.getUTCMinutes())    + ':' +
            pad(date.getUTCSeconds());
    
    const recipePrice=500;
    const query = {
      text: `insert into created_recipes (user_id, recipe_title, recipe_description, recipe_price, recipe_image_urls, created_at) values ($1,$2,$3, $4,$5,$6)
      RETURNING *`,
      values: [`${parseInt(req.body.userId)}`,`${req.body.newRecipe.recipeTitle}`,`${req.body.newRecipe.recipeDescription}`, `${recipePrice}`, `${req.body.newRecipe.recipeImageUrls}`, `${date}`]
    };
    db.query(query)
      .then(result=>{
        res.status(204).json();
      })
    .catch(error=>console.log(error))
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
      .catch(err => console.log(err));
  });

  router.get("/userId/:userId", (req, res) => {
    const userId = req.params.userId;
    console.log("geting saved recipes")
    let queryText = `select recipe_id from saved_recipes where user_id = $1`;
    const query = {
      text: queryText,
      values: [
        userId
      ]
    };

    db.query(query)
      .then(result => {
        const recipeIds = result.rows;
        res.status(200).json(recipeIds);
      })
      .catch(err => console.log(err));
  });

  return router;
};
