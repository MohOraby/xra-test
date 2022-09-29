const bcrypt = require('bcryptjs');

const { User } = require('../db/models/user');

const salt = bcrypt.genSaltSync(parseInt(process.env.BCRYPT_SALT));

// Add user using mongoose create method
exports.addUser = async (data) => {
  try {
    const userData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email.toLowerCase(),
      password: bcrypt.hashSync(data.password, salt)
    };

    const user = await User.create(userData);

    return user;
  } catch (err) {
    throw err;
  }
};

// Compare user password and body password
exports.comparePassword = (bodyPassword, userPassword) => {
  try {
    return bcrypt.compareSync(bodyPassword, userPassword);
  } catch (err) {
    throw err;
  }
};