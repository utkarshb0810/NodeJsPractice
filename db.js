const mongoose = require("mongoose");

//mongodb onnection url

const URL = "mongodb+srv://utkarshbarnawal8:mern@cluster0.momqw6l.mongodb.net/mern_admin?retryWrites=true&w=majority";

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