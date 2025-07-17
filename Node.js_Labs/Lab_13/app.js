
const express = require('express');
const winston = require('winston');

const app = express();
const port = 3000;


const logger = winston.createLogger({
  level: 'info',
  transports: [
    // Log to console
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    }),
    // Log to file
    new winston.transports.File({ filename: 'logs/combined.log' }),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' })
  ]
});

// Middlewares
app.use((req, res, next) => {
  logger.info(`Received request: ${req.method} ${req.url}`);
  next();
});

// Routes
app.get('/', (req, res) => {
  logger.info('Health check endpoint hit');
  res.send('Hello, world!');
});

// Error handling
app.use((err, req, res, next) => {
  logger.error(`Error occurred: ${err.message}`);
  res.status(500).send('Something went wrong!');
});

// Start server
app.listen(port, () => {
  logger.info(`Server running at http://localhost:${port}`);
});
