const mongoose = require("mongoose");

const storedFoodSchema = mongoose.Schema(
  {
    idMeal: {
      type: String,
      required: [true, "Please provide a name"],
      minlength: 3,
      maxlength: 50,
    },
    strMeal: {
      type: String,
      required: [true, "Please provide the meals name"],
    },
    strCategory: {
      type: String,
      required: [true, "Please provide a category"],
    },
    strArea: {
      type: String,
      required: [true, "Please provide "],
    },
    strMealThumb: {
      type: String,
      required: [true, "Please provide an image"],
    },
    type: {
      type: String,
      required: [true, "Please provide a type"],
      enum: ["meal", "drink"],
      default: "meal",
    },
    note: {
      type: String,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
      required: [true, "Please Provide a valid user id"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("storedMeals", storedFoodSchema);
