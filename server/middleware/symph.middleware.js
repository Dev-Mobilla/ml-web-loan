const Logger = require("../config/logger.config");
const {ErrorThrower} = require("../utils/ErrorGenerator");

const statusCode = [404, 403, 401, 500, 400];

const ErrorResponse = (error) => {

    // let errorCode = error.response.status
    // console.log("errrrrr: ", error?.response && statusCode.includes(errorCode));

    if (error?.response && statusCode.includes(error.response.status)) {
        return error.response
    }else{
        const message = {
            title: "Network Error",
            body: "The server encountered an unexpected error"
        }

        const errRes = ErrorThrower(500, "INTERNAL_SERVER_ERROR", message, error)
        return errRes.response
    }
}

const ErrorLogger = (error, request, response , next) => {

    const ErrResponse = ErrorResponse(error);

    console.log("ERROR", ErrResponse);
    Logger.loggerError.addContext("context", `Logging.. - 
        Request URL: ${request.url} - ${JSON.stringify(ErrResponse.message)} | ${JSON.stringify(ErrResponse.data.error.code)} - ${JSON.stringify(ErrResponse.status)} | ${JSON.stringify(ErrResponse.errors)}`);
    Logger.loggerError.error(ErrResponse.data.error.stack);
    
    next(ErrResponse)
}

const ErrorHandler = (error, request, response , next) => {

    next(error);

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