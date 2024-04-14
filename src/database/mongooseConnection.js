const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

require("dotenv").config();

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MD_CONNECTION, {
      serverSelectionTimeoutMS: 15000,
    });

    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB", err);
    process.exit(1);
  }
};

connectToMongoDB();

module.exports = connectToMongoDB;
