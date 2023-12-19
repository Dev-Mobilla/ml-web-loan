const Logger = require("../config/logger.config");
const {ErrorThrower} = require("../utils/ErrorGenerator");

// const statusCode = [404, 403, 401, 500, 400, 402, 422, 503, 502, 504, 501, 405, 406, 408];

const ErrorResponse = async (error, res) => {
    let errors;

    if (error?.response && (error.response.status >= 400 && error.response.status <=499)) {
        
        errors =  error.response
    }else if (error?.response && (error.response.status >= 500 && error.response.status <=599)) {
        
        errors =  error.response
    }
    else{
        const message = {
            title: "Request failed",
            body: `We're sorry, something went wrong on our end. Please try again later or contact our support team.`
        }

        const errRes = ErrorThrower(500, "INTERNAL_SERVER_ERROR", message, error, res.req.url, "")
        errors = errRes.response
    }

    return await errors;
}

const ErrorLogger = async (error, request, response , next) => {

    const ErrResponse = await ErrorResponse(error, response);
    
    Logger.loggerError.addContext("context", `Logging.. - 
    Request URL: ${request.url}, Response URL: ${ErrResponse.hasOwnProperty("config") ? JSON.stringify(ErrResponse.config): ErrResponse.errors.config.url} - ${JSON.stringify(ErrResponse.message)} | ${JSON.stringify(ErrResponse.statusText)} | ${ErrResponse.code} - ${JSON.stringify(ErrResponse.status)} | ${JSON.stringify(ErrResponse.errors)}`);
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