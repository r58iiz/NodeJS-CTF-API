const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const session = require("express-session");
const path = require("path");

const router = express.Router();

const USER_API = require("./Routes/CTF_User_API");
const CHALLENGE_API = require("./Routes/CTF_Challenge_API");
const CTF_API = require("./Routes/CTF_API");

app.use(
  session({
    secret: "im not even sure what the secret should be. 182397123983",
    resave: true,
    saveUninitialized: true
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  cookieParser("im not even sure what the secret should be. 182397123983")
);



//CHALLENGE API

app.use("/api/v1/challenges", CHALLENGE_API);
/*
POST: /add
    Used to add a new challenge.
    Data required:
        req.body.authorization
            The 64 character long key
        req.body.challengeTAG
            The challenge name which will be displayed to users
        req.body.challengeID
            The challenge ID, preferably starting from 0
        req.body.expired
            If the challenge has expired, true, else false
        req.body.points
            Amount of points the challenge is worth
        req.body.solution
            The solution/flag of the challenge
        req.body.type
            The type of challenge. One oF: [RE,Crypto,IDKIDK]
        req.body.submittedBy
            The person who submitted the challenge(staff obv)
        req.body.link
            The link to file of challenge(hosted on discord private channel)
----------------------------------------------------------------
POST: /remove
    Used to remove(Set as expired) a challenge
    Data required:
        req.body.authorization
            The 64 character long key
        req.body.challengeTAG
            The challenge name which will be set as expired
        req.body.challengeID
            The challenge ID
----------------------------------------------------------------
POST: /list
    Used to get: Either all the challenges OR Info about a single challenge
    Data required:
        req.body.challengeTAG
            The name of challenge (ONLY WHEN INFO ABOUT 1 CHALLENGE. FOR ALL LEAVE IT 0)
----------------------------------------------------------------
*/

//USER API

app.use("/api/v1/users", USER_API);
/*
POST: /submit/solution
    Used to submit the solution of a challenge by USER
    Data required:
        req.body.userID
            The user ID of the submitter
        req.body.challengeTAG
            The name of challenge for which the solution is submitted
        req.body.solution
            The solution submitted by user
----------------------------------------------------------------
POST: /position
    Used to get the position + data of user in the leaderboard
    Data required:
        req.body.userID
            The user ID of the submitter
----------------------------------------------------------------
POST: /create
    Used to create a new user
    Data required:
        req.body.uID
            The user ID
        req.body.uTag
            The user TAG
*/

//CTF API
app.use("/api/v1/ctf", CTF_API);
/*
GET: /leaderboard
    Used to get the top 30 of the leaderboard
    Data required:
        None.
*/

app.get("/", (req, res) => res.status(200).send("Website up and running!"));

const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});