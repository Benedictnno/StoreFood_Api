const express = require("express");
const { getAllFood, createFood, deleteFood, updateFood } = require("../Controllers/storedFood");
const router = express.Router();

router.route("/").get(getAllFood).post(createFood)
router.route("/:id").delete(deleteFood).patch(updateFood);

module.exports = router;
