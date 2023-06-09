const { Shop } = require("../../models");
const { catchAsync } = require("../../services");

const getAll = catchAsync(async (req, res, next) => {
  const shops = await Shop.find();

  res.json({
    shops,
  });
});

module.exports = getAll;
