const { User } = require("../../models");
const { NotFound } = require("http-errors");
const { catchAsync } = require("../../services");

const logout = catchAsync(async (req, res, next) => {
  const { _id } = req.user;

  const updatedUser = await User.findByIdAndUpdate(_id, { token: null });

  if (!updatedUser) {
    return NotFound();
  }

  res.status(204).json({ message: "User logged out!" });
});

module.exports = logout;