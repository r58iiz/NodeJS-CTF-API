const express = require("express");
const userTable = require("../Models/CTF_USER_Schema.js");
const challengeTable = require("../Models/CTF_USER_Schema.js");
const router = express.Router();

router.get("/leaderboard", async function(req, res) {
    const arr = await userTable.find().sort({
      points: -1
    });
    const result = arr.slice(0, 30);
    return res.json(result);
});

router.get("/", function(req, res) {
  res.status(404)
});

module.exports = router;
