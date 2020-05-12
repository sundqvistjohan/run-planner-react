const express = require("express");
const app = express();
const Activity = require("./src/models/activity");

const cors = require("cors");

app.use(cors());

app.use(express.json());

app.get("/", (request, response) => {
  response.send("<h1>Yo worlds!</h1>");
});

app.get("/activities", (request, response) => {
  Activity.find({}).then((activities) => {
    response.json(activities.map((activity) => activity.toJSON()));
  });
});

app.get("/activities/:id", (request, response) => {
  Activity.findById(request.params.id)
    .then((activity) => {
      if (activity) {
        response.json(activity.toJSON());
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => {
      console.log(error);
      response.status(400).send({ error: 'incorrect id format'})
    });
});

app.post("/activities", (request, response) => {
  const body = request.body;

  if (!body.type || !body.length) {
    return response.status(400).json({
      error: "Missing param(s)",
    });
  }

  const activity = new Activity({
    type: body.type,
    intervals: body.intervals || 1,
    length: body.length,
    date: new Date(),
  });

  activity.save().then((savedActivity) => {
    response.json(savedActivity.toJSON());
  });
});

app.delete("/activities/:id", (request, response) => {
  const id = parseInt(request.params.id);
  activities = activities.filter((activity) => activity.id !== id);

  response.status(204).end();
});

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
