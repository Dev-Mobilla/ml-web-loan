const Logger = require("../config/logger.config");

const ErrorLogger = (error, request, response , next) => {
    console.log("ERROR", error);
    Logger.loggerError.addContext("context", `Logging.. - 
        Request URL: ${request.url} - ${JSON.stringify(error.response.message)} | ${JSON.stringify(error.response.data.error.code)} - ${JSON.stringify(error.response.status)}`);
    Logger.loggerError.error(error.response.data.error.stack);
    next(error)
}
const ErrorHandler = (error, request, response , next) => {
    
    let statusCode = [404, 403, 401, 500, 400];

    let errorCode = error.response.status
    
    if (statusCode.includes(errorCode)) {
        console.log("Error Handling");

        next(error.response)
    }else{
        console.log("Error Handling no status");
        next(error)
    }

}

const ErrorResponder = (error, request, response , next) => {
    console.log("Error Reponding");
    response.status(error.status).send(error.data);
}

module.exports = {
    ErrorLogger,
    ErrorHandler,
    ErrorResponder
}