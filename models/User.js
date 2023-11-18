const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      minlength: 3,
      maxlength: 50,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: 3,
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
      ],
      unique: true,
    },
    //   image: {
    //     type: String,
    //     required: [true, "Please provide an image"],
    //   },
  },
  { timestamps: true }
)

UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id, name: this.name }, process.env.JWT_PASS, {
    expiresIn: process.env.JWT_EXP,
  });
};

UserSchema.methods.comparePassword = async function (password) {
  const isMatched = await bcrypt.compare(password, this.password);
  return isMatched;
};

module.exports = mongoose.model("Users", UserSchema)
