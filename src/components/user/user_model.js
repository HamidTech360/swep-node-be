const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const config = require("../../config");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },

  lastName: {
    type: String,
    trim: true,
  },

  registrationNumber: {
    type: String,
    trim: true,
    unique: true,
    index: true,
  },

  password: {
    type: String,
    trim: true,
    required: true,
    minlength: 6,
  },
});

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  return _.omit(user, ["password", "__v"]);
};

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isNew) {
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
    return next();
  }

  next();
});

userSchema.methods.comparePassword = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

userSchema.methods.generateToken = function () {
  const user = this;
  const payload = {
    matricNo: user.matricNumber,
    firstName: user.firstName,
    lastName: user.lastName,
    regNo: user.registrationNumber,
  };
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      config.JWT_SECRET,
      {
        // expiresIn: '600000'
        expiresIn: "1800000",
      },
      (err, token) => {
        if (err) {
          return reject(err);
        }
        user.save();
        return resolve({ accessToken: token });
      }
    );
  });
};

module.exports = mongoose.model("User", userSchema);
