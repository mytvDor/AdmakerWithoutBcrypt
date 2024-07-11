const { default: mongoose } = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const userschema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  uid: {
    type: String,
    default: uuidv4,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  gettingServices: {
    type: [String],
    default: [],
  },
  providedServices: {
    type: [String],
    default: [],
  },
});

const myuser = mongoose.model("users", userschema);

module.exports = { myuser };
