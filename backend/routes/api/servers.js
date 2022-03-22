const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const serverController = require('../../controllers/serverController');

// TODO: Add auth middleware

// @route   POST api/servers/:id
// @desc    Get server by ID
// @access  Private
router.get('/:id', serverController.getServerbyId);

// @route   POST api/servers/create
// @desc    Create server
// @access  Private
router.get(
  '/create',
  check('name')
    .isLength({ min: 5, max: 64 })
    .withMessage('Name must be between 5 and 64 characters in length'),
  serverController.createServer,
);

module.exports = router;
