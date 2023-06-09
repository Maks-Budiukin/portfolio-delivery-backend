const { Product } = require("../../models");
const { catchAsync } = require("../../services");

const getByShop = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const products = await Product.find({ shop: id })

  res.json({
    products,
  });
});

module.exports = getByShop;
