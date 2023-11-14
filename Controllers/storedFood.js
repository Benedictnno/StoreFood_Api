const { NotFoundError } = require("../errors");
const storedFood = require("../models/Foods");

const getAllFood = (req, res) => {
  res.send(req.user);
};
const createFood = async (req, res) => {
  const meal = await storedFood.create(req.body);
  res.status(200).json(meal);
};


const deleteFood = async (req, res) => {
  const {
    user: { userId },
    params: { id },
  } = req;
console.log(id);
  const meal = await storedFood.findOneAndRemove({ _id: id });
  if (!meal) {
    throw new NotFoundError("Meal Not Found");
  }
  res.status(200);
};

const updateFood = (req, res) => {
  res.send(req.params);
};

module.exports = { deleteFood, updateFood, getAllFood, createFood };
