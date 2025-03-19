/**
 * @fileoverview Color Module.
 *
 * A simple way of creating colors to style the terminal.
 *
 * @author Liav Barsheshet <liavbarsheshet@gmail.com>
 * @copyright Liav Barsheshet <LBDevelopments> © 2025
 */

import { rand, TRange } from "./util";

/**
 * Invalid Color Error
 */
class InvalidColor extends Error {
  constructor(property: string, legal: string) {
    super(`The color property '${property}' is invalid. It should be ${legal}.`);
  }
}

/** Represents a color ansi code. */
export type TColor = `5;${number}` | `2;${number};${number};${number}`;

/**
 * Represents a Color.
 */
export class Color {
  // [Default Colors]

  /**
   * Gets the default black color.
   *
   * @returns {TColor} A partial ANSI code representing the default black color.
   */
  static get black(): TColor {
    return Color.table256(0);
  }

  /**
   * Gets the default bright black color.
   *
   * @returns {TColor} A partial ANSI code representing the default bright black color.
   */
  static get brightBlack(): TColor {
    return Color.table256(8);
  }

  /**
   * Gets the default red color.
   *
   * @returns {TColor} A partial ANSI code representing the default red color.
   */
  static get red(): TColor {
    return Color.table256(1);
  }

  /**
   * Gets the default bright red color.
   *
   * @returns {TColor} A partial ANSI code representing the default bright red color.
   */
  static get brightRed(): TColor {
    return Color.table256(9);
  }

  /**
   * Gets the default green color.
   *
   * @returns {TColor} A partial ANSI code representing the default green color.
   */
  static get green(): TColor {
    return Color.table256(2);
  }

  /**
   * Gets the default bright green color.
   *
   * @returns {TColor} A partial ANSI code representing the default bright green color.
   */
  static get brightGreen(): TColor {
    return Color.table256(10);
  }

  /**
   * Gets the default yellow color.
   *
   * @returns {TColor} A partial ANSI code representing the default yellow color.
   */
  static get yellow(): TColor {
    return Color.table256(3);
  }

  /**
   * Gets the default bright yellow color.
   *
   * @returns {TColor} A partial ANSI code representing the default bright yellow color.
   */
  static get brightYellow(): TColor {
    return Color.table256(11);
  }

  /**
   * Gets the default blue color.
   *
   * @returns {TColor} A partial ANSI code representing the default blue color.
   */
  static get blue(): TColor {
    return Color.table256(4);
  }

  /**
   * Gets the default bright blue color.
   *
   * @returns {TColor} A partial ANSI code representing the default bright blue color.
   */
  static get brightBlue(): TColor {
    return Color.table256(12);
  }

  /**
   * Gets the default magenta color.
   *
   * @returns {TColor} A partial ANSI code representing the default magenta color.
   */
  static get magenta(): TColor {
    return Color.table256(5);
  }

  /**
   * Gets the default bright magenta color.
   *
   * @returns {TColor} A partial ANSI code representing the default bright magenta color.
   */
  static get brightMagenta(): TColor {
    return Color.table256(13);
  }

  /**
   * Gets the default cyan color.
   *
   * @returns {TColor} A partial ANSI code representing the default cyan color.
   */
  static get cyan(): TColor {
    return Color.table256(6);
  }

  /**
   * Gets the default bright cyan color.
   *
   * @returns {TColor} A partial ANSI code representing the default bright cyan color.
   */
  static get brightCyan(): TColor {
    return Color.table256(14);
  }

  /**
   * Gets the default white color.
   *
   * @returns {TColor} A partial ANSI code representing the default white color.
   */
  static get white(): TColor {
    return Color.table256(7);
  }

  /**
   * Gets the default bright white color.
   *
   * @returns {TColor} A partial ANSI code representing the default bright white color.
   */
  static get brightWhite(): TColor {
    return Color.table256(15);
  }

  /**
   * Gets a random color.
   *
   * @returns {TColor} A partial ANSI code representing the random color.
   */
  static get random(): TColor {
    return Color.hsl(rand(0, 360), rand(0, 100), rand(0, 100));
  }

  /**
   * Gets a random bright color.
   *
   * @returns {TColor} A partial ANSI code representing the random bright color.
   */
  static get randomBright(): TColor {
    return Color.hsl(rand(0, 360), 100, rand(50, 85));
  }

  /**
   * Gets a random dim color.
   *
   * @returns {TColor} A partial ANSI code representing the random dim color.
   */
  static get randomDim(): TColor {
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
   * @returns {TColor} A partial ansi code corresponding to the provided index color.
   */
  static table256(index: number): TColor {
    if (index > 255 || index < 0) throw new InvalidColor("index", "a number between 0-255");
    return `5;${index}`;
  }

  // [True colors] Custom Colors, 24 bit.

  /**
   * Creates a `Color` object from RGB (Red, Green, Blue) values.
   *
   * @param red The red component of the color, typically a value between 0 and 255.
   * @param green The green component of the color, typically a value between 0 and 255.
   * @param blue The blue component of the color, typically a value between 0 and 255.
   * @returns {TColor} A partial ansi code corresponding to the provided RGB values.
   */
  static rgb(red: number, green: number, blue: number): TColor {
    if (green > 255 || green < 0) throw new InvalidColor("green", "a number between 0-255");
    if (blue > 255 || blue < 0) throw new InvalidColor("blue", "a number between 0-255");
    if (red > 255 || red < 0) throw new InvalidColor("red", "a number between 0-255");

    return `2;${red};${green};${blue}`;
  }

  /**
   * Creates a `Color` object from HSL (Hue, Saturation, Lightness) values.
   *
   * @param hue The hue of the color, typically a value between 0 and 360 degrees.
   * @param saturation The saturation of the color, typically a percentage value between 0 and 100.
   * @param lightness The lightness of the color, typically a percentage value between 0 and 100.
   * @returns {TColor} A partial ansi code corresponding to the provided HSL values.
   */
  static hsl(hue: number, saturation: number, lightness: number): TColor {
    if (hue > 360 || hue < 0) throw new InvalidColor("hue", "a number between 0-360");
    if (saturation > 100 || saturation < 0)
      throw new InvalidColor("saturation", "a number between 0-100");
    if (lightness > 100 || lightness < 0)
      throw new InvalidColor("lightness", "a number between 0-100");

    saturation /= 100;
    lightness /= 100;

    const k = (n: number) => (n + hue / 30) % 12;
    const a = saturation * Math.min(lightness, 1 - lightness);

    const f = (n: number) => lightness - a * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1));

    return Color.rgb(Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255));
  }

  /**
   * Creates a `Color` instance from a hexadecimal color code.
   *
   * @param hexCode A string representing the color in hexadecimal format (e.g., `#FF5733` or `FF5733`).
   * @returns {string} A `Color` object corresponding to the provided hex code.
   */
  static hex(hexCode: string): TColor {
    if (!/^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hexCode))
      throw new InvalidColor("hexCode", "a valid hex color code.");

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
