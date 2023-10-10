const ErrorThrower = (status, code, message) => {
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
                    stack: err.stack
                }
            },
            stack: err.stack,
            code: code,
            message: {
                title: message.title,
                body: message.body
            }
        }
    }

    return error;
}

module.exports = {
    ErrorThrower
}