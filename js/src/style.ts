/**
 * @fileoverview Style Module
 *
 * Creates a style infrastructure for terminal text.
 *
 * @author Liav Barsheshet <liavbarsheshet@gmail.com>
 * @copyright Liav Barsheshet <LBDevelopments> © 2025
 */

import { Color, TColorCode } from "./color";
import { InvalidParameter } from "./errors";

/** Represents allowed ANSI escape sequences. */
type TAnsi = string &
  `\x1b[${
    | 0
    | 1
    | 2
    | 3
    | 4
    | 7
    | 8
    | 9
    | 22
    | 23
    | 24
    | 27
    | 28
    | 29
    | 39
    | 49
    | `38;${TColorCode}`
    | `48;${TColorCode}`}m`;

/** Marks the end of a specific style. */
const END_SEQUENCE: TAnsi = `\x1b[0m`;

/**
 * Represents a style used for terminal text.
 */
export class Style {
  /** Chain of styles. */
  #chain: TAnsi[];

  private applyModifier(style: Style, code?: TAnsi): Style {
    let new_style = new Style(style);
    if (code) new_style.#chain.push(code);
    return new_style;
  }

  constructor(style?: Style) {
    if (!style) this.#chain = [];
    else this.#chain = [...style.#chain];
  }

  /**
   * Resets all the current style modifiers.
   *
   * @returns {Style} A new `Style` instance for fluent method chaining.
   */
  get reset(): Style {
    return new Style();
  }

  /**
   * Hides the text.
   *
   * @returns {Style} A new `Style` instance for fluent method chaining.
   */
  get hidden(): Style {
    return this.applyModifier(this, `\x1b[8m`);
  }

  /**
   * Reveals a hidden text.
   *
   * @returns {Style} A new `Style` instance for fluent method chaining.
   */
  get reveal(): Style {
    return this.applyModifier(this, `\x1b[28m`);
  }

  /**
   * Sets the font weight of the text to bold.
   *
   * @returns {Style} A new `Style` instance for fluent method chaining.
   */
  get bold(): Style {
    return this.applyModifier(this, `\x1b[1m`);
  }

  /**
   * Sets the font weight of the text to light.
   *
   * @returns {Style} A new `Style` instance for fluent method chaining.
   */
  get light(): Style {
    return this.applyModifier(this, `\x1b[2m`);
  }

  /**
   * Sets the font weight of the text to normal.
   *
   * @returns {Style} A new `Style` instance for fluent method chaining.
   */
  get normal(): Style {
    return this.applyModifier(this, `\x1b[22m`);
  }

  /**
   * Applies italic styling to the text.
   *
   * @returns {Style} A new `Style` instance for fluent method chaining.
   */
  get italic(): Style {
    return this.applyModifier(this, `\x1b[3m`);
  }

  /**
   * Removes italic styling from the text.
   *
   * @returns {Style} A new `Style` instance for fluent method chaining.
   */
  get noItalic(): Style {
    return this.applyModifier(this, `\x1b[3m`);
  }

  /**
   * Applies underline styling to the text.
   *
   * @returns {Style} A new `Style` instance for fluent method chaining.
   */
  get underline(): Style {
    return this.applyModifier(this, `\x1b[4m`);
  }

  /**
   * removes any underline styling from the text.
   *
   * @returns {Style} A new `Style` instance for fluent method chaining.
   */
  get noUnderline(): Style {
    return this.applyModifier(this, `\x1b[24m`);
  }

  /**
   * Applies strikethrough styling to the text.
   *
   * @returns {Style} A new `Style` instance for fluent method chaining.
   */
  get strikethrough(): Style {
    return this.applyModifier(this, `\x1b[9m`);
  }

  /**
   * Removes any strikethrough styling from the text.
   *
   * @returns {Style} A new `Style` instance for fluent method chaining.
   */
  get noStrikethrough(): Style {
    return this.applyModifier(this, `\x1b[29m`);
  }

  // [Color Methods]

  /**
   * Resets the foreground color to the default value.
   *
   * @returns {Style} A new `Style` instance for fluent method chaining.
   */
  get resetFg(): Style {
    return this.applyModifier(this, `\x1b[39m`);
  }

  /**
   * Sets the foreground color of the text.
   *
   * @param color A Color instance representing a color.
   * @returns {Style} A new `Style` instance for fluent method chaining.
   */
  fg(color: Color): Style {
    return this.applyModifier(this, `\x1b[38;${color.code}m`);
  }

  /**
   * Resets the background color to the default value.
   *
   * @returns {Style} A new `Style` instance for fluent method chaining.
   */
  get resetBg(): Style {
    return this.applyModifier(this, `\x1b[49m`);
  }

  /**
   * Sets the background color of the text.
   *
   * @param color A Color instance representing a color.
   * @returns {StyleObject} A new `Style` instance for fluent method chaining.
   */
  bg(color: Color): Style {
    return this.applyModifier(this, `\x1b[48;${color.code}m`);
  }

  // [Style Application]

  /**
   * Applies a style to a string by concatenating it with additional strings.
   *
   * @param str The base string to apply the style to.
   * @param args Additional strings to concatenate.
   * @returns {string} The styled and concatenated string.
   */
  apply(str: string, ...args: string[]): string {
    // Accepting only strings.
    if (typeof str !== "string" || args.filter((v) => typeof v !== "string").length)
      throw new InvalidParameter("string, [string...]", "a valid string");

    // String concat.
    str = `${str}${args.length ? " " : ""}${args.join(" ")}`;

    if (!this.#chain.length || !str.length) return str;

    // Nested styles logic.
    const segments = str.split(END_SEQUENCE);

    return segments
      .map((segment, index) => {
        if (index < segments.length - 1) return `${this.#chain.join("")}${segment}`;

        if (!segment.length) return segment;

        return `${this.#chain.join("")}${segment}${END_SEQUENCE}`;
      })
      .join(END_SEQUENCE);
  }
}
