const bcrypt = require('bcrypt');
const saltRounds = 10;

const jwt = require('jsonwebtoken');

const User = require('../models/User');

const makeError = (param, msg) => [{ param, msg }];

const register = (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  if (User.findOne({ email })) {
    res.status(400).json({
      errors: makeError('email', 'Email already exists'),
    });
  } else {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        res.status(500).json({
          errors: makeError('password', 'Error hashing password'),
        });
      } else {
        const user = new User({
          email,
          password: hash,
          firstName,
          lastName,
        });

        user.save((err, user) => {
          if (err) {
            res.status(500).json({
              errors: makeError('user', 'Error saving user'),
            });
          } else {
            res.status(201).json({
              msg: 'User created',
              user,
            });
          }
        });
      }
    });
  }
};

const login = (req, res) => {};

const verify = (req, res) => {};

module.exports = {
  register,
  login,
  verify,
};
