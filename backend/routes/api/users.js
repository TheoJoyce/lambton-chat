const express = require('express');
const router = express.Router();

const {
  authenticate,
  authErrorHandler,
} = require('../../middleware/authenticate');

const userController = require('../../controllers/userController');

// @route   GET api/users/:id
// @desc    Get user by ID
// @access  Private
router.get(
  '/:id',
  [authenticate, authErrorHandler],
  userController.getUserbyId,
);

// @route   GET api/users/:server_id
// @desc    Get user by server ID
// @access  Private
router.get(
  '/:server_id',
  [authenticate, authErrorHandler],
  userController.getUserbyServerId,
);

// @route   POST api/auth/register
// @desc    Register user
// @access  Public
router.post(
  '/auth/register',
  [
    check('email')
      .trim()
      .isEmail()
      .withMessage('Please enter a valid email address')
      .normalizeEmail(),
    check('password')
      .trim()
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long'),
    check('firstName')
      .trim()
      .not()
      .isEmpty()
      .withMessage('First name is required'),
    check('lastName')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Last name is required'),
  ],
  userController.register,
);

// @route   POST api/auth/login
// @desc    Login user
// @access  Public
router.post(
  '/auth/login',
  [
    check('email')
      .trim()
      .isEmail()
      .withMessage('Please enter a valid email address')
      .normalizeEmail(),
    check('password')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Password is required'),
  ],
  userController.login,
);

// @route   POST api/auth/verify
// @desc    Verify user
// @access  Public
router.post('/auth/verify', userController.verify);

module.exports = router;
