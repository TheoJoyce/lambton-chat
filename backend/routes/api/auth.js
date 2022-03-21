const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const authController = require('../../controllers/authController');

// @route   POST api/auth/register
// @desc    Register user
// @access  Public
router.post(
  '/register',
  [
    check('email').isEmail().withMessage('Please enter a valid email address'),
    check('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long'),
    check('firstName').not().isEmpty().withMessage('First name is required'),
    check('lastName').not().isEmpty().withMessage('Last name is required'),
  ],
  authController.register,
);

// @route   POST api/auth/login
// @desc    Login user
// @access  Public
router.post(
  '/login',
  [
    check('email').isEmail().withMessage('Please enter a valid email address'),
    check('password').not().isEmpty().withMessage('Password is required'),
  ],
  authController.login,
);

module.exports = router;
