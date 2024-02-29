const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const Person = require("./models/person");
const MenuItem = require("./models/menu");
const db = require("./db");
require("dotenv").config();

const personRoutes = require("./routes/personRoutes");
app.use("/person", personRoutes);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello Utkarsh");
});

app.listen(PORT, () => {
  console.log("listening at port 3000");
});
