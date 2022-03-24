const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const {
  authenticate,
  authErrorHandler,
} = require('../../middleware/authenticate');

const channelController = require('../../controllers/channelController');

// @route   GET api/channels/:id
// @desc    Get channel by id
// @access  Private
router.get(
  '/:id',
  [authenticate, authErrorHandler],
  check('id').isMongoId().withMessage('Invalid channel ID'),
  channelController.getChannelById,
);

// @route   GET api/channels/:serverID
// @desc    Get channels by server id
// @access  Private
router.get(
  '/:serverID',
  [authenticate, authErrorHandler],
  check('serverID').isMongoId().withMessage('Invalid server ID'),
  channelController.getChannelsByServerID,
);

// @route   POST api/channels/create
// @desc    Create channel
// @access  Private
router.post(
  '/create',
  [authenticate, authErrorHandler],
  [
    check('name')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Invalid channel name')
      .escape(),
    check('serverID').isMongoId().withMessage('Invalid server ID'),
  ],
  channelController.createChannel,
);

module.exports = router;
