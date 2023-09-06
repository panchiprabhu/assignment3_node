const winston = require('winston');

const logger = winston.createLogger({
    level: 'info', //minimum log level
    format: winston.format.combine(
      winston.format.timestamp({format:'HH:mm:ss'}),
      winston.format.printf(({ timestamp, level, message }) => {
        return `${timestamp} ${level}: ${message}`;
      })
    ),
    transports: [
      new winston.transports.Console(), // Log to the console
      new winston.transports.File({ filename: 'app.log' }) // Log all levels to a single file
    ]
  });

  module.exports = logger;