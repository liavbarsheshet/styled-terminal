/*! 
 * styled-terminal - Create, manage styles for output terminal strings.
 * Author: Liav Barsheshet  <LBDevelopments>, liavbarsheshet@gmaik.com, liavb@campus.technion.ac.il
 * Website: https://www.liavbarsheshet.net
 * Copyright(c) 2020-2022 Liav Barsheshet
 * Version: 1.0.0
 * MIT Licensed
 */

/**
 * @typedef rgbObject
 * @type {object}
 * @property {number} red - Red color value (0-255).
 * @property {number} green - Green color value (0-255).
 * @property {number} blue - Blue color value (0-255).
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

/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   {number}  h       The hue
 * @param   {number}  s       The saturation
 * @param   {number}  l       The lightness
 * @return  {Array}           The RGB representation
 */
function hslToRgb(h, s, l) {
    s /= 100;
    l /= 100;
    let c = (1 - Math.abs(2 * l - 1)) * s,
        x = c * (1 - Math.abs((h / 60) % 2 - 1)),
        m = l - c / 2,
        r = 0,
        g = 0,
        b = 0;
    if (0 <= h && h < 60) {
        r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
        r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
        r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
        r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
        r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
        r = c; g = 0; b = x;
    }
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);
    return [r, g, b];
}

/**
 * This method validates a color or generates it with the base color format.
 * @param {string} color The color
 * @param {boolean} [validate] If set to true the method will perform validation instead of parsing.
 * @returns {boolean|string} Returns if validate is set a true or false others will return a parsed ansci code color.
 */
function isBASE(color, validate) {
    const index = colors.indexOf(color);
    if (validate === true) return index > -1
    return `5;${index}`;
}

/**
 * This method validates a color or generates it with the HEX format.
 * @param {string} color The color
 * @param {boolean} [validate] If set to true the method will perform validation instead of parsing.
 * @returns {boolean|string} Returns if validate is set a true or false others will return a parsed ansci code color.
 */
function isHEX(color, validate) {
    const regex = /^#([0-9A-Fa-f][0-9A-Fa-f])([0-9A-Fa-f][0-9A-Fa-f])([0-9A-Fa-f][0-9A-Fa-f])$/gmi;
    if (validate === true) return regex.test(color);
    const match = regex.exec(color);
    return `2;${parseInt(match[1], 16)};${parseInt(match[2], 16)};${parseInt(match[3], 16)}`;

}

/**
 * This method validates a color or generates it with the RGB format.
 * @param {string} color The color
 * @param {boolean} [validate] If set to true the method will perform validation instead of parsing.
 * @returns {boolean|string} Returns if validate is set a true or false others will return a parsed ansci code color.
 */
function isRGB(color, validate) {
    const regex = /^rgb\((2[0-5][0-5]|1\d\d|[1-9]\d|\d),(2[0-5][0-5]|1\d\d|[1-9]\d|\d),(2[0-5][0-5]|1\d\d|[1-9]\d|\d)\)$/gmi;
    if (validate === true) return regex.test(color);
    const match = regex.exec(color);
    return `2;${match[1]};${match[2]};${match[3]}`;
}

/**
 * This method validates a color or generates it with the HSL format.
 * @param {string} color The color
 * @param {boolean} [validate] If set to true the method will perform validation instead of parsing.
 * @returns {boolean|string} Returns if validate is set a true or false others will return a parsed ansci code color.
 */
function isHSL(color, validate) {
    const regex = /^hsl\((360|3[0-5]\d|[12]\d\d|[1-9]\d|\d),(100|[1-9]\d|\d)%,(100|[1-9]\d|\d)%\)$/gmi;
    if (validate === true) return regex.test(color);
    const match = regex.exec(color);
    const rgb = hslToRgb(parseInt(match[1]), parseInt(match[2]), parseInt(match[3]));
    return `2;${rgb[0]};${rgb[1]};${rgb[2]}`;
}

/**
 * This method validates a color.
 * @param {string} color The color
 * @returns {boolean} Returns if its a valid color.
 */
function validateColor(color) {
    return (
        isHSL(color, true) ||
        isRGB(color, true) ||
        isBASE(color, true) ||
        isHEX(color, true)
    );
}

exports.validateColor = validateColor;


/**
 * This method creates a color.
 * @param {string} color The color
 * @returns {string} Returns ansci escape code for color.
 */
function createColor(color) {
    if (isBASE(color, true)) return isBASE(color);
    if (isHSL(color, true)) return isHSL(color);
    if (isRGB(color, true)) return isRGB(color);
    if (isHEX(color, true)) return isHEX(color);
    return (colors.indexOf('white'));
}

exports.createColor = createColor;

