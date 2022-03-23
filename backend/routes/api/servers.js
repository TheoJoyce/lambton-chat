const express = require('express');
const router = express.Router();

const { check } = require('express-validator');
const {
  authenticate,
  authErrorHandler,
} = require('../../middleware/authenticate');

const serverController = require('../../controllers/serverController');

// @route   GET api/servers/:id
// @desc    Get server by ID
// @access  Private
router.get(
  '/:id',
  [authenticate, authErrorHandler],
  serverController.getServerbyId,
);

// @route   POST api/servers/create
// @desc    Create server
// @access  Private
router.post(
  '/create',
  [authenticate, authErrorHandler],
  [
    check('name')
      .trim()
      .isLength({ min: 5, max: 64 })
      .withMessage('Name must be between 5 and 64 characters in length')
      .escape(),
    check('user').exists().withMessage('User is required'),
  ],
  serverController.createServer,
);

module.exports = router;
