const Logger = require("../config/logger.config");

const ErrorLogger = (error, request, response , next) => {
    // console.log("Error Logging", error);
    Logger.loggerError.addContext("context", `Logging.. - ${JSON.stringify(error.message)} - ${JSON.stringify(error.code)}`);
    Logger.loggerError.error(error.stack);
    next(error)
}
const ErrorHandler = (error, request, response , next) => {

    let statusCode = [404, 403, 401, 500];

    let errorCode = error.response.status

    
    if (statusCode.includes(errorCode)) {
        console.log("Error Handling");

        next(error.response.data)
    }else{
        console.log("Error Handling no status");
        next(error)
    }

}

const ErrorResponder = (error, request, response , next) => {
    console.log("Error Reponding");
    response.send(error)
}

module.exports = {
    ErrorLogger,
    ErrorHandler,
    ErrorResponder
}