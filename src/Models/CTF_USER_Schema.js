const mongoose = require("mongoose");

const { mongoDB_User_Url }  = require("../config.json");

mongoose.connect(mongoDB_User_Url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}, (err, conn) => {
  if(err) {
      console.error(`[=>]Could not connect to MongoDB CTF_USER_SCHEMA through Mongoose due to\n${err}`)
      process.exit()
  }
  else
  console.log("[=>]Connected to `CTF_User_Data`");
})


const CTF_USER_Schema = new mongoose.Schema({
    userID: {
        type: String,
        required: [
            true, 'An user ID is required!'
        ],
        unique: [true, 'An user ID is required to be unique!']
    },
    userTag: {
        type: String,
        required: [
            true, 'An user tag is required!'
        ],
        unique: [true, 'An user ID is required to be unique!']
    },
    points: {
        type: Number,
        required: true,
        default: 0
    },
    challengesSolved: {
        type: Array,
        required: false,
        default: []
    }
});
module.exports = mongoose.model('CTF_USER_DATA', CTF_USER_Schema);
