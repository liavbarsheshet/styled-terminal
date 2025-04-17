/**
 * @fileoverview Errors Module
 *
 * Extends support for custom error handling.
 *
 * @author Liav Barsheshet <liavbarsheshet@gmail.com> © 2025
 */
/**
 * Base error class for styled-terminal.
 */
declare class STError extends Error {
    /**
     * @constructor
     * @param message Optional error message.
     */
    constructor(message?: string);
}
/**
 * Represents an error for invalid parameters.
 */
export declare class InvalidParameter extends STError {
    /**
     * @constructor
     * @param param The invalid parameter name.
     * @param legal The expected valid format or value.
     */
    constructor(param: string, legal: string);
}
export {};
//# sourceMappingURL=errors.d.ts.map