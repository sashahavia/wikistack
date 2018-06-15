const express = require("express");
const router = express.Router();

router.get("/", async (req, res, next) => {
  res.send('Got to GET/user');
});

router.post("/", async (req, res, next) => {
  res.send('Got to POST/user');
});

router.get("/add", async (req, res, next) => {
  res.send('Got to GET/user/add');
});

router.get("/:id", async (req, res, next) => {
  res.redirect('/');
});

router.put("/:id", async (req, res, next) => {
  res.send('Got to PUT/user');
});

router.delete("/:id", async (req, res, next) => {
  res.send('Got to DELETE/user');
});

module.exports = router;
