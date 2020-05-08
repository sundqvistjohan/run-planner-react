require("dotenv").config();
const mongoose = require("mongoose");

const url = process.env.REACT_APP_MONGO_URI;

console.log("connecting to", url);

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const activitySchema = new mongoose.Schema({
  type: String,
  intervals: Number,
  length: Number,
  date: Date,
});

activitySchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Activity", activitySchema);
