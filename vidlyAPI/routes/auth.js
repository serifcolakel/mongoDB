const Joi = require("joi");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User } = require("../models/user");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  // console.log(error);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });

  if (!user) return res.status(400).send("Invalid email or password.");

  // req.body.password ile user.password'u karşılaştıracak
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  // console.log("body-password:", req.body.password);
  // console.log("user-password:", user.password);
  // console.log("compare result:", validPassword);
  if (!validPassword) return res.status(400).send("Invalid email or password.");
  // PowerShell'de $env:vidly_jwtPrivateKey="keygir" ile öncesinde env veriables set edilmelidir.
  const token = user.generateAuthToken();
  res.send(token);
});

// Information Expert Principle

function validate(req) {
  const schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  };

  return Joi.validate(req, schema);
}

module.exports = router;
