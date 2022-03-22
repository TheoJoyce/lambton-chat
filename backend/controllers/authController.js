const { validationResult } = require('express-validator');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const jwt = require('jsonwebtoken');

const User = require('../models/User');

const makeError = (param, msg) => [{ param, msg }];

const register = (req, res) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
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
  } else {
    res.status(400).json({
      errors: errors.array(),
    });
  }
};

const login = (req, res) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    const { email, password } = req.body;

    User.findOne({ email })
      .then((user) => {
        if (!user) {
          res.status(400).json({
            errors: makeError('email', 'Email not found'),
          });
        } else {
          bcrypt.compare(password, user.password).then((isMatch) => {
            if (isMatch) {
              const { _id, firstName, lastName, email, title } = user;

              const token = jwt.sign(
                { id: _id, firstName, lastName, email, title },
                process.env.JWT_SECRET,
                {
                  expiresIn: '7d',
                },
              );

              res.status(200).json({ token, msg: 'Logged in' });
            } else {
              res.status(400).json({
                errors: makeError('password', 'Password incorrect'),
              });
            }
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          errors: makeError('user', err),
        });
      });
  } else {
    res.status(400).json({
      errors: errors.array(),
    });
  }
};

const verify = (req, res) => {
  const { token } = req.body;

  if (!token) {
    res.status(400).json({
      errors: makeError('token', 'Token is required'),
    });
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(500).json({
          errors: makeError('token', 'Invalid token'),
        });
      } else {
        res.status(200).json({
          msg: 'Token verified',
          user: decoded,
        });
      }
    });
  }
};

module.exports = {
  register,
  login,
  verify,
};
