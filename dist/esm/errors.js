class STError extends Error {
    constructor(message) {
        super(`[styled-terminal] ${message ?? `Oops something went wrong!`}`);
    }
}
export class InvalidParameter extends STError {
    constructor(param, legal) {
        super(`The parameter '${param}' is invalid. It should be ${legal}.`);
    }
}
