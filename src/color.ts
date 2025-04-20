/**
 * @fileoverview Color Module.
 *
 * A simple way of creating colors to style the terminal.
 *
 * @author Liav Barsheshet <liavbarsheshet@gmail.com>
 * @copyright Liav Barsheshet <LBDevelopments> © 2025
 */
import { rand } from "./util.js";

/** Represents a partial ansi color escape code. */
type TColorCode = string;

/**
 * Represents a Color.
 */
export class Color {
  /** A partial ansi color escape sequence. */
  #code: TColorCode;

  /**
   * Construct a new Color instance.
   * @constructor
   * @param code A partial ANSI code representing a color.
   */
  constructor(code: TColorCode) {
    const regex =
      /^(?:(?:5;(?:(?:\d)|(?:[1-9]\d)|(?:1\d\d)|(?:2[0-4]\d)|(?:25[0-5])))|(?:2;(?:(?:\d)|(?:[1-9]\d)|(?:1\d\d)|(?:2[0-4]\d)|(?:25[0-5]));(?:(?:\d)|(?:[1-9]\d)|(?:1\d\d)|(?:2[0-4]\d)|(?:25[0-5]));(?:(?:\d)|(?:[1-9]\d)|(?:1\d\d)|(?:2[0-4]\d)|(?:25[0-5]))))$/;

    if (!regex.test(code))
      throw new TypeError("Expected a valid ansi code as value parameter.");

    this.#code = code;
  }

  /**
   * Gets the partial ansi color escape sequence.
   * @returns {TColorCode} A partial ANSI code representing a color.
   */
  get code(): TColorCode {
    return this.#code;
  }

  // [Default Colors]

  /**
   * Gets the default black color.
   *
   * @returns {Color} A new Color instance representing the default black color.
   */
  static get black(): Color {
    return Color.table256(0);
  }

  /**
   * Gets the default bright black color.
   *
   * @returns {Color} A new Color instance representing the default bright black color.
   */
  static get brightBlack(): Color {
    return Color.table256(8);
  }

  /**
   * Gets the default red color.
   *
   * @returns {Color} A new Color instance representing the default red color.
   */
  static get red(): Color {
    return Color.table256(1);
  }

  /**
   * Gets the default bright red color.
   *
   * @returns {Color} A new Color instance representing the default bright red color.
   */
  static get brightRed(): Color {
    return Color.table256(9);
  }

  /**
   * Gets the default green color.
   *
   * @returns {Color} A new Color instance representing the default green color.
   */
  static get green(): Color {
    return Color.table256(2);
  }

  /**
   * Gets the default bright green color.
   *
   * @returns {Color} A new Color instance representing the default bright green color.
   */
  static get brightGreen(): Color {
    return Color.table256(10);
  }

  /**
   * Gets the default yellow color.
   *
   * @returns {Color} A new Color instance representing the default yellow color.
   */
  static get yellow(): Color {
    return Color.table256(3);
  }

  /**
   * Gets the default bright yellow color.
   *
   * @returns {Color} A new Color instance representing the default bright yellow color.
   */
  static get brightYellow(): Color {
    return Color.table256(11);
  }

  /**
   * Gets the default blue color.
   *
   * @returns {Color} A new Color instance representing the default blue color.
   */
  static get blue(): Color {
    return Color.table256(4);
  }

  /**
   * Gets the default bright blue color.
   *
   * @returns {Color} A new Color instance representing the default bright blue color.
   */
  static get brightBlue(): Color {
    return Color.table256(12);
  }

  /**
   * Gets the default magenta color.
   *
   * @returns {Color} A new Color instance representing the default magenta color.
   */
  static get magenta(): Color {
    return Color.table256(5);
  }

  /**
   * Gets the default bright magenta color.
   *
   * @returns {Color} A new Color instance representing the default bright magenta color.
   */
  static get brightMagenta(): Color {
    return Color.table256(13);
  }

  /**
   * Gets the default cyan color.
   *
   * @returns {Color} A new Color instance representing the default cyan color.
   */
  static get cyan(): Color {
    return Color.table256(6);
  }

  /**
   * Gets the default bright cyan color.
   *
   * @returns {Color} A new Color instance representing the default bright cyan color.
   */
  static get brightCyan(): Color {
    return Color.table256(14);
  }

  /**
   * Gets the default white color.
   *
   * @returns {Color} A new Color instance representing the default white color.
   */
  static get white(): Color {
    return Color.table256(7);
  }

  /**
   * Gets the default bright white color.
   *
   * @returns {Color} A new Color instance representing the default bright white color.
   */
  static get brightWhite(): Color {
    return Color.table256(15);
  }

