const { User } = require('./../db/models/user');

// Middleware to check if user is logged in
const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.token;
    // Using user method to check token token
    const user = await User.findByToken(token);

    // If user doesn't exist (not logged in) return error
    if (!user) throw new Error('User not found.');

    // Set the current user to the user found by token
    req.user = user;

    next();
  } catch (err) {
    return res.status(401).send('Unauthenticated');
  }
};

module.exports = { authenticate };