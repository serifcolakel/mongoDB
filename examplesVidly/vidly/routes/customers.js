const Joi = require("joi");

const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const Customer = mongoose.model(
  "Customer",
  new mongoose.Schema({
    name: { type: String, required: true, maxlength: 55, minlength: 5 },
    isVIP: { type: Boolean, default: false },
    phone: { type: String, required: true, maxlength: 55, minlength: 5 },
  })
);

router.get("/", async (req, res) => {
  const customers = await Customer.find().sort("name");

  res.send(customers);
});

router.post("/", async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let customer = new Customer({
    name: req.body.name,
    isVIP: req.body.isVIP,
    phone: req.body.phone,
  });
  customer = await customer.save();

  res.send(customer);
});

router.put("/:id", async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );

  if (!customer)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");

  res.send(customer);
});

router.delete("/:id", async (req, res) => {
  const customer = await customer.findByIdAndRemove(req.params.id);
  if (!customer)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");
  res.send(customer);
});

router.get("/:id", async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");
  res.send(customer);
});

function validateCustomer(customer) {
  const schema = {
    name: Joi.string().min(3).max(50).required(),
    isVIP: Joi.boolean(),
    phone: Joi.string().min(3).max(50).required(),
  };

  return Joi.validate(customer, schema);
}

module.exports = router;
