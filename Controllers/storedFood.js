const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../errors");
const storedFood = require("../models/Foods");

const getAllFood = async (req, res) => {
  const {
    user: { userId },
  } = req;
  const meals = await storedFood.find({ createdBy: userId });
  res.status(StatusCodes.OK).json({ meals, counts: meals.length });
};
const createFood = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const meal = await storedFood.create(req.body);
  res.status(StatusCodes.OK).json(meal);
};

const deleteFood = async (req, res) => {
  const {
    user: { userId },
    params: { id },
  } = req;

  const meal = await storedFood.findOneAndRemove({
    _id: id,
    createdBy: userId,
  });
  if (!meal) {
    throw new NotFoundError("Meal Not Found");
  }
  res.status(200);
};

const updateFood = async (req, res) => {
  const {
    user: { userId },
    params: { id: mealId },
    body: { note },
  } = req;

  if (!note)
    throw new BadRequestError("Please Fill up the company and position field");
  const meal = await storedFood.findOneAndUpdate(
    { _id: mealId, createdBy: userId },
    { note },
    { new: true, runValidators: true }
  );

  if (!meal) {
    throw new NotFoundError("job Not Found");
  }
  res.status(StatusCodes.OK).json(meal)
};

module.exports = { deleteFood, updateFood, getAllFood, createFood };
