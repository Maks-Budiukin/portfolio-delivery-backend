const { Product, User, Order } = require("../../models");
const { catchAsync } = require("../../services");
const { BadRequest } = require("http-errors");

const add = catchAsync(async (req, res, next) => {
  const { cart, user, total } = req.body;

  let totalPrice = 0;

  const getTotalPrice = async () => {
    let rawTotalPrice = 0;

    for (const item of cart) {
      const product = await Product.findById(item.id);
      rawTotalPrice += product.price * item.count;
    }
    totalPrice = parseFloat(rawTotalPrice.toFixed(2));
  };
  await getTotalPrice();

  if (totalPrice !== total) {
    return next(BadRequest("WRONG SUM"));
  }

  const existUser = await User.findOneAndUpdate(
    { email: user.email },
    {
      email: user.email,
      name: user.name,
      phone: user.number,
      address: user.address,
    },
    {
      upsert: true,
      new: true,
    }
  );

  const order = await Order.create({
    cart,
    totalPrice,
    client: existUser._id,
  });

  res.status(201).json({
    order,
  });
});

module.exports = add;
