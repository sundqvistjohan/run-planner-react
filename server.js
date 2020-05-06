const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

app.use(cors());
app.use(express.json());

const url = `mongodb+srv://sundq:${process.env.REACT_APP_MONGO_DB_PASSWORD}@runplanner-yrvwi.mongodb.net/test?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const activitySchema = new mongoose.Schema({
  type: String,
  intervals: Number,
  length: Number,
  date: Date,
});

const Activity = mongoose.model("Activity", acti);

app.get("/", (request, response) => {
  response.send("<h1>Yo worlds!</h1>");
});

app.get("/activities", (request, response) => {
  Activity.find({}).then((activities) => {
    response.json(activities);
  });
});

app.get("/activities/:id", (request, response) => {
  const id = parseInt(request.params.id);
  const activity = activities.find((activity) => activity.id === id);

  if (activity) {
    response.json(activity);
  } else {
    response.status(400).end();
  }
});

app.delete("/activities/:id", (request, response) => {
  const id = parseInt(request.params.id);
  activities = activities.filter((activity) => activity.id !== id);

  response.status(204).end();
});

const generateId = () => {
  const maxId =
    activities.length > 0 ? Math.max(...activities.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.post("/activities", (request, response) => {
  const body = request.body;

  if (!body.type || !body.length) {
    return response.status(400).json({
      error: "Missing param(s)",
    });
  }

  const activity = {
    type: body.type,
    intervals: body.intervals || 1,
    length: body.length,
    date: new Date(),
    id: generateId(),
  };

  activities = activities.concat(activity);
  response.json(activity);
});

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
