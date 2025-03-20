import { Color, Style } from "../src/index";

describe("Color Combinations", () => {
  let style: Style;

  beforeEach(() => {
    style = new Style();
  });

  it("should handle bright and dim colors correctly", () => {
    const brightColor = Color.brightRed;
    const dimColor = Color.hsl(0, 50, 25); // A dim red
    const styledText = style.fg(brightColor).bg(dimColor).apply("Bright on Dim");
    expect(styledText).toBe("\x1b[38;5;9m\x1b[48;2;96;32;32mBright on Dim\x1b[0m");
  });

  it("should handle grayscale colors correctly", () => {
    const grayColor = Color.table256(240); // A grayscale color
    const styledText = style.fg(grayColor).apply("Grayscale Text");
    expect(styledText).toBe("\x1b[38;5;240mGrayscale Text\x1b[0m");
  });

  it("should handle random colors consistently", () => {
    const randomColor1 = Color.random;
    const randomColor2 = Color.random;
    expect(randomColor1).toBeInstanceOf(Color);
    expect(randomColor2).toBeInstanceOf(Color);
    // Note: We cannot test for specific values as they are random, but we can ensure they are created.
  });

  it("should handle hex colors with different cases correctly", () => {
    const color1 = Color.hex("#ff0000");
    const color2 = Color.hex("#FF0000");
    expect(color1.code).toBe(color2.code);
  });
});
