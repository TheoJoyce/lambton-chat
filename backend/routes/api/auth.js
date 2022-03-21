const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const authController = require('../../controllers/authController');

// @route   POST api/auth/register
// @desc    Register user
// @access  Public
router.post(
  '/register',
  body('email').isEmail().withMessage('Please enter a valid email address'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
  body('firstName').not().isEmpty().withMessage('First name is required'),
  body('lastName').not().isEmpty().withMessage('Last name is required'),
  authController.register,
);

// @route   POST api/auth/login
// @desc    Login user
// @access  Public
router.post(
  '/login',
  body('email').isEmail().withMessage('Please enter a valid email address'),
  body('password').not().isEmpty().withMessage('Password is required'),
  authController.login,
);
