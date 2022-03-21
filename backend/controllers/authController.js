const bcrypt = require('bcrypt');
const saltRounds = 10;

const jwt = require('jsonwebtoken');

const User = require('../models/User');

const validateUser = (req, res) => {
  const user = req.body;
  let errors = [];

  return errors;
};

const register = (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  let errors = validateUser(req.body);

  if (errors.length > 0) {
    res.status(400).json({
      errors,
    });
  } else {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        res.status(500).json({
          error: err,
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
              error: err,
            });
          } else {
            res.status(201).json({
              message: 'User created',
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
