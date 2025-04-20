import { Color } from "../src/index";

describe("Error Handling", () => {
  it("should throw an error for invalid RGB values", () => {
    expect(() => Color.rgb(300, 0, 0)).toThrow(TypeError);
  });

  it("should throw an error for invalid hex codes", () => {
    expect(() => Color.hex("invalid")).toThrow(TypeError);
  });

  it("should throw an error for invalid 256-color index", () => {
    expect(() => Color.table256(-1)).toThrow(TypeError);
  });
});
