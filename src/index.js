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

const { sessionSecretKey } = require("./config.json");

app.use(
  session({
    secret: sessionSecretKey,
    resave: true,
    saveUninitialized: true
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  cookieParser(sessionSecretKey)
);



//CHALLENGE API
app.use("/api/v1/challenges", CHALLENGE_API);

//USER API
app.use("/api/v1/users", USER_API);

//CTF API
app.use("/api/v1/ctf", CTF_API);

app.get("/", (req, res) => res.status(200).send("Website up and running!"));

const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
