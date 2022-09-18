type BaseColors =
  | "black"
  | "red"
  | "green"
  | "yellow"
  | "blue"
  | "magenta"
  | "cyan"
  | "white";

type Color =
  | BaseColors
  | "rand"
  | "random"
  | "random normal"
  | "random semi-bright"
  | "random bright"
  | "random semi-dark"
  | "random dark"
  | "rand normal"
  | "rand semi-bright"
  | "rand bright"
  | "rand semi-dark"
  | "rand dark"
  | "#000000"
  | "rgb(0,0,0)"
  | "hsl(0,0%,0%)";

type StyleObject = {
  weight?: "bold" | "light" | "auto";
  style?: "italic";
  decoration?: "underline" | "crossed" | "overline";
  foreground?: Color;
  background?: Color;
  color?: Color;
  bg?: Color;
  underlineColor?: Color;
  visibility?: "hidden" | "visible";
  border?: "box" | "circle";
  font?:
    | "0"
    | "1"
    | "2"
    | "3"
    | "4"
    | "5"
    | "6"
    | "7"
    | "8"
    | "9"
    | "10"
    | "fraktur"
    | "gothic";
  blink?: "slow" | "fast";
  colorMode?: "auto" | "invert";
};

type Styles = { [key: string]: StyleObject };

type Colors = { [key: string]: Color };

type Data = { [key: string]: string };

type CallBack = (err: Error, res: string | undefined) => {};

type Preset = "rainbow" | "money";

declare global {
  interface String {
    /**
     * Styles this string with given style object.
     * Worst-Case Time complexity O(1) | O(n) - if multiple properties are not efficient.
     *
     * @param {styleObject} styleObject Style object or a name of saved style template.
     * @returns {string} Current string without any style.
     */
    style(styleObject: StyleObject): string;

    /**
     * Apply preset on this string.
     * Worst-Case Time complexity: O(preset).
     *
     * @see {@link ./lib/presets.js}
     *
     * @param {Preset} presetName Preset name.
     * @param {any[]} args Preset arguments.
     * @returns {string} Styled string.
     */
    preset(presetName: Preset, ...args: any[]): string;

    /**
     * Clears this string from any styles.
     * Worst-Case Time complexity O(|this|)
     *
     * @returns {string} Current string without any style.
     */
    clearStyle(): string;
  }
}

/**
 * Clears a string from any styles.
 * Worst-Case Time complexity O(|str|)
 *
 * @param {string} str string.
 * @returns {string} string without any style.
 */
export function clear(str: string): string;

/**
 * Apply style on a given string.
 * Worst-Case Time complexity O(1) | O(n) - if multiple properties are not efficient.
 *
 * @param {string} str string to be styled.
 * @param {StyleObject} styleObject Style object.
 * @returns {string} Styled string.
 */
export function apply(str: string, styleObject: StyleObject): string;

/**
 * Apply preset on a given string.
 * Worst-Case Time complexity O(1) | O(|str|) - if multiple properties are not efficient.
 *
 * @see {@link ./lib/presets.js}
 *
 * @param {string} str string to be styled.
 * @param {Preset} presetName Preset name.
 * @param {any[]} args Preset arguments.
 * @returns {string} Styled string.
 */
export function preset(str: string, presetName: Preset, ...args: any[]): string;

/**
 * Saves style as template within a given name.
 * Worst-Case Time complexity O(1).
 *
 * @param {string} name Style name.
 * @param {StyleObject} styleObject Style object.
 */
export function saveStyle(name: string, styleObject: StyleObject): void;

/**
 * Saves color as template within a given name.
 * Worst-Case Time complexity O(1).
 *
 * @param {string} name Style name.
 * @param {Color} color Color in formats: (BaseColor|HEXColor|RGBColor|HSLColor)
 */
export function saveColor(name: string, color: Color): void;

/**
 * Saves multiples styles from js object.
 * Worst-Case Time complexity O(1).
 *
 * @param {Styles} styles Styles object.
 */
export function saveStyles(styles: Styles): void;

/**
 * Saves multiples color as template within a given js object.
 * Worst-Case Time complexity O(1).
 *
 * @param {Colors} colors  Colors object.
 */
export function saveColors(colors: Colors): void;

/**
 * Saves template auto detection (COLOR|STYLE)
 * Worst-Case Time complexity O(1).
 *
 * @param {string} name Style name.
 * @param {Styles & Colors} template Template
 */
export function save(name: string, template: Styles & Colors): void;

/**
 * Renders style of a txt file [Callback].
 * @param {string} file File path.
 * @param {CallBack} [cb] Callback function.
 */
export function render(file: string, cb: CallBack): void;

/**
 * Renders style of a txt file [Callback].
 * @param {string} file File path.
 * @param {Data} data Data parameters.
 * @param {CallBack} [cb] Callback function.
 */
export function render(file: string, data: Data, cb: CallBack): void;

/**
 * Renders style of a txt file [Sync].
 * @param {string} file File path.
 * @param {Data} [data] Data parameters.
 * @returns {string} Encoded string.
 */
export function renderSync(file: string, data?: Data): string;

/**
 * Renders style of a txt file [Promise].
 * @param {string} file File path.
 * @param {Data} [data] Data parameters.
 * @returns {Promise} A new promise.
 */
export function renderAsync(file: string, data?: Data): Promise<string>;
