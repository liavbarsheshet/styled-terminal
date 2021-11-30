/*! 
 * styled-terminal - Create, manage styles for output terminal strings.
 * Author: Liav Barsheshet  <LBDevelopments>, liavbarsheshet@gmaik.com, liavb@campus.technion.ac.il
 * Website: https://www.liavbarsheshet.net
 * Copyright(c) 2020-2022 Liav Barsheshet
 * Version: 1.0.0
 * MIT Licensed
 */


/**
 * @typedef styleObject
 * @type {object}
 * @property {('bold'|'light'|'auto')} [weight] - The weight of the output ('bold', 'light' or 'auto').
 * @property {('underline'|'italic'|'crossed')} [decoration] - The decoration of the output. (can accept more than one decoration joined with spaces).
 * @property {('black'|'red'|'green'|'yellow'|'blue'|'magenta'|'cyan'|'white'|'random'|'#000000'|'rgb(0,0,0)'|'hsl(0,0%,0%)'|'rainbow'|'gradient [...colors]')} [foreground] - The forground color of the output.
 * @property {('black'|'red'|'green'|'yellow'|'blue'|'magenta'|'cyan'|'white'|'random'|'#000000'|'rgb(0,0,0)'|'hsl(0,0%,0%)'|'rainbow'|'gradient [...colors]')} [background] - The background color of the output.
 * @property {('hidden'|'visible')} [visibility] - Sets the visibility of the output.
 */

/** Style bank */
const styles = {};

const colors = require('./lib/colors');

/**
 * This method validates a style.
 * @param {styleObject} style
 * @returns {styleObject} Returns a valid style object.
 */
const validateStyle = (style) => {
    const result = {};

    // Validates weight
    if (typeof style.weight == 'string') {
        if (['bold', 'light'].includes(style.weight)) result.weight = style.weight;
    }

    // Validates decoration
    if (typeof style.decoration == 'string') {
        const decor = [];
        if (/underline/igm.test(style.decoration)) decor.push('underline');
        if (/italic/igm.test(style.decoration)) decor.push('italic');
        if (/crossed/igm.test(style.decoration)) decor.push('crossed');
        if (decor.length > 0) result.decoration = decor.join(' ');
    }

    // Validates visibility
    if (typeof style.visibility == 'string') {
        if (style.visibility === 'hidden') result.visibility = 'hidden';
    }

    // Validates foreground
    if (typeof style.foreground == 'string') {
        if (colors.validateColor(style.foreground)) result.foreground = style.foreground;
    }

    // Validates background
    if (typeof style.background == 'string') {
        if (colors.validateColor(style.background)) result.background = style.background;
    }

    return result;
};

/**
 * This method set a style template with a given name
 * @param {string} name The name of the style.
 * @param {styleObject|string} style Style object or another style name to create a copy.
 * @param {boolean} overwrite Overwrite mode, If true it will replace exist style.
 */
const set = (name, style, overwrite) => {
    if (typeof name != 'string' || !style) return false;

    // Detects if can be overwritten
    if (name in styles && overwrite != true) return true;

    // Detect if needs to copy from other style
    if (typeof style == 'string') {

        // Checks if the source style that needed to be copied is exist.
        if (style in styles) {
            styles[name] = { ...styles[style] };
            return true;
        }

        return false;
    }

    // Checks if the style is not an object
    if (typeof style != 'object') return false;

    // Sets the new style
    styles[name] = validateStyle(style);

    return true;
};

/**
 * This method gets a style by its name
 * @param {string} name The name of the style.
 * @returns {styleObject} Returns style object if it found
 */
const get = (name) => {
    if (typeof name != 'string') return;
    if (!(name in styles)) return;
    return { ...styles[name] }
};

/**
 * This method appends style to a string
 * @param {string|styleObject} style A style object or a name reference for a style template.
 * @returns {string} Returns styled string for chain.
 */
function appendStyle(style) {
    const str = this;
    const attr = [];
    if (typeof style == 'string') style = get(style);
    if (!style || typeof style != 'object') return str;
    if (style.weight) attr.push({ 'bold': 1, 'light': 2 }[style.weight]);
    if (style.decoration) {
        if (style.decoration.indexOf('italic') > -1) attr.push(3);
        if (style.decoration.indexOf('underline') > -1) attr.push(4);
        if (style.decoration.indexOf('crossed') > -1) attr.push(9);
    }
    if (style.visibility) attr.push({ 'hidden': 8, 'visible': 28 }[style.visibility]);
    if (style.foreground) attr.push(`38;${colors.createColor(style.foreground)}`);
    if (style.background) attr.push(`48;${colors.createColor(style.background)}`);
    return (`\x1b[${attr.join(';')}m${str}\x1b[0m`);
}

String.prototype.appendStyle = appendStyle;

module.exports = { set, get }
