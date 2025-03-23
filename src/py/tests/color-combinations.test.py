from styled_terminal import Color, Style
import unittest


class TestColorCombinations(unittest.TestCase):
    def setUp(self):
        self.style = Style()

    def test_bright_and_dim_colors(self):
        bright_color = Color.brightRed()
        dim_color = Color.hsl(0, 50, 25)  # A dim red
        styled_text = self.style.fg(bright_color).bg(dim_color).apply("Bright on Dim")
        self.assertEqual(
            styled_text, "\x1b[38;5;9m\x1b[48;2;96;32;32mBright on Dim\x1b[0m"
        )

    def test_grayscale_colors(self):
        gray_color = Color.table256(240)
        styled_text = self.style.fg(gray_color).apply("Gray text")
        self.assertEqual(styled_text, "\x1b[38;5;240mGray text\x1b[0m")


if __name__ == "__main__":
    unittest.main()
