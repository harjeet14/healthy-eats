const express = require("express");
const foodService = require("../services/foodService");
const router = express.Router();

module.exports = (db) => {
  router.get("/", async (req, res) => {
    try {
      const userId = req.query["userId"] || 0;
      const startDate = new Date(req.query["startDate"] || "2000-01-01");
      const endDate = new Date(req.query["endDate"] || "2000-01-01");
      const result = await foodService.getOrdersByDate(
        db,
        userId,
        startDate,
        endDate
      );
      res.send(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.post("/", async (req, res) => {
    try {
      const result = await foodService.saveDailyOrder(db, req.body);
      res.send(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
};
