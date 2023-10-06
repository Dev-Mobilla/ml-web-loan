const ErrorThrower = (status, code, message) => {
    let err =  new Error();

    let error = {
        response: {
            status: err.status = status,
            data: {
                error: {
                    status: err.status = status,
                    code: err.name = code,
                    message: err.message = message
                }
            }
        }
    }

    return error;
}

module.exports = {
    ErrorThrower
}