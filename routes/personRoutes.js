const express = require("express");
const router = express.Router();
const Person = require("../models/person");
const { jwtAuthMiddleware, generateToken } = require("../jwt");
router.post("/signup", async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);
    const response = await newPerson.save();
    console.log("data saved");

    //we are adding token here
    const payload = {
      id: response.id,
      username: response.username,
    };
    console.log(JSON.stringify(payload));
    const token = generateToken(payload);
    console.log("Token is: ", token);

    res.status(200).json({ response: response, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

//login route
router.post("/login", async (req, res) => {
  try {
    //extract username and password from req body
    const { username, password } = req.body;

    //find the user by username
    const user = await Person.findOne({ username: username });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid Username or Password" });
    }

    //now generate token
    const payload = {
      id: user.id,
      username: user.username,
    };
    const token = generateToken(payload);

    //return token as response
    res.json({ "Token ": token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Profile Route
router.get("/profile", jwtAuthMiddleware, async (req, res) => {
  try {
    const userData = req.user;
    console.log(userData);

    const userId = userData.id;
    const user = await Person.findById(userId);

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Get Method to get the person

router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("data Fetched");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const updatedPersonData = req.body;
    const response = await Person.findByIdAndUpdate(
      personId,
      updatedPersonData,
      {
        new: true, // return the updated document
        runValidators: true,
      }
    );
    if (!response) {
      return res.status(404).json({
        error: "Person not found",
      });
    }
    console.log("data updated");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const response = await Person.findByIdAndDelete(personId);
    if (!response) {
      return res.status(404).json({
        error: "Person not found",
      });
    }
    console.log("data deleted");
    res.status(200).json({ message: "Person deleted SuccessFully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

router.get("/:variableWork", async (req, res) => {
  try {
    const variableWork = req.params.variableWork;
    if (
      variableWork == "chef" ||
      variableWork == "manager" ||
      variableWork == "waiter"
    ) {
      const response = await Person.find({ work: variableWork });
      console.log("response fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({
        error: "Invalid work Type",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

module.exports = router;
