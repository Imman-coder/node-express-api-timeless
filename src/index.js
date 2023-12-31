const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

const app = express();

const routes = require("./routes/timetableRoutes");

app.use(express.json());

app.use("/api", routes);

app.get('/', (req, res) => {
  res.send('Hey this is my API running 🥳')
})


app.listen(3000, () => {
  console.log(`Server Started at ${3000}`);
});
