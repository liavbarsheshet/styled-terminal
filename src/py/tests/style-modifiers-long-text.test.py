from styled_terminal import Style, Color
import unittest


class TestStyleModifiersAndLongText(unittest.TestCase):

    def setUp(self):
        self.style = Style()

    def test_apply_multiple_modifiers(self):
        # Apply multiple modifiers to the text
        styled_text = (
            self.style.bold.italic.underline.strikethrough.fg(Color.red())
            .bg(Color.blue())
            .apply("Multiple Modifiers")
        )

        # Assert the expected styled text
        self.assertEqual(
            styled_text,
            "\x1b[1m\x1b[3m\x1b[4m\x1b[9m\x1b[38;5;1m\x1b[48;5;4mMultiple Modifiers\x1b[0m",
        )

    def test_handle_long_text_with_styles(self):
        # Handle long text with styles
        long_text = (
            "This is a very long text with multiple styles applied to it. "
            "It should wrap around and still maintain the styles. "
            "This test ensures that styles are applied consistently "
            "even with large amounts of text."
        )
        styled_text = self.style.bold.fg(Color.green()).apply(long_text)

        # Assert the styled long text
        self.assertEqual(styled_text, f"\x1b[1m\x1b[38;5;2m{long_text}\x1b[0m")

    def test_handle_nested_styles(self):
        # Handle nested styles
        nested_styled_text = self.style.bold.fg(Color.red()).apply(
            "Bold Red "
            + Style().italic.fg(Color.blue()).apply("Italic Blue ")
            + "Bold Red again"
        )
        expected_red = Color.red().code
        expected_blue = Color.blue().code

        # Assert the styled nested text
        self.assertEqual(
            nested_styled_text,
            f"\x1b[1m\x1b[38;{expected_red}mBold Red \x1b[3m\x1b[38;{expected_blue}mItalic Blue \x1b[0m\x1b[1m\x1b[38;{expected_red}mBold Red again\x1b[0m",
        )

    def test_handle_reset_modifiers_in_long_text(self):
        # Handle reset modifiers in long text
        long_text = "This is some styled text. "
        reset_text = "This should be the same with no style applied."
        styled_text = self.style.bold.fg(Color.green()).apply(
            long_text + self.style.fg(Color.cyan()).reset.apply(reset_text)
        )

        # Assert the styled text with reset modifier
        self.assertEqual(
            styled_text, f"\x1b[1m\x1b[38;5;2m{long_text}{reset_text}\x1b[0m"
        )

    def test_handle_hidden_and_reveal_in_long_texts(self):
        # Handle hidden and reveal styles in long texts
        hidden_text = self.style.hidden.apply("Hidden Part")
        revealed_text = self.style.reveal.apply("Revealed Part")
        long_text = (
            "Some visible text. "
            + hidden_text
            + " Some more visible text. "
            + revealed_text
        )

        # Assert the hidden and revealed styles
        self.assertEqual(
            long_text,
            "Some visible text. \x1b[8mHidden Part\x1b[0m Some more visible text. \x1b[28mRevealed Part\x1b[0m",
        )

    def test_handle_multiple_fg_and_bg_changes(self):
        # Handle multiple foreground and background changes
        text = self.style.fg(Color.red()).bg(Color.blue()).apply(
            "Red on Blue "
        ) + self.style.fg(Color.yellow()).bg(Color.magenta()).apply("Yellow on Magenta")
        expected_red = Color.red().code
        expected_blue = Color.blue().code
        expected_yellow = Color.yellow().code
        expected_magenta = Color.magenta().code

        # Assert the expected foreground and background changes
        self.assertEqual(
            text,
            f"\x1b[38;{expected_red}m\x1b[48;{expected_blue}mRed on Blue \x1b[0m\x1b[38;{expected_yellow}m\x1b[48;{expected_magenta}mYellow on Magenta\x1b[0m",
        )


if __name__ == "__main__":
    unittest.main()
