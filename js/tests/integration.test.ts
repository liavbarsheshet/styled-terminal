// tests/integration.test.ts

import style, { Color, Style } from "../src/index";

describe("Integration Tests: Styled Terminal Output", () => {
  let consoleLogSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
  });

  it("should output styled text to console.log with default style instance", () => {
    const styledText = style.bold.fg(Color.red).apply("Styled Text");
    console.log(styledText);
    expect(consoleLogSpy).toHaveBeenCalledWith("\x1b[1m\x1b[38;5;1mStyled Text\x1b[0m");
  });

  it("should output styled text to console.log with custom style instance", () => {
    const customStyle = new Style().underline.bg(Color.blue);
    const styledText = customStyle.apply("Another Styled Text");
    console.log(styledText);
    expect(consoleLogSpy).toHaveBeenCalledWith("\x1b[4m\x1b[48;5;4mAnother Styled Text\x1b[0m");
  });

  it("should handle complex style combinations and output correctly", () => {
    const complexStyle = style.bold.italic.underline
      .fg(Color.hex("#FF5733"))
      .bg(Color.hsl(240, 100, 50));
    const styledText = complexStyle.apply("Complex Style Test");
    console.log(styledText);

    const expectedColor = Color.hex("#FF5733").code;
    const expectedBgColor = Color.hsl(240, 100, 50).code;

    expect(consoleLogSpy).toHaveBeenCalledWith(
      `\x1b[1m\x1b[3m\x1b[4m\x1b[38;${expectedColor}m\x1b[48;${expectedBgColor}mComplex Style Test\x1b[0m`
    );
  });

  it("should handle reset styles correctly", () => {
    const resetStyle = style.bold.fg(Color.green).reset;
    const styledText = resetStyle.apply("Reset Text");
    console.log(styledText);
    expect(consoleLogSpy).toHaveBeenCalledWith("Reset Text");
  });

  it("should handle hidden and reveal styles correctly", () => {
    const hiddenStyle = style.hidden;
    const revealedStyle = style.reveal;

    console.log(hiddenStyle.apply("Hidden Text"));
    console.log(revealedStyle.apply("Revealed Text"));

    expect(consoleLogSpy).toHaveBeenCalledWith("\x1b[8mHidden Text\x1b[0m");
    expect(consoleLogSpy).toHaveBeenCalledWith("\x1b[28mRevealed Text\x1b[0m");
  });

  it("should handle light, normal, strikethrough, and noStrikethrough styles", () => {
    console.log(style.light.apply("Light Text"));
    console.log(style.normal.apply("Normal Text"));
    console.log(style.strikethrough.apply("Strikethrough Text"));
    console.log(style.noStrikethrough.apply("No Strikethrough Text"));

    expect(consoleLogSpy).toHaveBeenCalledWith("\x1b[2mLight Text\x1b[0m");
    expect(consoleLogSpy).toHaveBeenCalledWith("\x1b[22mNormal Text\x1b[0m");
    expect(consoleLogSpy).toHaveBeenCalledWith("\x1b[9mStrikethrough Text\x1b[0m");
    expect(consoleLogSpy).toHaveBeenCalledWith("\x1b[29mNo Strikethrough Text\x1b[0m");
  });

  it("should handle resetFg and resetBg styles", () => {
    console.log(style.fg(Color.red).resetFg.apply("Reset Foreground"));
    console.log(style.bg(Color.blue).resetBg.apply("Reset Background"));

    expect(consoleLogSpy).toHaveBeenCalledWith("\x1b[38;5;1m\x1b[39mReset Foreground\x1b[0m");
    expect(consoleLogSpy).toHaveBeenCalledWith("\x1b[48;5;4m\x1b[49mReset Background\x1b[0m");
  });
});
