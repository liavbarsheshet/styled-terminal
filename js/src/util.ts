/**
 * @fileoverview Utilities.
 *
 * @author Liav Barsheshet <liavbarsheshet@gmail.com>
 * @copyright Liav Barsheshet <LBDevelopments> © 2025
 */

/**
 * Generates a random number within the specified range using an optional seed.
 * @param min The minimum number within the range [DEFAULT=0].
 * @param max  The maximum number within the range [DEFAULT=0].
 * @param seed An optional random seed (recommended to be a prime number) [DEFAULT=14327].
 * @returns A random number within the specified range.
 */
export function rand(min: number = 0, max: number = 0, seed: number = 14327): number {
  if (min > max || max < 0 || min < 0 || seed < 1) return -1;

  if (max === min) return min;

  return ((Math.floor(Math.random() * (max * seed - min)) + min) % (max - min)) + min;
}
