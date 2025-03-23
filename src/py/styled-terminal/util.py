"""
File: util.py

Utilities.

Author: Liav Barsheshet <liavbarsheshet@gmail.com> © 2025
"""

from errors import InvalidParameter

import random
import math

# Internal seed for the XORShift32 algorithm.
seed = math.floor(random.random() * 0xFFFFFFFF)


def randXorShift32() -> int:
    """
    Generates a 32-bit unsigned pseudo-random integer using the XORShift32 algorithm.
    This function updates the internal `seed` and returns a new pseudo-random value.

    Returns:
    A 32-bit unsigned pseudo-random integer.
    """

    global seed
    seed ^= (seed << 13) & 0xFFFFFFFF
    seed ^= (seed >> 17) & 0xFFFFFFFF
    seed ^= (seed << 5) & 0xFFFFFFFF
    return seed & 0xFFFFFFFF


def rand(min: int, max: int) -> int:
    """
    Generates a pseudo-random integer within a specified inclusive range.

    Parameters:
    min (int): The minimum value of the range (inclusive).
    max (int): The maximum value of the range (inclusive).

    Returns:
    A pseudo-random integer within the specified range.
    """
    if not isinstance(min, int) or not isinstance(max, int):
        raise InvalidParameter("min, max", "numbers")
    if min > max or max < 0 or min < 0:
        raise InvalidParameter("min, max", "0 <= min <= max")
    if max == min:
        return min
    return randXorShift32() % (max - min + 1)
