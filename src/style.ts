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

/**
 * Represents the modifiers and their location.
 */
enum EModifiers {
  /** Represents font weight modifier (Bold, Light and Normal). */
  FontWeight,
  /** Represent italic modifier.*/
  Italic,
  /** Represent underline decoration modifier.*/
  Underline,
  /** Represent strikethrough decoration modifier. */
  Strikethrough,
  /** Represent foreground color modifier. */
  ForegroundColor,
  /** Represent background color modifier. */
  BackgroundColor,
  /** Represent invert mode modifier. */
  Invert,
  /** Represent visibility mode modifier. */
  Visibility,
}

/** Represents allowed ANSI escape sequences. */
type TAnsi = string;

/** Marks the end of a specific style. */
const END_SEQUENCE: TAnsi = `\x1b[0m`;

/**
 * Represents a style used for terminal text.
 */
export class Style {
  /** Chain of styles. */
  #chain: TAnsi[];

  private applyModifier(modifier: EModifiers, code: TAnsi = ""): Style {
    let new_style = new Style(this);
    new_style.#chain[modifier] = code;
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
    return this.applyModifier(EModifiers.Visibility, `\x1b[8m`);
  }

  /**
   * Force revealing a hidden text.
   *
   * @returns {Style} A new `Style` instance for fluent method chaining.
   */
  get reveal(): Style {
    return this.applyModifier(EModifiers.Visibility, `\x1b[28m`);
  }

  /**
   * Sets visibility to be auto.
   *
   * @returns {Style} A new `Style` instance for fluent method chaining.
   */
  get autoVisibility(): Style {
    return this.applyModifier(EModifiers.Visibility);
  }

  /**
   * Mode that swaps foreground and background colors.
   *
   * @returns {Style} A new `Style` instance for fluent method chaining.
   */
  get invert(): Style {
    return this.applyModifier(EModifiers.Invert, `\x1b[7m`);
  }

  /**
   * Force disable the mode that swaps foreground and background colors.
   *
   * @returns {Style} A new `Style` instance for fluent method chaining.
   */
  get noInvert(): Style {
    return this.applyModifier(EModifiers.Invert, `\x1b[27m`);
  }

  /**
   * Sets the mode that swaps foreground and background colors to auto.
   *
   * @returns {Style} A new `Style` instance for fluent method chaining.
   */
  get autoInvert(): Style {
    return this.applyModifier(EModifiers.Invert);
  }

  /**
   * Sets the font weight of the text to bold.
   *
   * @returns {Style} A new `Style` instance for fluent method chaining.
   */
  get bold(): Style {
    return this.applyModifier(EModifiers.FontWeight, `\x1b[1m`);
  }

  /**
   * Sets the font weight of the text to light.
   *
   * @returns {Style} A new `Style` instance for fluent method chaining.
   */
  get light(): Style {
    return this.applyModifier(EModifiers.FontWeight, `\x1b[2m`);
  }

  /**
   * Sets the font weight of the text to normal.
   *
   * @returns {Style} A new `Style` instance for fluent method chaining.
   */
  get normal(): Style {
    return this.applyModifier(EModifiers.FontWeight, `\x1b[21m\x1b[22m`);
  }

  /**
   * Sets the font weight of the text to auto.
   *
   * @returns {Style} A new `Style` instance for fluent method chaining.
   */
  get autoFontWeight(): Style {
    return this.applyModifier(EModifiers.FontWeight);
  }

  /**
   * Applies italic styling to the text.
   *
   * @returns {Style} A new `Style` instance for fluent method chaining.
   */
  get italic(): Style {
    return this.applyModifier(EModifiers.Italic, `\x1b[3m`);
  }

  /**
   * Force remove italic styling from the text.
   *
   * @returns {Style} A new `Style` instance for fluent method chaining.
   */
  get noItalic(): Style {
    return this.applyModifier(EModifiers.Italic, `\x1b[23m`);
  }

