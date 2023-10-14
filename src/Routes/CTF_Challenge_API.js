const express = require("express");
const challengeTable = require("../Models/CTF_CHALLENGE_Schema.js");
const userTable = require("../Models/CTF_USER_Schema.js");
const router = express.Router();

router.post("/remove", function(req, res) {
  if (
    req.body.authorization !==
    "��i_�Jg����INVR3�~��&�[�v����CA>���P��U��z�)'��X|��S�WԨqJ�buibda"
  ) {
    return res.status(400);
  }
  verify();
  async function verify() {
    let chall = await challengeTable.findOne({
      challengeTAG: req.body.challengeTAG,
      challengeID: req.body.challengeID
    });
    if (Object.entries(chall).length === 0 && chall.constructor === Object) {
      return res.json({ sucess: false, reason: "Challenge not found." }); // user not found
    } else {
      if (chall.expired == true)
        return res.json({ sucess: false, reason: "Challenge already expired" });

      challengeTable.findOneAndUpdate(
        {
          challengeTAG: req.body.challengeTAG,
          challengeID: req.body.challengeID
        },
        { expired: true }
      );
      const UsersToBeDeducted = await userTable.find(
        {},
        {
          challengesSolved: {
            $elemMatch: {
              $eq: `${req.body.challengeTAG}`
            }
          }
        }
      );
      UsersToBeDeducted.forEach(x => {
        userTable.findOneAndUpdate(
          {
            userTag: x.userTag
          },
          {
            points: x.points - chall.points
          }
        );
      });
      return res.json({ sucess: true, reason: "Challenge set to expired" });
    }
  }
});

router.post("/add", function(req, res) {
  if (
    req.body.authorization !==
    "��i_�Jg����INVR3�~��&�[�v����CA>���P��U��z�)'��X|��S�WԨqJ�buibda"
  ) {
    return res.status(400);
  }
  add();
  async function add() {
    const data = new challengeTable({
      challengeTAG: req.body.challengeTAG,
      challengeID: req.body.challengeID,
      expired: req.body.expired || false,
      points: req.body.points,
      solution: req.body.solution,
      submittedBy: req.body.solution,
      challengeType: req.body.type,
      linkToFile: req.body.link
    });
    data.save(function(err) {
      if (err) {
        if (err.code == 11000) {
          return res.json({
            success: false,
            reason: "Challenge could not be added as it is already exists."
          });
        }
        return res.status(500).json({ sucess: false, reason: "Server error" }); // For server errors
      }
    });
    res.json({
      success: true,
      reason: "The challenge should have been added. If not, blame Snav."
    }); // If all goes well
  }
});

router.post("/list", function(res, req) {
  list();
  async function list() {
    const name = req.body.challengeTAG || 0;
    if (name == 0) {
      const arr = [];
      challengeTable.find().then(x => {
        arr.push({
          name: x.challengeTAG,
          ID: x.challengeID,
          Submitted: x.submittedBy,
          Points: x.points,
          Link: x.linkToFile,
          Expired: x.expired
        });
      });
      return res.json(arr);
    }
    if (name != 0) {
      const x = await challengeTable.findOne({
        challengeTAG: req.body.challengeTAG
      });
      return res.json({
        name: x.challengeTAG,
        ID: x.challengeID,
        Submitted: x.submittedBy,
        Points: x.points,
        Link: x.linkToFile,
        Expired: x.expired
      });
    }
  }
});

router.get("/", function(req, res) {
  res.status(404);
});

module.exports = router;
