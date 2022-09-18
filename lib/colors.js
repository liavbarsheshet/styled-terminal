/*!
 * styled-terminal - Create, manage styles for console.
 *
 * [colors.js] - Manage/Encode colors.
 *
 * Author: Liav Barsheshet, LBDevelopments <liavbarsheshet@gmail.com, liavb@campus.technion.ac.il>
 * Website: https://www.liavbarsheshet.net
 * Copyright(c) 2020-2022 Liav Barsheshet <LBDevelopments>
 * MIT Licensed
 */

/**
 * @typedef rgbObject
 * @type {object}
 * @property {number} red - Red value (0-255).
 * @property {number} green - Green value (0-255).
 * @property {number} blue - Blue value (0-255).
 */

/**
 * @typedef baseColors
 * @type {("black"|"red"|"green"|"yellow"|"blue"|"magenta"|"cyan"|"white")}
 */

/** Default colors */
const colors = [
  "black",
  "red",
  "green",
  "yellow",
  "blue",
  "magenta",
  "cyan",
  "white",
];

/** Saves your favorite colors */
const colorPallet = {};

/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   {number}  h       The hue
 * @param   {number}  s       The saturation
 * @param   {number}  l       The lightness
 * @return  {rgbObject}           The Converted RGB object
 */
function hslToRgb(h, s, l) {
  s /= 100;
  l /= 100;
  let c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
    m = l - c / 2,
    r = 0,
    g = 0,
    b = 0;
  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);
  return { red: r, green: g, blue: b };
}

/**
 * Validates or generates a color with given color in Base Color format.
 * Worst-Case Time complexity O(1).
 *
 * @param {baseColors} color Base Color name.
 * @param {boolean} [validate] If set true this function will perform validation. (DEFAULT: false)
 * @returns {boolean|string} True|false if validate flag set to true, o.w an encoded color.
 */
function isBASE(color, validate) {
  if (typeof color != "string" || color.length > 7) return false;

  color = color.toLowerCase();
  const index = colors.indexOf(color);
  const validation = index > -1;

  if (validate) return validation;

  return `8;5;${index}`;
}

/**
 * Validates or generates a color with given color in HEX format.
 * Worst-Case Time complexity O(1).
 *
 * @param {string} color String representing HEX color. (e.g: #XXXXXX)
 * @param {boolean} [validate] If set true this function will perform validation. (DEFAULT: false)
 * @returns {boolean|string} True|false if validate flag set to true, o.w an encoded color.
 */
function isHEX(color, validate) {
  if (typeof color != "string" || color.length > 7) return false;

  const regex =
    /^#([0-9A-Fa-f][0-9A-Fa-f])([0-9A-Fa-f][0-9A-Fa-f])([0-9A-Fa-f][0-9A-Fa-f])$/im;
  color = color.toLowerCase();
  const validation = regex.test(color);

  if (validate) return validation;

  const match = regex.exec(color);

  const r = parseInt(match[1], 16);
  const g = parseInt(match[2], 16);
  const b = parseInt(match[3], 16);

  return `8;2;${r};${g};${b}`;
}

/**
 * Validates or generates a color with given color in RGB format.
 * Worst-Case Time complexity O(1).
 *
 * @param {string} color String representing RGB color. (e.g: rgb(255,255,255))
 * @param {boolean} [validate] If set true this function will perform validation. (DEFAULT: false)
 * @returns {boolean|string} True|false if validate flag set to true, o.w an encoded color.
 */
function isRGB(color, validate) {
  if (typeof color != "string" || color.length > 16) return false;

  const regex =
    /^rgb\((2[0-5][0-5]|1\d\d|[1-9]\d|\d),(2[0-5][0-5]|1\d\d|[1-9]\d|\d),(2[0-5][0-5]|1\d\d|[1-9]\d|\d)\)$/im;
  color = color.toLowerCase();
  const validation = regex.test(color);

  if (validate) return validation;

  const match = regex.exec(color);
  const r = match[1];
  const g = match[2];
  const b = match[3];

  return `8;2;${r};${g};${b}`;
}

/**
 * Validates or generates a color with given color in HSL format.
 * Worst-Case Time complexity O(1).
 *
 * @param {string} color String representing RGB color. (e.g: hsl(360,100%,100%))
 * @param {boolean} [validate] If set true this function will perform validation. (DEFAULT: false)
 * @returns {boolean|string} True|false if validate flag set to true, o.w an encoded color.
 */