  /**
   * Sets italic styling of the text to auto.
   *
   * @returns {Style} A new `Style` instance for fluent method chaining.
   */
  get autoItalic(): Style {
    return this.applyModifier(EModifiers.Italic);
  }

  /**
   * Applies underline styling to the text.
   *
   * @returns {Style} A new `Style` instance for fluent method chaining.
   */
  get underline(): Style {
    return this.applyModifier(EModifiers.Underline, `\x1b[4m`);
  }

  /**
   * Force remove any underline styling from the text.
   *
   * @returns {Style} A new `Style` instance for fluent method chaining.
   */
  get noUnderline(): Style {
    return this.applyModifier(EModifiers.Underline, `\x1b[24m`);
  }

  /**
   * Sets any underline styling from the text to auto.
   *
   * @returns {Style} A new `Style` instance for fluent method chaining.
   */
  get autoUnderline(): Style {
    return this.applyModifier(EModifiers.Underline);
  }

  /**
   * Applies strikethrough styling to the text.
   *
   * @returns {Style} A new `Style` instance for fluent method chaining.
   */
  get strikethrough(): Style {
    return this.applyModifier(EModifiers.Strikethrough, `\x1b[9m`);
  }

  /**
   * Force remove any strikethrough styling from the text.
   *
   * @returns {Style} A new `Style` instance for fluent method chaining.
   */
  get noStrikethrough(): Style {
    return this.applyModifier(EModifiers.Strikethrough, `\x1b[29m`);
  }

  /**
   * Sets any strikethrough styling from the text to auto.
   *
   * @returns {Style} A new `Style` instance for fluent method chaining.
   */
  get autoStrikethrough(): Style {
    return this.applyModifier(EModifiers.Strikethrough);
  }

  /**
   * Force resetting the foreground color to the terminal default value.
   *
   * @returns {Style} A new `Style` instance for fluent method chaining.
   */
  get resetFg(): Style {
    return this.applyModifier(EModifiers.ForegroundColor, `\x1b[39m`);
  }

  /**
   * Setting the foreground color to auto.
   *
   * @returns {Style} A new `Style` instance for fluent method chaining.
   */
  get autoFg(): Style {
    return this.applyModifier(EModifiers.ForegroundColor);
  }

  /**
   * Sets the foreground color of the text.
   *
   * @param color A Color instance representing a color.
   * @returns {Style} A new `Style` instance for fluent method chaining.
   */
  fg(color: Color): Style {
    return this.applyModifier(EModifiers.ForegroundColor, `\x1b[38;${color.code}m`);
  }

  /**
   * Force resetting the background color to the terminal default value.
   *
   * @returns {Style} A new `Style` instance for fluent method chaining.
   */
  get resetBg(): Style {
    return this.applyModifier(EModifiers.BackgroundColor, `\x1b[49m`);
  }

  /**
   * Setting the background color to be auto.
   *
   * @returns {Style} A new `Style` instance for fluent method chaining.
   */
  get autoBg(): Style {
    return this.applyModifier(EModifiers.BackgroundColor);
  }

  /**
   * Sets the background color of the text.
   *
   * @param color A Color instance representing a color.
   * @returns {StyleObject} A new `Style` instance for fluent method chaining.
   */
  bg(color: Color): Style {
    return this.applyModifier(EModifiers.BackgroundColor, `\x1b[48;${color.code}m`);
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
    if (typeof str !== "string" || args.filter((v) => typeof v !== "string").length)
      throw new InvalidParameter("string, [string...]", "a valid string");

    // String concatenation
    str = `${str}${args.length ? " " : ""}${args.join(" ")}`;

    const chain: string = this.#chain.join("");

    if (!chain.length || !str.length) return str;

    // Nested styles logic.
    const segments = str.split(END_SEQUENCE);

    if (!segments[segments.length - 1].length) segments.pop();

    return segments.map((segment) => `${chain}${segment}`).join(END_SEQUENCE) + END_SEQUENCE;
  }
}
