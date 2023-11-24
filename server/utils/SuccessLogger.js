const Logger = require('../config/logger.config');

const SuccessLogger = (url, status, message) => {
    Logger.loggerInfo.addContext("context", `Logging.. URL: ${url} - STATUS: ${status};`);
    Logger.loggerInfo.info(`MESSAGE: ${message}`);
}

module.exports = SuccessLogger;