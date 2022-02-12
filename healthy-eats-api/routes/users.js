/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.post("/authenticate", async (req, res) => {
    try {
      const { email, password } = req.body;
      const userWaw = await db.query(
        `SELECT * FROM users WHERE email = $1 AND password = $2 limit 1`,
        [email, password]
      );

      const user = userWaw.rows[0];

      res.send({ user: user });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
};
