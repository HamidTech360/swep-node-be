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

  email: {
    type: String,
    trim: true,
    unique: true,
    required: true
  },

  registrationNumber: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    index: true,
  },

  password: {
    type: String,
    trim: true,
    required: true,
    minlength: 6,
  },

  role: {
    type: String,
    default: 'user',
    enum: ['doctor', 'user', 'admin' ]
  },

  health_center_id: {
    type: String,
    trim: true,
    default: ''
  }

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
    email: user.email,
    matricNo: user.matricNumber,
    firstName: user.firstName,
    lastName: user.lastName,
    regNo: user.registrationNumber,
    userId: user._id,
    role: user.role
  };
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      config.JWT_SECRET,
      {
        // expiresIn: '600000'
        expiresIn: "180000000",
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
