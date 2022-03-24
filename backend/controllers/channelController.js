const { validationResult } = require('express-validator');

const getChannelById = (req, res) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    const { id } = req.body;

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
    const { id } = req.body;

    Channel.find({ serverID: id }).then((channels) => {
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

    channel.save().then((err, channel) => {
      if (err) {
        res.status(500).send({
          msg: 'Failed to create channel',
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
