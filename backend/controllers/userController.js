const { validationResult } = require('express-validator');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const jwt = require('jsonwebtoken');

const User = require('../models/User');

const makeError = require('../helpers/makeError');

const getUserbyId = (req, res) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    User.findById(req.params.id)
      .then((user) => {
        if (!user) {
          return res.status(404).json({
            message: 'User not found',
          });
        }

        return res.status(200).json(user);
      })
      .catch((err) => {
        return res.status(500).json(err);
      });
  } else {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
};

const getUsersByServerId = (req, res) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    User.find({ server: req.params.serverID })
      .then((users) => {
        if (!users) {
          return res.status(404).json({
            message: 'Users not found',
          });
        }

        return res.status(200).json(users);
      })
      .catch((err) => {
        return res.status(500).json(err);
      });
  } else {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
};

const register = (req, res) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    const { email, password, firstName, lastName } = req.body;
    const title = req.body.title || undefined;

    User.exists({ email }, (err, exists) => {
      if (exists) {
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
            const commonUser = {
              email,
              firstName,
              lastName,
              title,
            };

            const user = new User({
              password: hash,
              ...commonUser,
            });

            user.save((err, user) => {
              if (err) {
                res.status(500).json({
                  errors: makeError('user', 'Error saving user'),
                });
              } else {
                res.status(201).json({
                  msg: 'User created',
                  user: {
                    id: user._id,
                    ...commonUser,
                  },
                });
              }
            });
          }
        });
      }
    });
  } else {
    res.status(400).json({
      errors: errors.array(),
    });
  }
};

const createJWT = (user) => {
  const { _id, firstName, lastName, email, title, server } = user;

  const token = jwt.sign(
    {
      id: _id,
      firstName,
      lastName,
      email,
      title,
      server,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '7d',
    },
  );

  return token;
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
              const token = createJWT(user);

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

const updateUser = (req, res) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    const oldUser = req.user;

    const firstName = req.body.firstName || oldUser.firstName;
    const lastName = req.body.lastName || oldUser.lastName;
    const email = req.body.email || oldUser.email;
    const title = req.body.title || oldUser.title;
    const server = req.body.serverID || oldUser.server;

    User.findByIdAndUpdate(oldUser.id, {
      firstName,
      lastName,
      email,
      title,
      server,
    })
      .then((user) => {
        if (!user) {
          return res.status(404).json({
            msg: 'User not found',
          });
        }

        return res
          .status(200)
          .json({ user, token: createJWT({ ...user._doc, server }) });
      })
      .catch((err) => {
        return res.status(500).json(err);
      });
  } else {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
};

module.exports = {
  getUserbyId,
  getUsersByServerId,
  register,
  login,
  verify,
  updateUser,
};
