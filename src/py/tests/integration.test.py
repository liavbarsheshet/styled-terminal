from styled_terminal import Style, Color, InvalidParameter
from unittest.mock import patch
import unittest


class TestStyledTerminalOutput(unittest.TestCase):

    def test_reset_style(self):
        # Applying the style with reset
        reset_style = Style().bold.fg(Color.green()).reset
        styled_text = reset_style.apply("Reset Text")

        # Assert that the styled text matches the expected output
        self.assertEqual(styled_text, "Reset Text")

    def test_strikethrough_styles(self):
        # Apply various styles
        light_text = Style().light.apply("Light Text")
        normal_text = Style().normal.apply("Normal Text")
        strikethrough_text = Style().strikethrough.apply("Strikethrough Text")
        no_strikethrough_text = Style().noStrikethrough.apply("No Strikethrough Text")

        # Assert that the output matches the expected ANSI escape sequences
        self.assertEqual(light_text, "\x1b[2mLight Text\x1b[0m")
        self.assertEqual(normal_text, "\x1b[21m\x1b[22mNormal Text\x1b[0m")
        self.assertEqual(strikethrough_text, "\x1b[9mStrikethrough Text\x1b[0m")
        self.assertEqual(no_strikethrough_text, "\x1b[29mNo Strikethrough Text\x1b[0m")

    def test_complex_style(self):
        # Complex combination of styles
        complex_style = (
            Style()
            .bold.italic.underline.fg(Color.hex("#FF5733"))
            .bg(Color.hsl(240, 100, 50))
        )
        styled_text = complex_style.apply("Complex Style Test")

        # Get the expected color and background codes
        expected_color = Color.hex("#FF5733").code
        expected_bg_color = Color.hsl(240, 100, 50).code

        # Assert the styled text matches the expected output with the escape codes
        self.assertEqual(
            styled_text,
            f"\x1b[1m\x1b[3m\x1b[4m\x1b[38;{expected_color}m\x1b[48;{expected_bg_color}mComplex Style Test\x1b[0m",
        )


if __name__ == "__main__":
    unittest.main()
