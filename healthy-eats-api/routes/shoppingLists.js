const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {
    const userId = req.query.userId;
    const ingredientId = req.query.ingredientId;
    const ingredientName = req.query.ingredientName;
    const ingredientImage = req.query.ingredientImage;
    const amount = req.query.amount;
    const unit = req.query.unit;
    const isChecked = req.query.isChecked;
    let queryText = `insert into shopping_list (user_id, ingredient_id, ingredient_name, ingredient_image, amount, unit, is_checked) values ($1,$2,$3,$4,$5,$6,$7)
     RETURNING *`;
    const query = {
      text: queryText,
      values: [
        req.query.userId,
        req.query.ingredientId,
        req.query.ingredientName,
        req.query.ingredientImage,
        req.query.amount,
        req.query.unit,
        req.query.isChecked,
      ]
    };

    db.query(query)
      .then(result => {
        res.status(201).json({});
      })
      .catch(err => console.log(err));
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
        const ingridientIds = result.rows;
        res.status(200).json(ingridientIds);
      })
      .catch(err => console.log(err));
  });

  return router;
};
