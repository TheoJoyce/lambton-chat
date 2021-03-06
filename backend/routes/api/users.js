const express = require('express');
const router = express.Router();

const { check } = require('express-validator');

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

// @route   GET api/users/all/:server_id
// @desc    Get user by server ID
// @access  Private
router.get(
  '/all/:serverID',
  [authenticate, authErrorHandler],
  userController.getUsersByServerId,
);

// @route   POST api/users/update
// @desc    Update user
// @access  Private
router.post(
  '/update',
  [authenticate, authErrorHandler],
  [
    check('firstName').optional().trim().escape(),
    check('lastName').optional().trim().escape(),
    check('email').optional().isEmail().withMessage('Invalid email address'),
    check('title').optional().trim().escape(),
    check('serverID').optional().isMongoId().withMessage('Invalid server ID'),
  ],
  userController.updateUser,
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
      .withMessage('Password must be at least 8 characters long')
      .escape(),
    check('firstName')
      .trim()
      .not()
      .isEmpty()
      .withMessage('First name is required')
      .escape(),
    check('lastName')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Last name is required')
      .escape(),
    check('title').optional().trim().isLength({ max: 40 }).escape(),
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
