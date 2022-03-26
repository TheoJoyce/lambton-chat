const makeError = require('../helpers/makeError');

const adminCheck = (req, res, next) => {
  const userID = req.user.id;
  const adminID = req.body.admin;

  if (userID.toString() === adminID.toString()) {
    next();
  } else {
    res.status(401).json({
      errors: makeError('server', 'User is not admin'),
    });
  }
};

module.exports = adminCheck;
