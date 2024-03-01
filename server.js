const express = require("express");
const app = express();
const passport = require("./auth");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const Person = require("./models/person");
const MenuItem = require("./models/menu");
const db = require("./db");
require("dotenv").config();

//Middleware
const logRequest = (req, res, next) => {
  console.log(
    `[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`
  );
  next();
};

app.use(logRequest);

app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate("local", { session: false });
const personRoutes = require("./routes/personRoutes");
app.use("/person", localAuthMiddleware, personRoutes);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello Utkarsh");
});

app.listen(PORT, () => {
  console.log("listening at port 3000");
});
