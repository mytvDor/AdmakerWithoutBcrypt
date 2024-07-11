const { default: mongoose } = require("mongoose");
// const { v4: uuidv4 } = require("uuid");

const userschema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  img: {
    type: String,
    required: true,
  },
  price: {
    type: String,

    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  servId: {
    type: String,
    unique: true,
  },
  time: {
    type: Date,
    default: Date.now(),
  },
  uid: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
  },
});

const myproduct = mongoose.model("services", userschema);

module.exports = { myproduct };
