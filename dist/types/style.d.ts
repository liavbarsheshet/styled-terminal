/**
 * @fileoverview Style Module
 *
 * Creates a style infrastructure for terminal text.
 *
 * @author Liav Barsheshet <liavbarsheshet@gmail.com>
 * @copyright Liav Barsheshet <LBDevelopments> © 2025
 */
import { Color } from "./color.js";
/** Represents allowed ANSI escape sequences. */
type TAnsi = string;
/**
 * Represents a style used for terminal text.
 */
export declare class Style extends Function {
    /** Chain of styles. */
    modifiers: TAnsi[];
    private applyModifier;
    constructor(style?: Style);
    /**
     * Resets all the current style modifiers.
     *
     * @returns {Style} A new `Style` instance for fluent method chaining.
     */
    get reset(): Style;
    /**
     * Hides the text.
     *
     * @returns {Style} A new `Style` instance for fluent method chaining.
     */
    get hidden(): Style;
    /**
     * Force revealing a hidden text.
     *
     * @returns {Style} A new `Style` instance for fluent method chaining.
     */
    get reveal(): Style;
    /**
     * Sets visibility to be auto.
     *
     * @returns {Style} A new `Style` instance for fluent method chaining.
     */
    get autoVisibility(): Style;
    /**
     * Mode that swaps foreground and background colors.
     *
     * @returns {Style} A new `Style` instance for fluent method chaining.
     */
    get invert(): Style;
    /**
     * Force disable the mode that swaps foreground and background colors.
     *
     * @returns {Style} A new `Style` instance for fluent method chaining.
     */
    get noInvert(): Style;
    /**
     * Sets the mode that swaps foreground and background colors to auto.
     *
     * @returns {Style} A new `Style` instance for fluent method chaining.
     */
    get autoInvert(): Style;
    /**
     * Sets the font weight of the text to bold.
     *
     * @returns {Style} A new `Style` instance for fluent method chaining.
     */
    get bold(): Style;
    /**
     * Sets the font weight of the text to light.
     *
     * @returns {Style} A new `Style` instance for fluent method chaining.
     */
    get light(): Style;
    /**
     * Sets the font weight of the text to normal.
     *
     * @returns {Style} A new `Style` instance for fluent method chaining.
     */
    get normal(): Style;
    /**
     * Sets the font weight of the text to auto.
     *
     * @returns {Style} A new `Style` instance for fluent method chaining.
     */
    get autoFontWeight(): Style;
    /**
     * Applies italic styling to the text.
     *
     * @returns {Style} A new `Style` instance for fluent method chaining.
     */
    get italic(): Style;
    /**
     * Force remove italic styling from the text.
     *
     * @returns {Style} A new `Style` instance for fluent method chaining.
     */
    get noItalic(): Style;
    /**
     * Sets italic styling of the text to auto.
     *
     * @returns {Style} A new `Style` instance for fluent method chaining.
     */
    get autoItalic(): Style;
    /**
     * Applies underline styling to the text.
     *
     * @returns {Style} A new `Style` instance for fluent method chaining.
     */
    get underline(): Style;
    /**
     * Applies double underline styling to the text.
     *
     * @returns {Style} A new `Style` instance for fluent method chaining.
     */
    get doubleUnderline(): Style;
    /**
     * Force remove any underline styling from the text.
     *
     * @returns {Style} A new `Style` instance for fluent method chaining.
     */
    get noUnderline(): Style;
    /**
     * Sets any underline styling from the text to auto.
     *
     * @returns {Style} A new `Style` instance for fluent method chaining.
     */
    get autoUnderline(): Style;
    /**
     * Applies strikethrough styling to the text.
     *
     * @returns {Style} A new `Style` instance for fluent method chaining.
     */
    get strikethrough(): Style;
    /**
     * Force remove any strikethrough styling from the text.
     *
     * @returns {Style} A new `Style` instance for fluent method chaining.
     */
    get noStrikethrough(): Style;
    /**
     * Sets any strikethrough styling from the text to auto.
     *
     * @returns {Style} A new `Style` instance for fluent method chaining.
     */
    get autoStrikethrough(): Style;
    /**
     * Force resetting the foreground color to the terminal default value.
     *
     * @returns {Style} A new `Style` instance for fluent method chaining.
     */
    get resetFg(): Style;
    /**
     * Setting the foreground color to auto.
     *
     * @returns {Style} A new `Style` instance for fluent method chaining.
     */
    get autoFg(): Style;
    /**
     * Sets the foreground color of the text.
     *
     * @param color A Color instance representing a color.
     * @returns {Style} A new `Style` instance for fluent method chaining.
     */
    fg(color: Color): Style;
    /**
     * Force resetting the background color to the terminal default value.
     *
     * @returns {Style} A new `Style` instance for fluent method chaining.
     */
    get resetBg(): Style;
    /**
     * Setting the background color to be auto.
     *
     * @returns {Style} A new `Style` instance for fluent method chaining.
     */
    get autoBg(): Style;
    /**
     * Sets the background color of the text.
     *
     * @param color A Color instance representing a color.
     * @returns {StyleObject} A new `Style` instance for fluent method chaining.
     */
    bg(color: Color): Style;
    /**
     * Begins a style chain for terminal output.
     * Applies the specified styles until explicitly ended.
     */
    start(): string;
    /**
     * Ends the current style chain or resets terminal styles.
     */
    end(): string;
    /**
     * Applies a style to a string by concatenating it with additional strings.
     *
     * @param str The base string to apply the style to.
     * @param args Additional strings to concatenate.
     * @returns {string} The styled and concatenated string.
     */
    apply(str: string, ...args: string[]): string;
}
export {};
