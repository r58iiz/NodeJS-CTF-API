const express = require("express");
const userTable = require("../Models/CTF_USER_Schema.js");
const challengeTable = require("../Models/CTF_USER_Schema.js");
const router = express.Router();

router.get("/", function(req, res) {
  res.status(404);
});

router.post("/submit/solution", async function(req, res) {
  const flag = req.body.solution;
  const User = await userTable.findOne({ userID: req.body.userID });
  if (Object.entries(User).length === 0 && User.constructor === Object) {
    return res.json({ success: false, reason: "User not found" }); // user not found
  }

  const sol = await challengeTable.findOne({
    challengeTAG: req.body.challengeTAG,
    expired: false
  });

  if (Object.entries(sol).length === 0 && sol.constructor === Object) {
    return res.json({
      success: false,
      reason: "Challenge not found/expired."
    }); // Challenge not found
  }

  const TUser = await userTable.findOne({ userTag: req.body.userTag });
  if (TUser.challengesSolved.has(`${sol.challengeTAG}`)) {
    return res.json({ success: false, reason: "Challenge already solved." });
  }

  if (flag == sol.solution) {
    userTable.findOneAndUpdate(
      {
        userTag: req.body.userTag
      },
      {
        points: User.points + sol.points,
        challengesSolved: User.challengesSolved.push(sol.challengeTAG)
      }
    );
    return res.json({
      success: true,
      reason: `Flag was correct! You have gained ${sol.points}!`
    });
  }
});

router.post("/create", async function(req, res) {
  const data = new userTable({
    userID: req.body.userID,
    userTag: req.body.userTag,
    points: 0,
    challengesSolved: []
  });
  data.save(function(err) {
    if (err) {
      if (err.code == 11000) {
        return res.json({
          success: false,
          reason: "User could not be added as the user already exists."
        });
      }
      return res.status(500).json({ sucess: false, reason: "Server error" }); // For server errors
    }
  });
  res.json({
    success: true,
    reason: "The user should have been added. If not, blame Snav."
  }); // If all goes well
});

router.get("/position", async function(req, res) {
  const User = await userTable.findOne({ userID: req.body.userID });
  if (Object.entries(User).length === 0 && User.constructor === Object) {
    return res.json({ success: false, reason: "User not found" }); // user not found
  }
  const isUSER = x => x.userID == req.body.userID;
  const all = userTable.find().sort({ KEY: 1 });
  return res.json([User, all.findIndex(isUSER)]);
});

module.exports = router;
