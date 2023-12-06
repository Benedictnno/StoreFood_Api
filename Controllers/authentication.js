const { StatusCodes } = require("http-status-codes");
const Users = require("../models/User");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const register = async (req, res) => {
  console.log('====================================');
  console.log(req.body);
  console.log('====================================');
  const user = await Users.create(req.body)
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({   user: {
      name: user.name,
      email: user.email,
    }, token });
};
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please Provide an email and a password");
  }
  const user = await Users.findOne({ email })
  if (!user) throw new UnauthenticatedError("Invalid email");
  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) throw new UnauthenticatedError("Invalid email");

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user:{ name: user.name,
      email: user.email}, token });
};

module.exports = { register, login };
