import { TColor } from "./color";

/** Represents a style object. */
interface StyleObject {
  /** Represents a style chain. */
  chain: string;

  // Style Modifiers

  /**
   * Sets a foreground color.
   *
   * @param color A partial ANSI color code.
   * @returns {StyleObject} A `StyleObject` that allows for method chaining.
   */
  fg(color: TColor): StyleObject;

  /**
   * Sets a background color.
   *
   * @param color A partial ANSI color code.
   * @returns {StyleObject} A `StyleObject` that allows for method chaining.
   */
  bg(color: TColor): StyleObject;
}
