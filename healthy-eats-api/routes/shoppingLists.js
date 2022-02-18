const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {

    const shoppingListItems = req.body;

    const queries = [];
    shoppingListItems.forEach(ingredient => {
      queries.push(db.query(
        `insert into shopping_list
        (user_id, ingredient_id, ingredient_name, ingredient_image, amount, unit, is_checked)
        VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [
          ingredient.userId,
          ingredient.ingredientId,
          ingredient.ingredientName,
          ingredient.ingredientImage,
          ingredient.amount,
          ingredient.unit,
          ingredient.isChecked
        ]
      ));
    });

    Promise.all(queries)
      .then((values) => {
        res.status(201).json({});
      });

  });

  router.get("/userId/:userId", (req, res) => {
    const userId = req.params.userId;
    let queryText = `select * from shopping_list where user_id = $1`;
    const query = {
      text: queryText,
      values: [
        userId
      ]
    };

    db.query(query)
      .then(result => {
        const ingridients = result.rows;
        res.status(200).json(ingridients);
      })
      .catch(err => console.log(err));
  });

  return router;
};
