const { Schema, model } = require("mongoose");
const Joi = require("joi");

const userSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
    },
    address: {
      type: String,
      default: "",
    },
    registered: {
      type: Boolean,
      default: false,
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

const User = model("user", userSchema);

const regJoiSchema = Joi.object({
  name: Joi.string().max(16).required(),
  email: Joi.string().required().email(),
  phone: Joi.string().required(),
  password: Joi.string().min(6).max(30).required(),
  address: Joi.string().allow('', null),
});

const loginJoiSchema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().min(6).max(30).required(),
});

module.exports = {
  User,
  regJoiSchema,
  loginJoiSchema,
};
