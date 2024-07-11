const { default: mongoose } = require("mongoose");

const connectDb = (url) => {
  return mongoose
    .connect(url)
    .then(() => {
      console.log("db conected");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectDb;
