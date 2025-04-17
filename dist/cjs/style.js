"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Style = void 0;
const errors_js_1 = require("./errors.js");
var EModifiers;
(function (EModifiers) {
    EModifiers[EModifiers["FontWeight"] = 0] = "FontWeight";
    EModifiers[EModifiers["Italic"] = 1] = "Italic";
    EModifiers[EModifiers["Underline"] = 2] = "Underline";
    EModifiers[EModifiers["Strikethrough"] = 3] = "Strikethrough";
    EModifiers[EModifiers["ForegroundColor"] = 4] = "ForegroundColor";
    EModifiers[EModifiers["BackgroundColor"] = 5] = "BackgroundColor";
    EModifiers[EModifiers["Invert"] = 6] = "Invert";
    EModifiers[EModifiers["Visibility"] = 7] = "Visibility";
})(EModifiers || (EModifiers = {}));
const END_SEQUENCE = `\x1b[0m`;
class Style extends Function {
    modifiers;
    applyModifier(modifier, code = "") {
        let new_style = new Style(this);
        new_style.modifiers[modifier] = code;
        return new_style;
    }
    constructor(style) {
        super();
        if (!style)
            this.modifiers = [];
        else
            this.modifiers = [...style.modifiers];
        return new Proxy(this, {
            apply: (target, thisArg, args) => target.apply(args[0], ...args.slice(1)),
        });
    }
    get reset() {
        return new Style();
    }
    get hidden() {
        return this.applyModifier(EModifiers.Visibility, `\x1b[8m`);
    }
    get reveal() {
        return this.applyModifier(EModifiers.Visibility, `\x1b[28m`);
    }
    get autoVisibility() {
        return this.applyModifier(EModifiers.Visibility);
    }
    get invert() {
        return this.applyModifier(EModifiers.Invert, `\x1b[7m`);
    }
    get noInvert() {
        return this.applyModifier(EModifiers.Invert, `\x1b[27m`);
    }
    get autoInvert() {
        return this.applyModifier(EModifiers.Invert);
    }
    get bold() {
        return this.applyModifier(EModifiers.FontWeight, `\x1b[1m`);
    }
    get light() {
        return this.applyModifier(EModifiers.FontWeight, `\x1b[2m`);
    }
    get normal() {
        return this.applyModifier(EModifiers.FontWeight, `\x1b[22m`);
    }
    get autoFontWeight() {
        return this.applyModifier(EModifiers.FontWeight);
    }
    get italic() {
        return this.applyModifier(EModifiers.Italic, `\x1b[3m`);
    }
    get noItalic() {
        return this.applyModifier(EModifiers.Italic, `\x1b[23m`);
    }
    get autoItalic() {
        return this.applyModifier(EModifiers.Italic);
    }
    get underline() {
        return this.applyModifier(EModifiers.Underline, `\x1b[4m`);
    }
    get doubleUnderline() {
        return this.applyModifier(EModifiers.Underline, `\x1b[21m`);
    }
    get noUnderline() {
        return this.applyModifier(EModifiers.Underline, `\x1b[24m`);
    }
    get autoUnderline() {
        return this.applyModifier(EModifiers.Underline);
    }
    get strikethrough() {
        return this.applyModifier(EModifiers.Strikethrough, `\x1b[9m`);
    }
    get noStrikethrough() {
        return this.applyModifier(EModifiers.Strikethrough, `\x1b[29m`);
    }
    get autoStrikethrough() {
        return this.applyModifier(EModifiers.Strikethrough);
    }
    get resetFg() {
        return this.applyModifier(EModifiers.ForegroundColor, `\x1b[39m`);
    }
    get autoFg() {
        return this.applyModifier(EModifiers.ForegroundColor);
    }
    fg(color) {
        return this.applyModifier(EModifiers.ForegroundColor, `\x1b[38;${color.code}m`);
    }
    get resetBg() {
        return this.applyModifier(EModifiers.BackgroundColor, `\x1b[49m`);
    }
    get autoBg() {
        return this.applyModifier(EModifiers.BackgroundColor);
    }
    bg(color) {
        return this.applyModifier(EModifiers.BackgroundColor, `\x1b[48;${color.code}m`);
    }
    start() {
        return this.modifiers.join("");
    }
    end() {
        return END_SEQUENCE;
    }
    apply(str, ...args) {
        if (typeof str !== "string" ||
            args.filter((v) => typeof v !== "string").length)
            throw new errors_js_1.InvalidParameter("string, [string...]", "a valid string");
        str = `${str}${args.join("")}`;
        const chain = this.start();
        if (!chain.length || !str.length)
            return str;
        const segments = str.split(END_SEQUENCE);
        if (!segments[segments.length - 1].length)
            segments.pop();
        return (segments.map((segment) => `${chain}${segment}`).join(END_SEQUENCE) +
            END_SEQUENCE);
    }
}
exports.Style = Style;
