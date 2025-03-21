/**
 * @fileoverview Utilities.
 *
 * @author Liav Barsheshet <liavbarsheshet@gmail.com>
 * @copyright Liav Barsheshet <LBDevelopments> © 2025
 */

import { InvalidParameter } from "./errors";

// Internal seed for the XORShift32 algorithm.
let seed = 14327;

/**
 * Generates a 32-bit unsigned pseudo-random integer using the XORShift32 algorithm.
 *
 * This function updates the internal `seed` and returns a new pseudo-random value.
 *
 * @returns {number} A 32-bit unsigned pseudo-random integer.
 */
function randXorShift32(): number {
  seed ^= seed << 13;
  seed ^= seed >> 17;
  seed ^= seed << 5;
  return seed >>> 0;
}

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
export function rand(min: number, max: number): number {
  if (typeof min !== "number" || typeof max !== "number")
    throw new InvalidParameter("min, max", "numbers");

  if (min > max || max < 0 || min < 0) throw new InvalidParameter("min, max", "min <= max");

  if (max === min) return min;

  return randXorShift32() % (max - min + 1);
}
