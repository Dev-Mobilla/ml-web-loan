const Logger = require("../config/logger.config");

const ErrorLogger = (error, request, response , next) => {
    console.log("Error Logging");
    Logger.loggerError.addContext("context", `Logging.. - ${JSON.stringify(request.url)} - ${JSON.stringify(error.status)}`);
    Logger.loggerError.error(error.message);
    next(error)
}
const ErrorHandler = (error, request, response , next) => {

    let statusCode = [404, 403, 401, 500];
    // console.log("error handler", error);
    // console.log("error handler", error.status);
    let errorCode = error.response.status || error.status

    console.log("errorCode", error);
    
    if (statusCode.includes(errorCode)) {
        console.log("Error Handling");

        next(error.response.data)
    }else{

        console.log("Error Handling 500");
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