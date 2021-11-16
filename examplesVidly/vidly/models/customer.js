const Joi = require("joi");
const mongoose = require("mongoose");

const Customer = mongoose.model(
  "Customer",
  new mongoose.Schema({
    name: { type: String, required: true, maxlength: 55, minlength: 5 },
    isVIP: { type: Boolean, default: false },
    phone: { type: String, required: true, maxlength: 55, minlength: 5 },
  })
);

function validateCustomer(customer) {
  const schema = {
    name: Joi.string().min(3).max(50).required(),
    isVIP: Joi.boolean(),
    phone: Joi.string().min(3).max(50).required(),
  };

  return Joi.validate(customer, schema);
}

exports.Customer = Customer;
exports.validate = validateCustomer;
