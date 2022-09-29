const Joi = require('joi');

const { User } = require('../db/models/user');

const userServices = require('../services/user');

// Function to create User
exports.register = async (req, res) => {
  try {
    const body = req.body;

    // Joi body validation
    const validationSchema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(30).required(),
      firstName: Joi.string().min(2).max(30).required(),
      lastName: Joi.string().min(2).max(30).required()
    });

    await validationSchema.validateAsync(body);

    // Using the service to add User
    const user = await userServices.addUser(body);

    // Using user methods to generate token
    const token = user.generateAuthToken();

    return res.json({
      user,
      token
    });
  } catch (err) {
    return res.status(400).send(err);
  }
};

// Function to Login
exports.login = async (req, res) => {
  try {
    // Check if use exists
    const user = await User.findOne({ email: req.body.email.toLowerCase() });

    // Return error if user doesn't exist
    if (!user) throw new Error({ err: 'No user with this email' });

    // Compare credentials using the service
    const credentials = userServices.comparePassword(req.body.password, user.password);

    // Return error if credentials don't match
    if (!credentials) throw new Error({ err: 'Wrong credentials' });

    // Using user method to generate token
    const token = user.generateAuthToken();

    return res.json({
      user,
      token
    });
  } catch (err) {
    return res.status(400).send(err);
  }
};