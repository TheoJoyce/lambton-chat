require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const winston = require('winston');
const expressWinston = require('express-winston');

const app = express();

// Logger
const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
});

const { MONGODB_URI } = process.env;

mongoose.connect(MONGODB_URI).catch((error) => {
  logger.log({
    message: `MongoDB error: ${error}`,
    level: 'error',
  });
});

const db = mongoose.connection;

// DB connection logging
db.on('error', (error) => {
  logger.log({
    message: `MongoDB error: ${error}`,
    level: 'error',
  });
});

db.once('open', () => {
  logger.log({
    message: 'Connected to MongoDB',
    level: 'info',
  });
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(
  expressWinston.logger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json(),
    ),
  }),
);

// Routes
// app.use("/api/users", require("./routes/api/users"));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/servers/', require('./routes/api/servers'));

const PORT = process.env.PORT;

app.listen(PORT, () => {
  logger.log({
    message: `Listening on port ${PORT}`,
    level: 'info',
  });
});
