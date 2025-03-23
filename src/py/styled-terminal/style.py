"""
File: style.py

Creates a style infrastructure for terminal text.

Author: Liav Barsheshet <liavbarsheshet@gmail.com> © 2025
"""

from errors import InvalidParameter
from typing import Optional
from color import Color

from enum import Enum


class EModifiers(Enum):
    """
    Represents the modifiers and their location.
    """

    FontWeight = 0
    """Represents font weight modifier (Bold, Light and Normal)."""
    Italic = 1
    """Represent italic modifier."""
    Underline = 2
    """Represent underline decoration modifier."""
    Strikethrough = 3
    """Represent strikethrough decoration modifier."""
    ForegroundColor = 4
    """Represent foreground color modifier."""
    BackgroundColor = 5
    """Represent background color modifier."""
    Invert = 6
    """Represent invert mode modifier."""
    Visibility = 7
    """Represent visibility mode modifier. """


# Marks the end of a specific style.
END_SEQUENCE = "\x1b"


class Style:
    """
    Represents a style used for terminal text.
    """

    def _applyModifier(self, modifier: EModifiers, code: str = "") -> "Style":
        new_style = Style(self)
        new_style._chain[modifier.value] = code
        return new_style

    def __init__(self, style: Optional["Style"]):
        self._chain = [""] * 8
        """Chain of styles."""

        if style:
            self._chain = [val for val in style._chain]

    @property
    def reset(self) -> "Style":
        """
        Resets all the current style modifiers.

        Returns:
        A new `Style` instance for fluent method chaining.
        """
        return Style()

    @property
    def hidden(self) -> "Style":
        """
        Hides the text.

        Returns:
        A new `Style` instance for fluent method chaining.
        """
        return self._applyModifier(EModifiers.Visibility, "\x1b[8m")

    @property
    def reveal(self) -> "Style":
        """
        Force revealing a hidden text.

        Returns:
        A new `Style` instance for fluent method chaining.
        """
        return self._applyModifier(EModifiers.Visibility, "\x1b[28m")

    @property
    def autoVisibility(self) -> "Style":
        """
        Sets visibility to be auto.

        Returns:
        A new `Style` instance for fluent method chaining.
        """
        return self._applyModifier(EModifiers.Visibility)

    @property
    def invert(self) -> "Style":
        """
        Mode that swaps foreground and background colors.

        Returns:
        A new `Style` instance for fluent method chaining.
        """
        return self._applyModifier(EModifiers.Invert, "\x1b[7m")

    @property
    def noInvert(self) -> "Style":
        """
        Force disable the mode that swaps foreground and background colors.

        Returns:
        A new `Style` instance for fluent method chaining.
        """
        return self._applyModifier(EModifiers.Invert, "\x1b[27m")

    @property
    def autoInvert(self) -> "Style":
        """
        Sets the mode that swaps foreground and background colors to auto.

        Returns:
        A new `Style` instance for fluent method chaining.
        """
        return self._applyModifier(EModifiers.Invert)

    @property
    def bold(self) -> "Style":
        """
        Sets the font weight of the text to bold.

        Returns:
        A new `Style` instance for fluent method chaining.
        """
        return self._applyModifier(EModifiers.FontWeight, "\x1b[1m")

    @property
    def light(self) -> "Style":
        """
        Sets the font weight of the text to light.

        Returns:
        A new `Style` instance for fluent method chaining.
        """
        return self._applyModifier(EModifiers.FontWeight, "\x1b[2m")

    @property
    def normal(self) -> "Style":
        """
        Sets the font weight of the text to normal.

        Returns:
        A new `Style` instance for fluent method chaining.
        """
        return self._applyModifier(EModifiers.FontWeight, "\x1b[21m\x1b[22m")

    @property
    def autoFontWeight(self) -> "Style":
        """
        Sets the font weight of the text to auto.

        Returns:
        A new `Style` instance for fluent method chaining.
        """
        return self._applyModifier(EModifiers.FontWeight)

    @property
    def italic(self) -> "Style":
        """
        Applies italic styling to the text.

        Returns:
        A new `Style` instance for fluent method chaining.
        """
        return self._applyModifier(EModifiers.Italic, "\x1b[3m")

    @property
    def noItalic(self) -> "Style":
        """
        Force remove italic styling from the text.

        Returns:
        A new `Style` instance for fluent method chaining.
        """
        return self._applyModifier(EModifiers.Italic, "\x1b[23m")

    @property
    def autoItalic(self) -> "Style":
        """
        Sets italic styling of the text to auto.

        Returns:
        A new `Style` instance for fluent method chaining.
        """
        return self._applyModifier(EModifiers.Italic)

    @property
    def underline(self) -> "Style":
        """
        Applies underline styling to the text.

        Returns:
        A new `Style` instance for fluent method chaining.
        """
        return self._applyModifier(EModifiers.Underline, "\x1b[4m")

    @property
    def noUnderline(self) -> "Style":
        """
        Force remove any underline styling from the text.

        Returns:
        A new `Style` instance for fluent method chaining.
        """
        return self._applyModifier(EModifiers.Underline, "\x1b[24m")

    @property
    def autoUnderline(self) -> "Style":
        """
        Sets any underline styling from the text to auto.

        Returns:
        A new `Style` instance for fluent method chaining.
        """
        return self._applyModifier(EModifiers.Underline)

    @property
    def strikethrough(self) -> "Style":
        """
        Applies strikethrough styling to the text.

        Returns:
        A new `Style` instance for fluent method chaining.
        """
        return self._applyModifier(EModifiers.Strikethrough, "\x1b[9m")

    @property
    def noStrikethrough(self) -> "Style":
        """
        Force remove any strikethrough styling from the text.

        Returns:
        A new `Style` instance for fluent method chaining.
        """
        return self._applyModifier(EModifiers.Strikethrough, "\x1b[29m")

    @property
    def noStrikethrough(self) -> "Style":
        """
        Force remove any strikethrough styling from the text.

        Returns:
        A new `Style` instance for fluent method chaining.
        """
        return self._applyModifier(EModifiers.Strikethrough, "\x1b[29m")

    @property
    def resetFg(self) -> "Style":
        """
        Force resetting the foreground color to the terminal default value.

        Returns:
        A new `Style` instance for fluent method chaining.
        """
        return self._applyModifier(EModifiers.ForegroundColor, "\x1b[39m")

    @property
    def autoFg(self) -> "Style":
        """
        Setting the foreground color to auto.

        Returns:
        A new `Style` instance for fluent method chaining.
        """
        return self._applyModifier(EModifiers.ForegroundColor)

    @property
    def fg(self, color: Color) -> "Style":
        """
        Sets the foreground color of the text.

        Parameters:
        color (Color): A Color instance representing a color.

        Returns:
        A new `Style` instance for fluent method chaining.
        """
        return self._applyModifier(EModifiers.ForegroundColor, f"\x1b[38;{color.code}m")

    @property
    def resetBg(self) -> "Style":
        """
        Force resetting the background color to the terminal default value.

        Returns:
        A new `Style` instance for fluent method chaining.
        """
        return self._applyModifier(EModifiers.BackgroundColor, "\x1b[49m")

    @property
    def autoBg(self) -> "Style":
        """
        Setting the background color to auto.

        Returns:
        A new `Style` instance for fluent method chaining.
        """
        return self._applyModifier(EModifiers.BackgroundColor)

    @property
    def bg(self, color: Color) -> "Style":
        """
        Sets the background color of the text.

        Parameters:
        color (Color): A Color instance representing a color.

        Returns:
        A new `Style` instance for fluent method chaining.
        """
        return self._applyModifier(EModifiers.BackgroundColor, f"\x1b[48;{color.code}m")

    def apply(self, string: str, *args: str) -> str:
        """
        Applies a style to a string by concatenating it with additional strings.

        Parameters:
        string (str): The base string to apply the style to.
        args (str[]): Additional strings to concatenate.

        Returns:
        The styled and concatenated string.
        """

        if not isinstance(string, str) or any(not isinstance(arg, str) for arg in args):
            raise InvalidParameter("string, [string...]", "a valid string")

        # String concatenation
        string = f"{string} {' '.join(args)}" if args else string

        chain = "".join(self._chain)

        if not chain or not string:
            return string

        # Nested styles logic
        segments = string.split(END_SEQUENCE)

        if not segments[-1]:
            segments.pop()

        return (
            END_SEQUENCE.join(f"{chain}{segment}" for segment in segments)
            + END_SEQUENCE
        )
