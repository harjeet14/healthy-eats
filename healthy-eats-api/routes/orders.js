const express = require("express");
const foodService = require("../services/foodService");
const router = express.Router();

module.exports = (db) => {
  router.get("/", async (req, res) => {
    try {
      const userId = req.query["userId"];
      const date = new Date(req.query["date"] || "2000-01-01");
      const result = await foodService.getDailyOrder(db, userId, date);
      res.send(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.post("/", async (req, res) => {
    try {
      // const { date, breakfast, lunch, dinner, userId } = req.body;
      const result = await foodService.saveDailyOrder(db, req.body);
      res.send(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
};
