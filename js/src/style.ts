import { TColor } from "./color";

type TAnsi = string &
  `\x1b[${0 | 1 | 2 | 3 | 4 | 7 | 8 | 9 | 22 | 23 | 24 | 27 | 28 | 29 | 39 | 49 | TColor}m`;

/** Marks the end of a specific style. */
const END_SEQUENCE: TAnsi = `\x1b[0m`;

/**
 * Represents a style object used for terminal text styling.
 */
interface StyleObject {
  /** The current style chain. */
  chain: TAnsi[];

  // [Style Modifiers]

  /**
   * Resets the current style.
   *
   * @returns {StyleObject} A `StyleObject` that allows for method chaining.
   */
  get reset(): StyleObject;

  /**
   * Hides the text.
   *
   * @returns {StyleObject} A `StyleObject` that allows for method chaining.
   */
  get hidden(): StyleObject;

  /**
   * Reveals hidden text.
   *
   * @returns {StyleObject} A `StyleObject` that allows for method chaining.
   */
  get reveal(): StyleObject;

  /**
   * Applies bold styling to the text.
   *
   * @returns {StyleObject} A `StyleObject` that allows for method chaining.
   */
  get bold(): StyleObject;

  /**
   * Applies dim styling to the text.
   *
   * @returns {StyleObject} A `StyleObject` that allows for method chaining.
   */
  get dim(): StyleObject;

  /**
   * Applies italic styling to the text.
   *
   * @returns {StyleObject} A `StyleObject` that allows for method chaining.
   */
  get italic(): StyleObject;

  /**
   * Applies underline styling to the text.
   *
   * @returns {StyleObject} A `StyleObject` that allows for method chaining.
   */
  get underline(): StyleObject;

  /**
   * Applies strikethrough styling to the text.
   *
   * @returns {StyleObject} A `StyleObject` that allows for method chaining.
   */
  get strikethrough(): StyleObject;

  // [Color Methods]

  /**
   * Sets the foreground color of the text.
   *
   * @param color A partial ANSI color code.
   * @returns {StyleObject} A `StyleObject` that allows for method chaining.
   */
  fg(color: TColor): StyleObject;

  /**
   * Sets the background color of the text.
   *
   * @param color A partial ANSI color code.
   * @returns {StyleObject} A `StyleObject` that allows for method chaining.
   */
  bg(color: TColor): StyleObject;

  /**
   * Returns the styled text as a string.
   *
   * @returns {string} The final styled text including ANSI codes.
   */
  toString(): string;
}

/**
 * Helper function that takes a style object and applies a modifer to it.
 */
function apply(style: StyleObject, code: TAnsi): StyleObject {}