function isHSL(color, validate) {
  if (typeof color != "string" || color.length > 18) return false;

  const regex =
    /^hsl\((360|3[0-5]\d|[12]\d\d|[1-9]\d|\d),(100|[1-9]\d|\d)%,(100|[1-9]\d|\d)%\)$/im;
  color = color.toLowerCase();
  const validation = regex.test(color);

  if (validate) return validation;

  const match = regex.exec(color);
  const rgb = hslToRgb(
    parseInt(match[1]),
    parseInt(match[2]),
    parseInt(match[3])
  );
  return `8;2;${rgb.red};${rgb.green};${rgb.blue}`;
}

/**
 * Validates or generates a random color with given color.
 * Worst-Case Time complexity O(1).
 *
 * @param {string} color String representing random color. ('rand', 'rand %mode','random', 'random normal%mode')
 * @param {boolean} [validate] If set true this function will perform validation. (DEFAULT: false)
 * @returns {boolean|string} True|false if validate flag set to true, o.w an encoded color.
 */
function isRandom(color, validate) {
  if (typeof color != "string" || color.length > 18) return false;
  const regex =
    /^(?:random|rand)(?: (dark|semi-dark|normal|semi-bright|bright)){0,1}$/;

  if (validate) return regex.test(color);
  const match = regex.exec(color);

  return isHSL(randomColor(match[1]));
}

/**
 * Validates or take a color from the color pallet.
 * Worst-Case Time complexity O(1).
 *
 * @param {string} color String representing RGB color. (e.g: hsl(360,100%,100%))
 * @param {boolean} [validate] If set true this function will perform validation. (DEFAULT: false)
 * @returns {boolean|string} True|false if validate flag set to true, o.w an encoded color.
 */
function isRegistered(color, validate) {
  if (typeof color != "string") return false;

  const validation = color in colorPallet;

  if (validate) return validation;

  return colorPallet[color];
}

/**
 * Returns a random number with a given range. (min <= r < max)
 * Worst-Case Time complexity O(1).
 *
 * @param {number} min Number represents the minimum number in range.
 * @param {number} max Number represents the maximum (not included) number in range.
 * @param {number} [seed] Number represents the accuracy (big and prime number will give the best result)
 * @returns {number} Random number.
 */
function randomNumber(min = 0, max = Number.MAX_SAFE_INTEGER, seed = 7) {
  if (typeof min != "number" || typeof max != "number") return -1;
  if (!seed || typeof seed != "number" || seed < 1) seed = 7;
  if (seed == 1) return Math.floor(Math.random() * (max - min)) + min;
  const diff = max - min;
  const rand_res = Math.floor(Math.random() * (diff * seed)) % diff;
  return rand_res + min;
}

/**
 * Generates random color.
 * Worst-Case Time complexity O(1).
 *
 * @param {('dark'|'normal'|'bright')} [mode] Specify color mode. (DEFAULT: 'normal')
 * @returns {string} Random color in HSL format.
 */
function randomColor(mode) {
  if (!mode || typeof mode != "string") mode = "normal";

  const modes = {
    dark: 20,
    "semi-dark": 35,
    normal: 50,
    "semi-bright": 45,
    bright: 80,
  };

  mode = mode.toLowerCase();
  if (!modes[mode]) mode = "normal";

  return `hsl(${randomNumber(0, 360)},100%,${modes[mode]}%)`;
}

/**
 * Encodes a color.
 * Worst-Case Time complexity O(1).
 *
 * @param {baseColors} color Color in formats: (BaseColor|HEXColor|RGBColor|HSLColor)
 * @returns {string} Encoded color.
 */
export function createColor(color) {
  if (isBASE(color, true)) return isBASE(color);
  if (isHSL(color, true)) return isHSL(color);
  if (isRGB(color, true)) return isRGB(color);
  if (isHEX(color, true)) return isHEX(color);
  if (isRandom(color, true)) return isRandom(color);
  if (isRegistered(color, true)) return isRegistered(color);
  return colors.indexOf("white");
}

/**
 * Saves a color into the color pallet.
 * Worst-Case Time complexity O(1).
 *
 * @param {string} name Color name.
 * @param {baseColors} color Color in formats: (BaseColor|HEXColor|RGBColor|HSLColor)
 */
export function saveColor(name, color) {
  if (!name || typeof name != "string") return;
  if (isBASE(color, true)) return (colorPallet[name] = isBASE(color));
  if (isHSL(color, true)) return (colorPallet[name] = isHSL(color));
  if (isRGB(color, true)) return (colorPallet[name] = isRGB(color));
  if (isHEX(color, true)) return (colorPallet[name] = isHEX(color));
}
