const { Schema, model } = require("mongoose");
const Joi = require("joi");

const prodListSchema = Schema({
  id: {
    type: Schema.Types.ObjectId,
    ref: "product",
  },
  count: {
    type: Number,
  },
});

const orderSchema = Schema(
  {
    cart: {
      type: [prodListSchema],
      required: [true, "Products are required"],
    },
    totalPrice: {
      type: Number,
      required: [true, "Total price is required"],
    },
    client: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: [true, "Client is required"],
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const Order = model("order", orderSchema);

const orderJoiSchema = Joi.object({
  cart: Joi.array().required(),
  totalPrice: Joi.number().required(),
  completed: Joi.bool(),
});

module.exports = {
  Order,
  orderJoiSchema,
};
