from styled_terminal import Color, Style
import unittest


class TestStyleChainingAndReusability(unittest.TestCase):

    def test_style_chaining(self):
        # Chain styles
        style = Style().bold.underline.fg(Color.blue())
        styled_text = style.apply("Chained Style")

        # Assert the styled text matches the expected ANSI escape sequences
        self.assertEqual(styled_text, "\x1b[1m\x1b[4m\x1b[38;5;4mChained Style\x1b[0m")

    def test_style_reusability(self):
        # Reuse the style instance
        reusable_style = Style().italic.bg(Color.yellow())
        text1 = reusable_style.apply("Text 1")
        text2 = reusable_style.apply("Text 2")

        # Assert the reused style outputs correctly for both texts
        self.assertEqual(text1, "\x1b[3m\x1b[48;5;3mText 1\x1b[0m")
        self.assertEqual(text2, "\x1b[3m\x1b[48;5;3mText 2\x1b[0m")

    def test_style_copying(self):
        # Create a new style from an existing style
        original_style = Style().bold
        new_style = Style(original_style).underline

        # Assert that the original style is not affected by the new style
        self.assertEqual(original_style.apply("Original"), "\x1b[1mOriginal\x1b[0m")
        self.assertEqual(new_style.apply("New"), "\x1b[1m\x1b[4mNew\x1b[0m")


if __name__ == "__main__":
    unittest.main()
