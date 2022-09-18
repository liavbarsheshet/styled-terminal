/*!
 * styled-terminal - Create, manage styles for console.
 *
 * [index.js] - Styled Terminal main module.
 *
 * Author: Liav Barsheshet, LBDevelopments <liavbarsheshet@gmail.com, liavb@campus.technion.ac.il>
 * Website: https://www.liavbarsheshet.net
 * Copyright(c) 2020-2022 Liav Barsheshet <LBDevelopments>
 * MIT Licensed
 */

const { createColor, saveColor: _saveColor } = require("./lib/colors");

const presets = require("./lib/presets");

const fs = require("fs");

const properties = {
  weight: {
    value: { bold: 1, light: 2 },
    maxLength: 5,
  },
  style: {
    value: { italic: 3 },
    maxLength: 6,
  },
  decoration: {
    value: { underline: 4, crossed: 9, overline: 53 },
    maxLength: 9,
    multiple: true,
  },
  visibility: {
    value: { visible: 28, hidden: 8 },
    maxLength: 7,
  },
  border: {
    value: { box: 51, circle: 52 },
    maxLength: 6,
  },
  font: {
    value: {
      0: 10,
      1: 11,
      2: 12,
      3: 13,
      4: 14,
      5: 15,
      6: 16,
      7: 17,
      8: 18,
      9: 19,
      10: 20,
      fraktur: 20,
      gothic: 20,
    },
    maxLength: 2,
  },
  blink: {
    value: { fast: 6, slow: 5 },
    maxLength: 4,
  },
  colorMode: {
    value: { invert: 7 },
    maxLength: 6,
  },
  color: 3,
  bg: 4,
  background: 3,
  foreground: 4,
  "underline-color": 5,
};

const ENDING = `\x1b[0m`;

/** Save your favorite styles */
const styles = {};

/**
 * Encodes a style within a given property and data.
 * Worst-Case Time complexity O(1) | O(n) - if multiple properties are not efficient.
 *
 * @param {string} prop Style property.
 * @param {string} data Style data.
 * @returns {string} Encoded prop.
 */
function encodeProp(prop, data) {
  const propSetting = properties[prop];
  if (typeof propSetting == "number")
    return `${propSetting}${createColor(data)}`;
  if (data.length > propSetting.maxLength || !(data in propSetting.value))
    return null;
  if (propSetting.multiple) {
    const multi_data = data.split(" ");
    const result = [];
    const register = {};
    multi_data.forEach((data) => {
      if (data == "" || !(data in propSetting.value) || data in register)
        return;
      result.push(propSetting.value[data]);
      register[data] = true;
    });
    return result.join(";");
  }
  return propSetting.value[data];
}

/**
 * Encodes Style from a given style object.
 * Worst-Case Time complexity O(1) | O(n) - if multiple properties are not efficient.
 *
 * @param {styleObject} styleObject Style object.
 * @returns {string} Encoded style.
 */
function retrieveStyle(styleObject) {
  if (typeof styleObject == "string") styleObject = styles[styleObject];
  if (!styleObject) return "";
  const prop = [];
  for (let key in properties) {
    const data = styleObject[key];
    if (!data) continue;
    if (typeof data == "number") data = data.toString();
    if (typeof data != "string" || data == "") continue;
    const res = encodeProp(key, data);
    if (res) prop.push(res);
  }
  return `\x1b[${prop.join(";")}m`;
}

/**
 * Generate style object from <!> tag.
 * Worst-Case Time complexity O(|str|).
 *
 * @param {string} str String containing <!> tag
 * @returns {styleObject} Converted style object.
 */
function stringToStyleObject(str) {
  if (!str || typeof str != "string") return {};
  const index = str.indexOf(">") + 1;
  if (index == 0) return {};

  str = str.substring(0, index);
  const regex = /(\w+)="([\w# ]+)"/gm;

  let match;

  const styleObject = {};

  while ((match = regex.exec(str))) styleObject[match[1]] = match[2];

  return styleObject;
}

/**
 * Applies render to a raw string.
 * Worst-Case Time complexity O(n*|str|).
 *
 * @param {string} str Raw string.
 * @param {any} [data] Data parameters.
 * @returns {string} Rendered string.
 */
