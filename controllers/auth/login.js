const { User, loginJoiSchema } = require("../../models");
const { Unauthorized, BadRequest } = require("http-errors");
const { catchAsync } = require("../../services");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");
dotenv.config();

const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const { error } = loginJoiSchema.validate(req.body);
  if (error) {
    next(BadRequest(error.message));
  }

  const existUser = await User.findOne({ email }).select(
    "+password -updatedAt -createdAt -token"
  );

  if (!existUser || !existUser?.registered) {
    next(Unauthorized("Email or password is wrong"));
  }

  const validPassword = await bcrypt.compare(password, existUser.password);

  if (!validPassword) {
    next(Unauthorized("Email or password is wrong"));
  }

  const payload = {
    id: existUser.id,
  };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

  const user = await User.findByIdAndUpdate(
    existUser._id,
    { token },
    {
      new: true,
    }
  ).select("-password -registered -updatedAt -createdAt");

  res.json({
    user,
  });
});

module.exports = login;
