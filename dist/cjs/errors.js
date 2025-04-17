"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidParameter = void 0;
class STError extends Error {
    constructor(message) {
        super(`[styled-terminal] ${message ?? `Oops something went wrong!`}`);
    }
}
class InvalidParameter extends STError {
    constructor(param, legal) {
        super(`The parameter '${param}' is invalid. It should be ${legal}.`);
    }
}
exports.InvalidParameter = InvalidParameter;
