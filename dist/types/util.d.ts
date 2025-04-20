/**
 * Generates a pseudo-random integer within a specified inclusive range.
 *
 * This function utilizes the `randXorShift32` function to produce a pseudo-random
 * value and scales it to the desired range.
 *
 * @param {number} min The minimum value of the range (inclusive).
 * @param {number} max The maximum value of the range (inclusive).
 * @returns {number} A pseudo-random integer within the specified range.
 */
export declare function rand(min: number, max: number): number;
