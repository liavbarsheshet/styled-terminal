import { Color } from "../src/index";
import { InvalidParameter } from "../src/errors";

describe("Error Handling", () => {
  it("should throw an error for invalid RGB values", () => {
    expect(() => Color.rgb(300, 0, 0)).toThrow(InvalidParameter);
  });

  it("should throw an error for invalid hex codes", () => {
    expect(() => Color.hex("invalid")).toThrow(InvalidParameter);
  });

  it("should throw an error for invalid 256-color index", () => {
    expect(() => Color.table256(-1)).toThrow(InvalidParameter);
  });
});