function renderApply(str, data) {
  const regex = /<((?:(?:@|#)\w+|!))(?:>| [^>]*>)/g;
  const res = [];
  let match;

  while ((match = regex.exec(str))) res.push(match[1]);

  if (res.length == 0) return str;

  for (let i in res) {
    const key = res[i];
    const name = key.substring(1);
    const tag = key[0];

    const element = new RegExp(
      `<\\s*${key}\\s*[^>]*>(.*?)<\\/\\s*${name || key}\\s*>`,
      "gsm"
    ).exec(str);

    if (!element) continue;

    let content;
    const styleObject = stringToStyleObject(element[0]);

    switch (tag) {
      case "@":
        content = apply(element[1], name);
        content = apply(content, styleObject);
        break;
      case "#":
        content = preset(element[1], name);
        content = apply(content, styleObject);
        break;
      case "!":
        content = apply(element[1], styleObject);
        break;
      default:
        continue;
    }

    str = str.replace(element[0], content);
  }

  if (!data || typeof data !== "object") return str;

  for (let key in data)
    str = str.replace(new RegExp(`{${key}}`, "gm"), data[key]);

  return str;
}

// String extension

String.prototype.style = function (styleObject) {
  return apply(this.toString(), styleObject);
};

String.prototype.preset = function (presetName, ...args) {
  return preset(this.toString(), presetName, ...args);
};

String.prototype.clearStyle = function () {
  const pattern = [
    "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
    "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))",
  ].join("|");
  return this.replace(new RegExp(pattern, "g"), "");
};

// EXPORTS

function clear(str) {
  if (typeof str != "string") return str;
  return str.clear();
}

function apply(str, styleObject) {
  if (!str || typeof str !== "string") return str;
  if (typeof styleObject === "string") styleObject = styles[styleObject];
  if (!styleObject || typeof styleObject != "object") return str;
  return `${retrieveStyle(styleObject)}${str}${ENDING}`;
}

function preset(str, presetName, ...args) {
  if (
    !str ||
    typeof str != "string" ||
    !presetName ||
    typeof presetName != "string"
  )
    return str;
  if (!(presetName in presets)) return str;
  return presets[presetName](str, ...args);
}

function saveStyle(name, styleObject) {
  if (!name || typeof name != "string") return;
  if (!styleObject || typeof styleObject != "object") return;

  const style = {};

  for (let key in properties) {
    if (!(key in styleObject)) continue;
    const data = styleObject[key];
    if (typeof data != "string") continue;
    style[key] = data;
  }

  styles[name] = style;
}

function saveColor(name, color) {
  _saveColor(name, color);
}

function saveStyles(styles) {
  if (!styles || typeof styles != "object") return;

  for (let key in styles) {
    saveStyle(key, styles[key]);
  }
}

function saveColors(colors) {
  if (!colors || typeof colors != "object") return;

  for (let key in colors) {
    saveColor(key, colors[key]);
  }
}

function save(name, template) {
  if (typeof template == "string") return saveColor(name, template);
  saveStyle(name, template);
}

function render(...args) {
  let file, data, cb;

  if (args.length >= 3) {
    data = args[1] || {};
    cb = args[2];
  } else {
    data = {};
    cb = args[1];
  }

  file = args[0];

  if (!cb || typeof cb != "function") cb = () => {};

  fs.readFile(file, { encoding: "utf-8" }, (err, res) => {
    if (err) return cb(err, undefined);
    try {
      let result = renderApply(res, data);
      cb(undefined, result);
    } catch (err) {
      cb(err, undefined);
    }
  });
}

function renderSync(file, data = {}) {
  let res = fs.readFileSync(file, { encoding: "utf-8" });
  return renderApply(res, data);
}

function renderAsync(file, data = {}) {
  return new Promise((resolve, reject) => {
    render(file, data, (err, res) => {
      if (err) return reject(err);
      resolve(res);
    });
  });
}

module.exports = {
  clear,
  apply,
  preset,
  saveStyle,
  saveColor,
  saveStyles,
  saveColors,
  save,
  render,
  renderSync,
  renderAsync,
};
