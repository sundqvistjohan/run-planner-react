const express = require('express')
const app = express()

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

app.get('/', (req, res) => {
  res.send('<h1>Yo worlds!</h1>')
})

app.get('/activities', (req, res) => {
  res.json(activities)
})

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
