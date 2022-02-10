const express = require('express');
const { connectionString } = require('../lib/db');
const router  = express.Router();

module.exports = (db) => {
  rotuer.post("/new",(req,res) => {
    console.log("psoted recipe", req.body)
    // const date = new Date();
    // const query = {
    //   text: `insert into created_recipes (user_id, recipeTitle, recipeDescription, recipePrice, recipeImageUrls, createdAt) values ($1,$2,$3, $4,$5,$6)
    //   RETURNING *`,
    //   values: [`${req.body.user_id}`,`${req.body.recipeTitle}`,`${req.body.recipeDescription}`, `${req.body.recipePrice}`, `${req.body.recipeImageUrls}`, `${date}`]
    // };
    // return db.query(query)
    // .then(result=>{
    //   res.redirect('/')
    // })
  });
};



