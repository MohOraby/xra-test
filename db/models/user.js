const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      validate: {
        validator: (value) => {
          return validator.isEmail(value);
        },
        message: '{VALUE} is not a valid email!'
      }

    },
    password: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

userSchema.methods.generateAuthToken = function () {
  const user = this;
  const access = 'userEmail';
  const token = jwt.sign({ email: (user.email), access }, process.env.JWT_SECRET).toString();
  return token;
};

userSchema.statics.findByToken = function (token) {
  const user = this;
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return Promise.reject();
  }
  if (decoded.access === 'userEmail') {
    return user.findOne({ email: decoded.email });
  } else {
    return Promise.reject();
  }
};

const User = mongoose.model('User', userSchema);

module.exports = { User };