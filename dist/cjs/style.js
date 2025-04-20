"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Style = void 0;
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
        return this.applyModifier(7, `\x1b[8m`);
    }
    get reveal() {
        return this.applyModifier(7, `\x1b[28m`);
    }
    get autoVisibility() {
        return this.applyModifier(7);
    }
    get invert() {
        return this.applyModifier(6, `\x1b[7m`);
    }
    get noInvert() {
        return this.applyModifier(6, `\x1b[27m`);
    }
    get autoInvert() {
        return this.applyModifier(6);
    }
    get bold() {
        return this.applyModifier(0, `\x1b[1m`);
    }
    get light() {
        return this.applyModifier(0, `\x1b[2m`);
    }
    get normal() {
        return this.applyModifier(0, `\x1b[22m`);
    }
    get autoFontWeight() {
        return this.applyModifier(0);
    }
    get italic() {
        return this.applyModifier(1, `\x1b[3m`);
    }
    get noItalic() {
        return this.applyModifier(1, `\x1b[23m`);
    }
    get autoItalic() {
        return this.applyModifier(1);
    }
    get underline() {
        return this.applyModifier(2, `\x1b[4m`);
    }
    get doubleUnderline() {
        return this.applyModifier(2, `\x1b[21m`);
    }
    get noUnderline() {
        return this.applyModifier(2, `\x1b[24m`);
    }
    get autoUnderline() {
        return this.applyModifier(2);
    }
    get strikethrough() {
        return this.applyModifier(3, `\x1b[9m`);
    }
    get noStrikethrough() {
        return this.applyModifier(3, `\x1b[29m`);
    }
    get autoStrikethrough() {
        return this.applyModifier(3);
    }
    get resetFg() {
        return this.applyModifier(4, `\x1b[39m`);
    }
    get autoFg() {
        return this.applyModifier(4);
    }
    fg(color) {
        return this.applyModifier(4, `\x1b[38;${color.code}m`);
    }
    get resetBg() {
        return this.applyModifier(5, `\x1b[49m`);
    }
    get autoBg() {
        return this.applyModifier(5);
    }
    bg(color) {
        return this.applyModifier(5, `\x1b[48;${color.code}m`);
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
            throw new TypeError("Expected a string, [string...] as value parameters.");
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
