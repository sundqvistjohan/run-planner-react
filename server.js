const http = require("http");

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

const app = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(activities));
});

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
