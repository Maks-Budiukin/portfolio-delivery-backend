const { User } = require("../../models");
const { catchAsync } = require("../../services");
const { NotFound } = require("http-errors");

const current = catchAsync(async (req, res, next) => {
  const { _id } = req.user;
  console.log(_id);

  const user = await User.findById(_id).select(
    "-password -updatedAt -createdAt"
  );

  if (!user?.registered) {
    next(NotFound("User not found"));
  }

  console.log(user);

  res.status(200).json({
    user,
  });
});

module.exports = current;
