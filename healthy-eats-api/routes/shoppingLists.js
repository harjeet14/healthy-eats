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

  router.delete("/:id", (req, res) => {

    const shoppingListItemId = req.params.id;

    db.query(
      `delete from shopping_list
        where id = $1`,
      [
        shoppingListItemId
      ]
    ).then((values) => {
      res.status(204).json({});
    });
  });

  router.put("/", (req, res) => {

    const ingredient = req.body;

    db.query(
      `update shopping_list
        set
          user_id = $1,
          ingredient_id = $2,
          ingredient_name = $3,
          ingredient_image = $4,
          amount = $5,
          unit = $6,
          is_checked = $7
        where id = $8`,
      [
        ingredient.user_id,
        ingredient.ingredient_id,
        ingredient.ingredient_name,
        ingredient.ingredient_image,
        ingredient.amount,
        ingredient.unit,
        ingredient.is_checked,
        ingredient.id
      ]
    ).then((values) => {
      res.status(200).json({});
    });;
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
