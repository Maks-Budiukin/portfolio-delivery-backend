const { User } = require("./User");
const { regJoiSchema } = require("./User");
const { loginJoiSchema } = require("./User");
const { Product } = require("./Product");
const { productJoiSchema } = require("./Product");
const { Order } = require("./Order");
const { orderJoiSchema } = require("./Order");
const { Shop } = require("./Shop");
const { shopJoiSchema } = require("./Shop");

module.exports = {
  User,
  regJoiSchema,
  loginJoiSchema,
  Product,
  productJoiSchema,
  Order,
  orderJoiSchema,
  Shop,
  shopJoiSchema,
};
