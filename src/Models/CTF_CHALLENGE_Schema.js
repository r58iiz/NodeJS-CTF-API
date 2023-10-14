const mongoose = require("mongoose");

const { mongoCTFUrl }  = require("../config.json");

mongoose.connect(mongoCTFUrl, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}, (err, conn) => {
  if(err) {
      console.error(`[=>]Could not connect to MongoDB CTF_CHALLENGE_SCHEMA through Mongoose due to\n${err}`)
      process.exit()
  }
  else
  console.log("[=>]Connected to `CTF_Challenge_Data`");
})

mongoose.set("useCreateIndex", true);

const CTF_CHALLENGES_Schema = new mongoose.Schema({
  challengeID: {
    type: String,
    required: true,
    unique: true
  },
  challengeTag: {
    type: String,
    required: true,
    unique: true
  },
  submittedBy: {
    type: String,
    required: true,
    unique: true
  },
  challengeType: {
    type: String,
    required: true,
    unique: true
  },
  points: {
    type: Number,
    required: true
  },
  expired: {
    type: Boolean,
    required: true
  },
  solution: {
    type: String,
    required: true
  },
  linkToFile: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("CTF_CHALLENGES_DATA", CTF_CHALLENGES_Schema);
