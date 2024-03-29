class CustomError extends Error {
    constructor(message) {
        super(message);
    }
}

exports.CustomError = CustomError;
