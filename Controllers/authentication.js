const { StatusCodes } = require("http-status-codes");
const Users = require("../models/User");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const register = async (req, res) => {
  const user = await Users.create(req.body)
  const token = user.createJWT();

  res.status(StatusCodes.CREATED).json({ user, token });
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
  res.status(StatusCodes.OK).json({ user, token });
};

module.exports = { register, login };