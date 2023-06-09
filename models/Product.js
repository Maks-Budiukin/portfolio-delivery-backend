const { Schema, model } = require("mongoose");
const Joi = require("joi");

const productSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      unique: true,
    },
    shop: {
      type: Schema.Types.ObjectId,
      ref: "shop",
      required: [true, "Shop is required"],
    },
    img: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
  },
  { versionKey: false, timestamps: true }
);

const Product = model("product", productSchema);

const productJoiSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  img: Joi.string(),
  description: Joi.string(),
});

module.exports = {
  Product,
  productJoiSchema,
};
