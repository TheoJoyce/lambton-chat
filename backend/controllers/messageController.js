const { validationResult } = require('express-validator');

const Message = require('../models/Message');

const getMessageByID = (req, res) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    const { id } = req.params;

    Message.findOne({ _id: id })
      .then((message) => {
        if (message) {
          res.status(200).send(message);
        } else {
          res.status(404).send({
            msg: 'Message not found',
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          msg: 'Server error',
        });
      });
  } else {
    res.status(400).json({
      errors: errors.array(),
    });
  }
};

const getMessagesByServerChannelID = (req, res) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    const { serverID, channelID } = req.params;

    Message.find({ server: serverID, channel: channelID })
      .limit(50)
      .then((messages) => {
        if (messages) {
          res.status(200).send(messages);
        } else {
          res.status(404).send({
            msg: 'Messages not found',
          });
        }
      });
  } else {
    res.status(400).json({
      errors: errors.array(),
    });
  }
};

const createMessage = (req, res) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    const { text, serverID, channelID } = req.body;
    const { user } = req;

    const newMessage = new Message({
      text,
      server: serverID,
      channel: channelID,
      user: user.id,
    });

    newMessage.save((err, message) => {
      if (err) {
        res.status(500).send({
          msg: 'Failed to create message',
        });
      } else {
        res.status(201).send(message);
      }
    });
  } else {
    res.status(400).json({
      errors: errors.array(),
    });
  }
};

module.exports = {
  getMessageByID,
  getMessagesByServerChannelID,
  createMessage,
};