  /**
   * Gets a random color.
   *
   * @returns {Color} A new Color instance representing the random color.
   */
  static get random(): Color {
    return Color.rgb(rand(0, 255), rand(0, 255), rand(0, 255));
  }

  /**
   * Gets a random bright color.
   *
   * @returns {Color} A partial ANSI code representing the random bright color.
   */
  static get randomBright(): Color {
    return Color.hsl(rand(0, 360), 100, rand(50, 85));
  }

  /**
   * Gets a random dim color.
   *
   * @returns {Color} A new Color instance representing the random dim color.
   */
  static get randomDim(): Color {
    return Color.hsl(rand(0, 360), 50, rand(15, 50));
  }

  // [Color table] 256-color lookup table (8bit)

  /**
   * Choose an index from the 256-color lookup table.
   * @param index A number between 0-255 which represent a cell index
   *              0-7:  black..white,
   *              8-15: brightBlack...brightWhite
   *              16-231:  6 × 6 × 6 cube (216 colors): 16 + 36 × r + 6 × g + b (0 ≤ r, g, b ≤ 5).
   *              235-255: grayscale from dark to light in 24 steps.
   * @returns {Color} A new Color instance corresponding to the provided index color.
   */
  static table256(index: number): Color {
    if (index > 255 || index < 0)
      throw new TypeError(
        "Expected a number between 0-255 as value parameter."
      );
    return new Color(`5;${index}`);
  }

  // [True colors] Custom Colors, 24 bit.

  /**
   * Creates a `Color` object from RGB (Red, Green, Blue) values.
   *
   * @param red The red component of the color, typically a value between 0 and 255.
   * @param green The green component of the color, typically a value between 0 and 255.
   * @param blue The blue component of the color, typically a value between 0 and 255.
   * @returns {Color} A new Color instance corresponding to the provided RGB values.
   */
  static rgb(red: number, green: number, blue: number): Color {
    if (green > 255 || green < 0)
      throw new TypeError("Expected green to be a number between 0-255.");
    if (blue > 255 || blue < 0)
      throw new TypeError("Expected blue to be a number between 0-255.");
    if (red > 255 || red < 0)
      throw new TypeError("Expected red to be a number between 0-255.");

    return new Color(`2;${red};${green};${blue}`);
  }

  /**
   * Creates a `Color` object from HSL (Hue, Saturation, Lightness) values.
   *
   * @param hue The hue of the color, typically a value between 0 and 360 degrees.
   * @param saturation The saturation of the color, typically a percentage value between 0 and 100.
   * @param lightness The lightness of the color, typically a percentage value between 0 and 100.
   * @returns {Color} A new Color instance corresponding to the provided HSL values.
   */
  static hsl(hue: number, saturation: number, lightness: number): Color {
    if (hue > 360 || hue < 0)
      throw new TypeError("Expected hue to be a number between 0-360.");
    if (saturation > 100 || saturation < 0)
      throw new TypeError("Expected saturation to be a number between 0-100.");
    if (lightness > 100 || lightness < 0)
      throw new TypeError("Expected lightness to be a number between 0-100.");

    const s = saturation / 100;
    const l = lightness / 100;

    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((hue / 60) % 2) - 1));
    const m = l - c / 2;

    let r, g, b;

    if (hue < 60) {
      r = c;
      g = x;
      b = 0;
    } else if (hue < 120) {
      r = x;
      g = c;
      b = 0;
    } else if (hue < 180) {
      r = 0;
      g = c;
      b = x;
    } else if (hue < 240) {
      r = 0;
      g = x;
      b = c;
    } else if (hue < 300) {
      r = x;
      g = 0;
      b = c;
    } else {
      r = c;
      g = 0;
      b = x;
    }

    return Color.rgb(
      Math.round((r + m) * 255),
      Math.round((g + m) * 255),
      Math.round((b + m) * 255)
    );
  }

  /**
   * Creates a `Color` instance from a hexadecimal color code.
   *
   * @param hexCode A string representing the color in hexadecimal format (e.g., `#FF5733`).
   * @returns {Color} A new Color instance corresponding to the provided hex code.
   */
  static hex(hexCode: string): Color {
    if (!/^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hexCode))
      throw new TypeError(
        "Expected a valid hexadecimal color code as value parameter."
      );

    hexCode = hexCode.replace("#", "");

    // Handle shorthand
    if (hexCode.length === 3) {
      hexCode = hexCode
        .split("")
        .map((char) => char + char)
        .join("");
    }

    return Color.rgb(
      parseInt(hexCode.slice(0, 2), 16),
      parseInt(hexCode.slice(2, 4), 16),
      parseInt(hexCode.slice(4, 6), 16)
    );
  }
}
