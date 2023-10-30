const Logger = require("../config/logger.config");
const {ErrorThrower} = require("../utils/ErrorGenerator");

const statusCode = [404, 403, 401, 500, 400];

const ErrorResponse = async (error) => {
    let errors;

    if (error?.response && statusCode.includes(error.response.status)) {
        errors =  error.response
    }else{
        const message = {
            title: "Request failed",
            body: `We're sorry, something went wrong on our end. Please try again later or contact our support team.`
        }

        const errRes = ErrorThrower(500, "INTERNAL_SERVER_ERROR", message, error)
        errors = errRes.response
    }

    return await errors;
}

const ErrorLogger = async (error, request, response , next) => {

    const ErrResponse = await ErrorResponse(error);

    Logger.loggerError.addContext("context", `Logging.. - 
    Request URL: ${request.url}, Response URL: ${ErrResponse.config ? ErrResponse.config.url: ErrResponse.errors.config.url} - ${JSON.stringify(ErrResponse.message)} | ${JSON.stringify(ErrResponse.statusText)} - ${JSON.stringify(ErrResponse.status)} | ${JSON.stringify(ErrResponse.errors)}`);
    Logger.loggerError.error(JSON.stringify(ErrResponse.data.error) ? ErrResponse.data.error.stack : JSON.stringify(ErrResponse.data));
    
    next(ErrResponse);
}
    
const ErrorResponder = (error, request, response , next) => {
    response.status(error.status).send(error.data);
}

module.exports = {
    ErrorLogger,
    ErrorResponder
}