const express = require("express");
const router = express.Router();
const Person = require("../models/person");

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);
    const response = await newPerson.save();
    console.log("data saved");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal Server Error",
    });
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
    console.log('data deleted');
    res.status(200).json({message:"Person deleted SuccessFully"})

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
