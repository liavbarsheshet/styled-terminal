/*! 
 * styled-terminal - Create, manage styles for output terminal strings.
 * Author: Liav Barsheshet, LBDevelopments <liavbarsheshet@gmail.com, liavb@campus.technion.ac.il>
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
 * @property {('black'|'red'|'green'|'yellow'|'blue'|'magenta'|'cyan'|'white'|'random'|'#000000'|'rgb(0,0,0)'|'hsl(0,0%,0%)'|'rainbow'|'gradient [...colors]')} [foreground] - The foreground color of the output.
 * @property {('black'|'red'|'green'|'yellow'|'blue'|'magenta'|'cyan'|'white'|'random'|'#000000'|'rgb(0,0,0)'|'hsl(0,0%,0%)'|'rainbow'|'gradient [...colors]')} [background] - The background color of the output.
 * @property {('hidden'|'visible')} [visibility] - Sets the visibility of the output.
 * @property {('auto'|'inverted')} [colorMode] - Sets the color mode of the output.
 */

/**
 * cb (?result) => {}
 * @callback setFromFilecallback
 * @param {Object.<string, boolean>} result An object containing the styles that has been sets or not.
 */

/** Style bank */
const styles = {};

/** Global options */
const options = {
    overwrite: false
};

const colors = require('./lib/colors');
const fs = require('fs');

/**
 * This method validates a style.
 * @param {styleObject} style An object contains style attributes.
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

    // Validates color-mode
    if (typeof style.colorMode == 'inverted') {
        result.colorMode = style.colorMode;
    }

    return result;
};

/**
 * This method sets a style template with a given name or creates a copy from an existing style.
 * @param {string} name The name of the style.
 * @param {styleObject|string} style Style object or another style name to create a copy.
 * @returns {boolean} True if the style is set, others false.
 */
const set = (name, style) => {
    if (typeof name != 'string' || !style) return false;

    // Detects if can be overwritten
    if (name in styles && options.overwrite != true) return false;

    // Detect if needs to copy from another style
    if (typeof style == 'string') {

        // Checks if the source style that needed to be copied exists
        if (style in styles) {
            styles[name] = { ...styles[style] };
            return true;
        }

        return false;
    }

    // Detects if the style is not an object
    if (typeof style != 'object') return false;

    // Sets the new style
    styles[name] = validateStyle(style);

    return true;
};

/**
 * This method set styles from a given object.
 * @param {Object.<string, styleObject>} styles An object containing styles (key,value) = (styleName, styleObject).
 * @returns {Object.<string, boolean>} Returns an object containing the styles that have been set or not.
 */
const multiSet = (styles) => {
    // Creating a result object
    const result = {};

    // Detects if the given styles are not an object
    if (typeof styles != 'object' || !styles) return result;

    // Saving the object keys to iterate over them
    const keys = Object.keys(styles);
    keys.forEach(key => {
        if (!styles) return;
        if (!(key in styles)) return;

        // Updating the result object.
        result[key] = set(key, styles[key], options.overwrite);
    });

    return result;
};

/**
 * This method sets styles from a given JSON files path.
 * @param {...string} files An array containing files path.
 * @returns {Promise<Object.<string, boolean>>} Returns a promise which resolves an Object.<string, boolean>
 */
const setFromFiles = (...files) => {
    // returning a new Promise
    return new Promise((resolve) => {
        // Creating a result object
        let result = {};

        // Detects if the files parameter is not an Array
        if (!Array.isArray(files) || !files) return resolve(result);

        let i = 0;

        const loop = () => {
            // Stop condition
            if (i == files.length) return resolve(result);

            // Focusing on the current file
            const curFile = files[i];

            // Detects if the file path is not a string
            if (typeof curFile != 'string') return loop(++i);

            fs.readFile(curFile, { encoding: 'utf-8' }, (err, file) => {
                // Detects if an error occurd during file reading.
                if (err) return loop(++i);

                let styles;

                // Converting file into a javascript object
                try {
                    styles = JSON.parse(file);
                } catch (err) {
                    return loop(++i);
                }

                // Set the style from a given file content
                let stylesResult = multiSet(styles, false);

                // Appending to the result object
                result = { ...result, ...stylesResult };

                return loop(++i);
            });
        };

        // Starting the custom loop
        loop();
    });
};

/**
 * This method sets styles from a given JSON files path.
 * @param {...string} files An array containing files path.
 * @returns {Object.<string, boolean>} Returns an object containing the styles that have been set or not.
 */
const setFromFilesSync = (...files) => {
    // Creating a result object
    let result = {};

    //  Detects if the files parameter is not an Array
    if (!Array.isArray(files) || !files) return resolve(result);

    for (let file in files) {
        // Focusing on the current file
        const curFile = files[file];

        // Detects if the file path is not a string
        if (typeof curFile != 'string') continue;

        let styles;
        try {
            styles = fs.readFileSync(curFile, { encoding: 'utf-8' });
        } catch (err) {
            continue;
        }

        // Converting file into a javascript object
        try {
            styles = JSON.parse(styles);
        } catch (err) {
            continue;
        }
        // Set the style from a given file content
        let stylesResult = multiSet(styles, false);

        // Appending to the result object
        result = { ...result, ...stylesResult };
    }

    return result;
};

/**
 * This method gets the style object copy of an existing style by its name.
 * @param {string} name The name of the style.
 * @returns {styleObject} Returns style object if it found
 */
const get = (name) => {
    if (typeof name != 'string') return;
    if (!(name in styles)) return;
    return { ...styles[name] }
};

// Options Methods

/**
 * This method sets the overwrite mode.
 * @param {boolean} mode Overwrite mode, If true in any set method if there is a name duplication of styles it will replace the existing style.
 */
const overwite = (mode) => {
    if (typeof mode != 'boolean') return;
    options.overwrite = mode;
};

/** This method toggles between overwrite modes (True => False). */
const overwiteToggle = () => { options.overwrite = !options.overwrite };

/**
 * This method appends style to a given string.
 * @param {string} str A given string.
 * @param {string|styleObject} style A style object or a name reference for a style template.
 * @returns {string} Returns styled string for chaining.
 */
function apply(str, style) {
    if (typeof str != 'string' && !(str instanceof String)) return '';
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
    if (style.colorMode) attr.push(`7`);
    return (`\x1b[${attr.join(';')}m${str}\x1b[0m`);
};

/**
 * This method appends style to a string (This function extends the string prototype).
 * @param {string|styleObject} style A style object or a name reference for a style template.
 * @returns {string} Returns styled string for chaining.
 */
function appendStyle(style) {
    const str = this;
    return apply(str, style);
};

String.prototype.appendStyle = appendStyle;

module.exports = { apply, set, multiSet, setFromFiles, setFromFilesSync, get, overwite, overwiteToggle }
