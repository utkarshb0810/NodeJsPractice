const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const Person = require("./models/person");
const MenuItem = require("./models/menu");
const db = require("./db");
const personRoutes = require('./routes/personRoutes');
app.use('/person',personRoutes);

app.get("/", (req, res) => {
  res.send("Hello Utkarsh");
});

  

app.listen(3000, () => {
  console.log("listening at port 3000");
});
