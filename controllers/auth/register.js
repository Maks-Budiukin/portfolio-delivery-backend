const { Conflict, BadRequest, NotFound } = require("http-errors");
const bcrypt = require("bcryptjs");
const { User, regJoiSchema } = require("../../models");
const { catchAsync } = require("../../services");

const register = catchAsync(async (req, res, next) => {
  const { email, password, name, phone, address } = req.body;

  const { error } = regJoiSchema.validate(req.body);
  if (error) {
    next(BadRequest(error.message));
  }

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  const user = await User.findOne({ email });

  if (user?.registered) {
    next(Conflict("Email is already in use"));
  }

  const newUser = await User.findOneAndUpdate(
    { email },
    {
      password: hashPassword,
      email,
      name,
      phone,
      address,
      registered: true,
    },
    {
      upsert: true,
      new: true,
    }
  );

  if (!newUser) {
    NotFound();
  }

  res.status(201).json({ message: "User created" });
});

module.exports = register;
