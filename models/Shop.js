const { Schema, model } = require("mongoose");
const Joi = require("joi");

const shopSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    logo: {
      type: String,
      required: [true, "Email is required"],
    },
  },
  { versionKey: false }
);

const Shop = model("shop", shopSchema);

const shopJoiSchema = Joi.object({
  name: Joi.string(),
  logo: Joi.string(),
});

module.exports = {
  Shop,
  shopJoiSchema,
};
