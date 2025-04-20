/** Represents a partial ansi color escape code. */
type TColorCode = string;
/**
 * Represents a Color.
 */
export declare class Color {
    #private;
    /**
     * Construct a new Color instance.
     * @constructor
     * @param code A partial ANSI code representing a color.
     */
    constructor(code: TColorCode);
    /**
     * Gets the partial ansi color escape sequence.
     * @returns {TColorCode} A partial ANSI code representing a color.
     */
    get code(): TColorCode;
    /**
     * Gets the default black color.
     *
     * @returns {Color} A new Color instance representing the default black color.
     */
    static get black(): Color;
    /**
     * Gets the default bright black color.
     *
     * @returns {Color} A new Color instance representing the default bright black color.
     */
    static get brightBlack(): Color;
    /**
     * Gets the default red color.
     *
     * @returns {Color} A new Color instance representing the default red color.
     */
    static get red(): Color;
    /**
     * Gets the default bright red color.
     *
     * @returns {Color} A new Color instance representing the default bright red color.
     */
    static get brightRed(): Color;
    /**
     * Gets the default green color.
     *
     * @returns {Color} A new Color instance representing the default green color.
     */
    static get green(): Color;
    /**
     * Gets the default bright green color.
     *
     * @returns {Color} A new Color instance representing the default bright green color.
     */
    static get brightGreen(): Color;
    /**
     * Gets the default yellow color.
     *
     * @returns {Color} A new Color instance representing the default yellow color.
     */
    static get yellow(): Color;
    /**
     * Gets the default bright yellow color.
     *
     * @returns {Color} A new Color instance representing the default bright yellow color.
     */
    static get brightYellow(): Color;
    /**
     * Gets the default blue color.
     *
     * @returns {Color} A new Color instance representing the default blue color.
     */
    static get blue(): Color;
    /**
     * Gets the default bright blue color.
     *
     * @returns {Color} A new Color instance representing the default bright blue color.
     */
    static get brightBlue(): Color;
    /**
     * Gets the default magenta color.
     *
     * @returns {Color} A new Color instance representing the default magenta color.
     */
    static get magenta(): Color;
    /**
     * Gets the default bright magenta color.
     *
     * @returns {Color} A new Color instance representing the default bright magenta color.
     */
    static get brightMagenta(): Color;
    /**
     * Gets the default cyan color.
     *
     * @returns {Color} A new Color instance representing the default cyan color.
     */
    static get cyan(): Color;
    /**
     * Gets the default bright cyan color.
     *
     * @returns {Color} A new Color instance representing the default bright cyan color.
     */
    static get brightCyan(): Color;
    /**
     * Gets the default white color.
     *
     * @returns {Color} A new Color instance representing the default white color.
     */
    static get white(): Color;
    /**
     * Gets the default bright white color.
     *
     * @returns {Color} A new Color instance representing the default bright white color.
     */
    static get brightWhite(): Color;
    /**
     * Gets a random color.
     *
     * @returns {Color} A new Color instance representing the random color.
     */
    static get random(): Color;
    /**
     * Gets a random bright color.
     *
     * @returns {Color} A partial ANSI code representing the random bright color.
     */
    static get randomBright(): Color;
    /**
     * Gets a random dim color.
     *
     * @returns {Color} A new Color instance representing the random dim color.
     */
    static get randomDim(): Color;
    /**
     * Choose an index from the 256-color lookup table.
     * @param index A number between 0-255 which represent a cell index
     *              0-7:  black..white,
     *              8-15: brightBlack...brightWhite
     *              16-231:  6 × 6 × 6 cube (216 colors): 16 + 36 × r + 6 × g + b (0 ≤ r, g, b ≤ 5).
     *              235-255: grayscale from dark to light in 24 steps.
     * @returns {Color} A new Color instance corresponding to the provided index color.
     */
    static table256(index: number): Color;
    /**
     * Creates a `Color` object from RGB (Red, Green, Blue) values.
     *
     * @param red The red component of the color, typically a value between 0 and 255.
     * @param green The green component of the color, typically a value between 0 and 255.
     * @param blue The blue component of the color, typically a value between 0 and 255.
     * @returns {Color} A new Color instance corresponding to the provided RGB values.
     */
    static rgb(red: number, green: number, blue: number): Color;
    /**
     * Creates a `Color` object from HSL (Hue, Saturation, Lightness) values.
     *
     * @param hue The hue of the color, typically a value between 0 and 360 degrees.
     * @param saturation The saturation of the color, typically a percentage value between 0 and 100.
     * @param lightness The lightness of the color, typically a percentage value between 0 and 100.
     * @returns {Color} A new Color instance corresponding to the provided HSL values.
     */
    static hsl(hue: number, saturation: number, lightness: number): Color;
    /**
     * Creates a `Color` instance from a hexadecimal color code.
     *
     * @param hexCode A string representing the color in hexadecimal format (e.g., `#FF5733`).
     * @returns {Color} A new Color instance corresponding to the provided hex code.
     */
    static hex(hexCode: string): Color;
}
export {};
