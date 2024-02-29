const mongoose = require("mongoose");
require("dotenv").config();
//mongodb connection url

const URL = process.env.DB_URL;

//set up mongodb
mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("connected", () => {
  console.log("Connected to Mongodb Server");
});
db.on("error", (err) => {
  console.error("Connected to Mongodb Server", err);
});
db.on("disconnected", () => {
  console.log("Mongodb disconnected");
});

module.exports = db;
