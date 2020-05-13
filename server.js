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

app.get("/activities/:id", (request, response, next) => {
  Activity.findById(request.params.id)
    .then((activity) => {
      if (activity) {
        response.json(activity.toJSON());
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.post("/activities", (request, response, next) => {
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
    dateTime: body.dateTime,
  });

  activity
    .save()
    .then((savedActivity) => {
      response.json(savedActivity.toJSON());
    })
    .catch((error) => next(error));
});

app.put("/activities/:id", (request, response, next) => {
  const body = request.body;

  const activity = {
    type: body.type,
    intervals: body.intervals || 1,
    length: body.length,
    dateTime: body.dateTime,
  };

  Activity.findByIdAndUpdate(request.params.id, activity, { new: true })
    .then((updatedActivity) => {
      response.json(updatedActivity.toJSON());
    })
    .catch((error) => next(error));
});

app.delete("/activities/:id", (request, response, next) => {
  Activity.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(400).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "incorrect id format" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
