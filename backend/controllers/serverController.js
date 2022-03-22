const Server = require('../models/Server');

const getServerbyId = async (req, res) => {
  try {
    const server = await Server.findById(req.params.id);
    res.json(server);
  } catch (err) {
    res.json({
      message: 'Invalid server ID',
      value: err.stringValue,
    });
  }
};

const createServer = async (req, res) => {};

module.exports = {
  getServerbyId,
  createServer,
};
