const express = require("express");
const cors = require('cors')
const app = express();

app.use(cors())
app.use(express.json());

let activities = [
  {
    id: 1,
    type: "distance",
    intervals: 1,
    length: 12,
    date: "2020-04-15T16:30:00.000Z",
  },
  {
    id: 2,
    type: "interval",
    intervals: 8,
    length: 1,
    date: "2020-04-16T16:30:00.000Z",
  },
  {
    id: 3,
    type: "threshhold",
    intervals: 1,
    length: 8,
    date: "2020-04-16T16:30:00.000Z",
  },
];

app.get("/", (request, response) => {
  response.send("<h1>Yo worlds!</h1>");
});

app.get("/activities", (request, response) => {
  response.json(activities);
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
  const body = request.body
  
  if (!body.type || !body.length) {
    return response.status(400).json({
      error: "Missing param(s)"
    })
  }

  const activity = {
    type: body.type,
    intervals: body.intervals || 1,
    length: body.length,
    date: new Date(),
    id: generateId()
  }

  activities = activities.concat(activity);
  response.json(activity);
});

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
