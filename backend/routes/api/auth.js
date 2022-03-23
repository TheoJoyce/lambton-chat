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
    check('email').trim().isEmail().withMessage('Please enter a valid email address').normalizeEmail(),
    check('password')
      .trim()
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long'),
    check('firstName').trim().not().isEmpty().withMessage('First name is required'),
    check('lastName').trim().not().isEmpty().withMessage('Last name is required'),
  ],
  authController.register,
);

// @route   POST api/auth/login
// @desc    Login user
// @access  Public
router.post(
  '/login',
  [
    check('email').trim().isEmail().withMessage('Please enter a valid email address').normalizeEmail(),
    check('password').trim().not().isEmpty().withMessage('Password is required'),
  ],
  authController.login,
);

// @route   POST api/auth/verify
// @desc    Verify user
// @access  Public
router.post('/verify', authController.verify);

module.exports = router;
