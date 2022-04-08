const { validationResult } = require('express-validator');

const Channel = require('../models/Channel');

const getChannelById = (req, res) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    const { id } = req.params;

    Channel.findOne({ _id: id })
      .then((channel) => {
        if (channel) {
          res.status(200).send(channel);
        } else {
          res.status(404).send({
            msg: 'Channel not found',
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

const getChannelsByServerID = (req, res) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    const { serverID } = req.params;

    Channel.find({ server: serverID }).then((channels) => {
      if (channels) {
        res.status(200).send(channels);
      } else {
        res.status(404).send({
          msg: 'Channels not found',
        });
      }
    });
  } else {
    res.status(400).json({
      errors: errors.array(),
    });
  }
};

const createChannel = (req, res) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    const { name, serverID } = req.body;

    const channel = new Channel({
      name,
      server: serverID,
    });

    channel.save((err, channel) => {
      if (err) {
        res.status(500).send({
          msg: 'Failed to create channel',
          err,
        });
      } else {
        res.status(201).send({
          msg: 'Channel created',
          channel,
        });
      }
    });
  } else {
    res.status(400).json({
      errors: errors.array(),
    });
  }
};

module.exports = {
  getChannelById,
  getChannelsByServerID,
  createChannel,
};
