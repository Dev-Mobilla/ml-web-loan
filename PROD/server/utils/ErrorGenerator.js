const ErrorThrower = (status, code, message, dbErrors) => {
    let err =  new Error();

    let error = {
        response: {
            status: status,
            data: {
                error: {
                    status:  status,
                    code:  code,
                    message: {
                        title: message.title,
                        body: message.body
                    },
                    stack: err.stack,
                }
            },
            stack: err.stack,
            code: code,
            message: {
                title: message.title,
                body: message.body
            },
            errors: dbErrors
        }
    }

    return error;
}

module.exports = {
    ErrorThrower
}