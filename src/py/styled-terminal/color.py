"""
File: color.py

A simple way of creating colors to style the terminal.

Author: Liav Barsheshet <liavbarsheshet@gmail.com> © 2025
"""

from errors import InvalidParameter
from util import rand

import re


class Color:
    """
    Represents a Color.
    """

    def __init__(self, code: str):
        """
        Construct a new Color instance.

        Parameters:
        code (str): A partial ANSI code representing a color.
        """
        regex = r"(?:(?:5;(?:(?:\d)|(?:[1-9]\d)|(?:1\d\d)|(?:2[0-4]\d)|(?:25[0-5])))|(?:2;(?:(?:\d)|(?:[1-9]\d)|(?:1\d\d)|(?:2[0-4]\d)|(?:25[0-5]));(?:(?:\d)|(?:[1-9]\d)|(?:1\d\d)|(?:2[0-4]\d)|(?:25[0-5]));(?:(?:\d)|(?:[1-9]\d)|(?:1\d\d)|(?:2[0-4]\d)|(?:25[0-5]))))$"

        if not re.match(regex, code):
            raise InvalidParameter(
                "code", "in the format '5;[0-255]' or 2;[red];[green];[blue]"
            )

        self._code = code
        """ A partial ansi color escape sequence. """

    # [Default Colors]

    @property
    @staticmethod
    def black() -> "Color":
        """
        Gets the default black color.

        Returns:
        A new Color instance representing the default black color.
        """
        return Color.table256(0)

    @property
    @staticmethod
    def brightBlack() -> "Color":
        """
        Gets the default bright black color.

        Returns:
        A new Color instance representing the default bright black color.
        """
        return Color.table256(0)

    @property
    @staticmethod
    def red() -> "Color":
        """
        Gets the default red color.

        Returns:
        A new Color instance representing the default red color.
        """
        return Color.table256(1)

    @property
    @staticmethod
    def brightRed() -> "Color":
        """
        Gets the default bright red color.

        Returns:
        A new Color instance representing the default bright red color.
        """
        return Color.table256(9)

    @property
    @staticmethod
    def green() -> "Color":
        """
        Gets the default green color.

        Returns:
        A new Color instance representing the default green color.
        """
        return Color.table256(2)

    @property
    @staticmethod
    def brightGreen() -> "Color":
        """
        Gets the default bright green color.

        Returns:
        A new Color instance representing the default bright green color.
        """
        return Color.table256(10)

    @property
    @staticmethod
    def yellow() -> "Color":
        """
        Gets the default yellow color.

        Returns:
        A new Color instance representing the default yellow color.
        """
        return Color.table256(3)

    @property
    @staticmethod
    def brightYellow() -> "Color":
        """
        Gets the default bright yellow color.

        Returns:
        A new Color instance representing the default bright yellow color.
        """
        return Color.table256(11)

    @property
    @staticmethod
    def blue() -> "Color":
        """
        Gets the default blue color.

        Returns:
        A new Color instance representing the default blue color.
        """
        return Color.table256(4)

    @property
    @staticmethod
    def brightBlue() -> "Color":
        """
        Gets the default bright blue color.

        Returns:
        A new Color instance representing the default bright blue color.
        """
        return Color.table256(12)

    @property
    @staticmethod
    def magenta() -> "Color":
        """
        Gets the default magenta color.

        Returns:
        A new Color instance representing the default magenta color.
        """
        return Color.table256(5)

    @property
    @staticmethod
    def brightMagenta() -> "Color":
        """
        Gets the default bright magenta color.

        Returns:
        A new Color instance representing the default bright magenta color.
        """
        return Color.table256(13)

    @property
    @staticmethod
    def cyan() -> "Color":
        """
        Gets the default cyan color.

        Returns:
        A new Color instance representing the default cyan color.
        """
        return Color.table256(6)

    @property
    @staticmethod
    def brightCyan() -> "Color":
        """
        Gets the default bright cyan color.

        Returns:
        A new Color instance representing the default bright cyan color.
        """
        return Color.table256(14)

    @property
    @staticmethod
    def white() -> "Color":
        """
        Gets the default white color.

        Returns:
        A new Color instance representing the default white color.
        """
        return Color.table256(7)

    @property
    @staticmethod
    def brightWhite() -> "Color":
        """
        Gets the default bright white color.

        Returns:
        A new Color instance representing the default bright white color.
        """
        return Color.table256(15)

    @property
    @staticmethod
    def random() -> "Color":
        """
        Gets a random color.

        Returns:
        A new Color instance representing the random color.
        """
        return Color.rgb(rand(0, 255), rand(0, 255), rand(0, 255))

    @property
    @staticmethod
    def randomBright() -> "Color":
        """
        Gets a random bright color.

        Returns:
        A new Color instance representing the random bright color.
        """
        return Color.hsl(rand(0, 360), 100, rand(50, 85))

    @property
    @staticmethod
    def randomDim() -> "Color":
        """
        Gets a random dim color.

        Returns:
        A new Color instance representing the random dim color.
        """
        return Color.hsl(rand(0, 360), 50, rand(15, 50))

    @staticmethod
    def table256(index: int) -> "Color":
        """
        Choose an index from the 256-color lookup table.

        Parameters:
        index (int): A number between 0-255 which represent a cell index.

        Returns:
         A new Color instance corresponding to the provided index color.
        """

        if index > 255 or index < 0:
            raise InvalidParameter("index", "a number between 0-255")

        return Color(f"5;{index}")

    @staticmethod
    def rgb(red: int, green: int, blue: int) -> "Color":
        """
        Creates a `Color` object from RGB (Red, Green, Blue) values.

        Parameters:
        red (int): The red component of the color, typically a value between 0 and 255.
        green (int): The green component of the color, typically a value between 0 and 255.
        blue (int): The blue component of the color, typically a value between 0 and 255.

        Returns:
        A new Color instance corresponding to the provided RGB values.
        """

        if green > 255 or green < 0:
            raise InvalidParameter("green", "a number between 0-255")
        if blue > 255 or blue < 0:
            raise InvalidParameter("blue", "a number between 0-255")
        if red > 255 or red < 0:
            raise InvalidParameter("red", "a number between 0-255")

        return Color(f"5;{red};{green};{blue}")

    @staticmethod
    def hsl(hue: int, saturation: int, lightness: int) -> "Color":
        """
        Creates a `Color` object from HSL (Hue, Saturation, Lightness) values.

        Parameters:
        hue (int): The hue of the color, typically a value between 0 and 360 degrees.
        saturation (int): The saturation of the color, typically a percentage value between 0 and 100.
        lightness (int): The lightness of the color, typically a percentage value between 0 and 100.

        Returns:
        A new Color instance corresponding to the provided HSL values.
        """

        if saturation > 100 or saturation < 0:
            raise InvalidParameter("saturation", "a number between 0-100")
        if lightness > 255 or lightness < 0:
            raise InvalidParameter("lightness", "a number between 0-100")
        if hue > 360 or hue < 0:
            raise InvalidParameter("hue", "a number between 0-360")

        s = saturation / 100
        l = lightness / 100
        c = 1 - abs(2 * l - 1) * s
        x = c * (1 - abs(((hue / 60) % 2) - 1))
        m = l - c / 2

        r = 0
        g = 0
        b = 0

        if hue < 60:
            r = c
            g = x
            b = 0
        elif hue < 120:
            r = x
            g = c
            b = 0
        elif hue < 180:
            r = 0
            g = c
            b = x
        elif hue < 240:
            r = 0
            g = x
            b = c
        elif hue < 300:
            r = x
            g = 0
            b = c
        else:
            r = c
            g = 0
            b = x
        return Color.rgb(
            round((r + m) * 255), round((g + m) * 255), round((b + m) * 255)
        )

    @staticmethod
    def hex(hex_code: str) -> "Color":
        """
        Creates a `Color` instance from a hexadecimal color code.

        Parameters:
        hex_code (str): A string representing the color in hexadecimal format (e.g., `#FF5733` or `FF5733`).

        Returns:
        A new Color instance corresponding to the provided hex code.
        """

        if not re.fullmatch(r"#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})", hex_code):
            raise InvalidParameter("hex_code", "a valid hex color code.")

        hex_code = hex_code.lstrip("#")  # Remove # if present

        # Handle shorthand (3-digit hex)
        if len(hex_code) == 3:
            hex_code = "".join(char * 2 for char in hex_code)

        return Color.rgb(
            int(hex_code[:2], 16), int(hex_code[2:4], 16), int(hex_code[4:6], 16)
        )

    @property
    def code(self) -> str:
        return self._code
