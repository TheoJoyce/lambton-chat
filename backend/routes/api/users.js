const express = require('express');
const router = express.Router();

const {
  authenticate,
  authErrorHandler,
} = require('../../middleware/authenticate');

const userController = require('../../controllers/userController');

// @route   POST api/users/:id
// @desc    Get user by ID
// @access  Private
router.get(
    '/:id',
    [authenticate, authErrorHandler],
    userController.getUserbyId,
);

// @route   POST api/users/:server_id
// @desc    Get user by server ID
// @access  Private
router.get(
    '/:server_id',
    [authenticate, authErrorHandler],
    userController.getUserbyServerId,
)

module.exports = router;
