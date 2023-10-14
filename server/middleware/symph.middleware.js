const Logger = require("../config/logger.config");
const {ErrorThrower} = require("../utils/ErrorGenerator");

const statusCode = [404, 403, 401, 500, 400];

const ErrorResponse = (error) => {

    let errorCode = error.response.status

    if (statusCode.includes(errorCode)) {
        return error
    }else{
        const message = {
            title: "Network Error",
            body: "The server encountered an unexpected error"
        }

        const errRes = ErrorThrower(500, "INTERNAL_SERVER_ERROR", message)
        return errRes
    }
}

const ErrorLogger = (error, request, response , next) => {

    const ErrResponse = ErrorResponse(error);

    console.log("ERROR", ErrResponse);
    Logger.loggerError.addContext("context", `Logging.. - 
        Request URL: ${request.url} - ${JSON.stringify(ErrResponse.response.message)} | ${JSON.stringify(ErrResponse.response.data.error.code)} - ${JSON.stringify(ErrResponse.response.status)}`);
    Logger.loggerError.error(ErrResponse.response.data.error.stack);
    
    next(ErrResponse)
}

const ErrorHandler = (error, request, response , next) => {
    
    // let errorCode = error.response.status
    
    // if (statusCode.includes(errorCode)) {
    //     console.log("Error Handling");

    //     next(error.response)
    // }else{
    //     console.log("Error Handling no status");
    //     next(error)
    // }

    next(error)

}

const ErrorResponder = (error, request, response , next) => {
    console.log("Error Reponding", error);
    response.status(error.status).send(error.data);
}

module.exports = {
    ErrorLogger,
    ErrorHandler,
    ErrorResponder
}