const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const channelsController = require('../../controllers/channelsController');