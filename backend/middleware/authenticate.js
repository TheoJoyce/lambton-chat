const jwt = require('express-jwt');

const authenticate = jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
});

const authErrorHandler = (err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ msg: 'Invalid token' });
  }
};

module.exports = {
  authenticate,
  authErrorHandler,
};
