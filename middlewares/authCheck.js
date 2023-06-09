const { User } = require("../models/User");
const jwt = require("jsonwebtoken");
const { catchAsync } = require("../services");
const { Unauthorized } = require("http-errors");
const dotenv = require("dotenv");
dotenv.config();

const { JWT_SECRET } = process.env;

const authCheck = catchAsync(async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    next(Unauthorized("Not authorized"));
  }

  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    return Unauthorized("Not authorized");
  }

  if (!token) {
    next(Unauthorized("Not authorized"));
  }

  let decodedToken;

  try {
    decodedToken = jwt.verify(token, JWT_SECRET);
  } catch (error) {
    next(Unauthorized("Not authorized"));
  }

  const user = await User.findById(decodedToken.id);

  if (!user) {
    next(Unauthorized("Not authorized"));
  }

  req.user = user;

  next();
});

module.exports = {
  authCheck,
};
