/**
 * @fileoverview Errors Module
 *
 * Extends support for custom error handling.
 *
 * @author Liav Barsheshet <liavbarsheshet@gmail.com>
 * @copyright Liav Barsheshet <LBDevelopments> © 2025
 */

/**
 * Base error class for styled-terminal.
 */
class STError extends Error {
  /**
   * @constructor
   * @param message Optional error message.
   */
  constructor(message?: string) {
    super(`[styled-terminal] ${message ?? `Oops something went wrong!`}`);
  }
}

/**
 * Represents an error for invalid parameters.
 */
export class InvalidParameter extends STError {
  /**
   * @constructor
   * @param param The invalid parameter name.
   * @param legal The expected valid format or value.
   */
  constructor(param: string, legal: string) {
    super(`The parameter '${param}' is invalid. It should be ${legal}.`);
  }
}
