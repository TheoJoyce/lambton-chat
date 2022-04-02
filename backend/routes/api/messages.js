const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const {
  authenticate,
  authErrorHandler,
} = require('../../middleware/authenticate');

const messageController = require('../../controllers/messageController');

// @route   GET api/messages/:id
// @desc    Get message by id
// @access  Private
router.get(
  '/:id',
  [authenticate, authErrorHandler],
  check('id').isMongoId().withMessage('Invalid message ID'),
  messageController.getMessageByID,
);

// @route   GET api/messages/:serverID/:channelID
// @desc    Get messages by server and channel id
// @access  Private
router.get(
  '/:serverID/:channelID',
  [authenticate, authErrorHandler],
  [
    check('serverID').isMongoId().withMessage('Invalid server ID'),
    check('channelID').isMongoId().withMessage('Invalid channel ID'),
  ],
  messageController.getMessagesByServerChannelID,
);

// @route   POST api/messages/create
// @desc    Create message
// @access  Private
router.post(
  '/create',
  [authenticate, authErrorHandler],
  [
    check('text')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Invalid message text')
      .escape(),
    check('serverID').isMongoId().withMessage('Invalid server ID'),
    check('channelID').isMongoId().withMessage('Invalid channel ID'),
  ],
  messageController.createMessage,
);

module.exports = router;
