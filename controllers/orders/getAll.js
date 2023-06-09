const { Order } = require("../../models");
const { catchAsync } = require("../../services");

const getAll = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const orders = await Order.find({ client: id }).populate({
    path: "cart",
    populate: {
      path: "id",
      model: "product",
    },
  });

  res.json({
    orders,
  });
});

module.exports = getAll;
