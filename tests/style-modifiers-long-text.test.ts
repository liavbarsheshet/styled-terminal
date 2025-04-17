import style, { Color } from "../src/index";

describe("Style Modifiers and Long Text", () => {
  it("should apply multiple modifiers correctly", () => {
    const styledText = style.bold.italic.underline.strikethrough
      .fg(Color.red)
      .bg(Color.blue)
      .apply("Multiple Modifiers");

    expect(styledText).toBe(
      "\x1b[1m\x1b[3m\x1b[4m\x1b[9m\x1b[38;5;1m\x1b[48;5;4mMultiple Modifiers\x1b[0m"
    );
  });

  it("should handle long text with styles correctly", () => {
    const longText =
      "This is a very long text with multiple styles applied to it. " +
      "It should wrap around and still maintain the styles. " +
      "This test ensures that styles are applied consistently " +
      "even with large amounts of text.";

    const styledText = style.bold.fg(Color.green).apply(longText);

    expect(styledText).toBe(`\x1b[1m\x1b[38;5;2m${longText}\x1b[0m`);
  });

  it("should handle nested styles correctly", () => {
    const styledText = style.bold
      .fg(Color.red)
      .apply(
        "Bold Red " +
          style.italic.fg(Color.blue).apply("Italic Blue ") +
          "Bold Red again"
      );
    const expectedRed = Color.red.code;
    const expectedBlue = Color.blue.code;
    expect(styledText).toBe(
      `\x1b[1m\x1b[38;${expectedRed}mBold Red \x1b[3m\x1b[38;${expectedBlue}mItalic Blue \x1b[0m\x1b[1m\x1b[38;${expectedRed}mBold Red again\x1b[0m`
    );
  });

  it("should handle reset modifiers correctly in long text", () => {
    const longText = "This is some styled text. ";
    const resetText = "This should be the same with no style applied.";
    const styledText = style.bold
      .fg(Color.green)
      .apply(longText + style.fg(Color.cyan).reset.apply(resetText));

    expect(styledText).toBe(
      `\x1b[1m\x1b[38;5;2m${longText}${resetText}\x1b[0m`
    );
  });

  it("should handle hidden and reveal in long texts", () => {
    const hiddenText = style.hidden.apply("Hidden Part");
    const revealedText = style.reveal.apply("Revealed Part");
    const longText =
      "Some visible text. " +
      hiddenText +
      " Some more visible text. " +
      revealedText;
    expect(longText).toBe(
      "Some visible text. \x1b[8mHidden Part\x1b[0m Some more visible text. \x1b[28mRevealed Part\x1b[0m"
    );
  });

  it("should handle multiple foreground and background changes", () => {
    const text =
      style.fg(Color.red).bg(Color.blue).apply("Red on Blue ") +
      style.fg(Color.yellow).bg(Color.magenta).apply("Yellow on Magenta");
    const expectedRed = Color.red.code;
    const expectedBlue = Color.blue.code;
    const expectedYellow = Color.yellow.code;
    const expectedMagenta = Color.magenta.code;
    expect(text).toBe(
      `\x1b[38;${expectedRed}m\x1b[48;${expectedBlue}mRed on Blue \x1b[0m\x1b[38;${expectedYellow}m\x1b[48;${expectedMagenta}mYellow on Magenta\x1b[0m`
    );
  });
});
