const mongoose = require("mongoose");
const db = "mongodb://localhost/mern_gradient";

const connectDB = async () => {
  try {
    await mongoose.connect(db);
    console.log("connect successfull")
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;