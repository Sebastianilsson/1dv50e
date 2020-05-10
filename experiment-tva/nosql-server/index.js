"use strict";

const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("./config/mongoose.js");
const bodyParser = require("body-parser");
const User = require("./models/User");
require("dotenv").config();

const server = express();

server.use(cors());
server.use(helmet());

mongoose.run().catch((error) => {
  console.error(error);
  process.exit(1);
});

server.use(bodyParser.json());

server.post("/register", async (req, res) => {
  try {
    let newUser = new User({
      email: req.body.email,
      password: req.body.password,
    });

    await newUser.save();

    res.send(newUser);
  } catch (e) {
    res.status(500).send("Server error");
  }
});

server.post("/login", async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) res.status(400).send("Invalid email or password");

    let passwordsMatch = await user.comparePassword(req.body.password);
    if (passwordsMatch) {
      res.send({ email: user.email, id: user.uid });
    } else {
      res.status(400).send("Invalid email or password");
    }
  } catch (e) {
    res.status(500).send("Server error");
  }
});

// This server doesn't handle any session or token for the user. If added the could be removed/destroyed here.
server.get("/logout", (req, res) => {
  res.status(204).send();
});

server.listen(3000);
console.log("Listening on port 3000");
console.log("ctrl + c to terminate");
