const { validationResult } = require('express-validator');

const Server = require('../models/Server');

const makeError = require('../helpers/makeError');

const getServerbyId = async (req, res) => {
  try {
    const server = await Server.findById(req.params.id);
    res.status(200).json(server);
  } catch (err) {
    res.status(400).json({
      errors: makeError('server', 'Server not found'),
    });
  }
};

const joinCodeGenerator = () => {
  const timestamp = new Date.now();

  const randomizedNumber = Math.floor(timestamp * Math.random());

  const joinCode = randomizedNumber.toString().substring(0, 10);

  return joinCode;
};

const createServer = async (req, res) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    const { name, user } = req.body;

    const code = joinCodeGenerator();

    const server = new Server({
      name,
      code,
      admin: user._id,
    });

    server.save((err, server) => {
      if (err) {
        res.status(500).json({
          errors: makeError('server', 'Error saving server'),
        });
      } else {
        res.status(201).json({
          msg: 'Server created',
          server,
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
  getServerbyId,
  createServer,
};