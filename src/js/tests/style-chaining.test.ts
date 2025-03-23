import { Color, Style } from "../src/index";

describe("Style Chaining and Reusability", () => {
  it("should chain styles correctly", () => {
    const style = new Style().bold.underline.fg(Color.blue());
    const styledText = style.apply("Chained Style");
    expect(styledText).toBe("\x1b[1m\x1b[4m\x1b[38;5;4mChained Style\x1b[0m");
  });

  it("should reuse a style instance", () => {
    const reusableStyle = new Style().italic.bg(Color.yellow());
    const text1 = reusableStyle.apply("Text 1");
    const text2 = reusableStyle.apply("Text 2");
    expect(text1).toBe("\x1b[3m\x1b[48;5;3mText 1\x1b[0m");
    expect(text2).toBe("\x1b[3m\x1b[48;5;3mText 2\x1b[0m");
  });

  it("should create a new style from an existing style without affecting the original", () => {
    const originalStyle = new Style().bold;
    const newStyle = new Style(originalStyle).underline;
    expect(originalStyle.apply("Original")).toBe("\x1b[1mOriginal\x1b[0m");
    expect(newStyle.apply("New")).toBe("\x1b[1m\x1b[4mNew\x1b[0m");
  });
});
