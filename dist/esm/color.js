import { InvalidParameter } from "./errors.js";
import { rand } from "./util.js";
export class Color {
    #code;
    constructor(code) {
        const regex = /^(?:(?:5;(?:(?:\d)|(?:[1-9]\d)|(?:1\d\d)|(?:2[0-4]\d)|(?:25[0-5])))|(?:2;(?:(?:\d)|(?:[1-9]\d)|(?:1\d\d)|(?:2[0-4]\d)|(?:25[0-5]));(?:(?:\d)|(?:[1-9]\d)|(?:1\d\d)|(?:2[0-4]\d)|(?:25[0-5]));(?:(?:\d)|(?:[1-9]\d)|(?:1\d\d)|(?:2[0-4]\d)|(?:25[0-5]))))$/;
        if (!regex.test(code))
            throw new InvalidParameter("code", "in the format '5;[0-255]' or 2;[red];[green];[blue]");
        this.#code = code;
    }
    get code() {
        return this.#code;
    }
    static get black() {
        return Color.table256(0);
    }
    static get brightBlack() {
        return Color.table256(8);
    }
    static get red() {
        return Color.table256(1);
    }
    static get brightRed() {
        return Color.table256(9);
    }
    static get green() {
        return Color.table256(2);
    }
    static get brightGreen() {
        return Color.table256(10);
    }
    static get yellow() {
        return Color.table256(3);
    }
    static get brightYellow() {
        return Color.table256(11);
    }
    static get blue() {
        return Color.table256(4);
    }
    static get brightBlue() {
        return Color.table256(12);
    }
    static get magenta() {
        return Color.table256(5);
    }
    static get brightMagenta() {
        return Color.table256(13);
    }
    static get cyan() {
        return Color.table256(6);
    }
    static get brightCyan() {
        return Color.table256(14);
    }
    static get white() {
        return Color.table256(7);
    }
    static get brightWhite() {
        return Color.table256(15);
    }
    static get random() {
        return Color.rgb(rand(0, 255), rand(0, 255), rand(0, 255));
    }
    static get randomBright() {
        return Color.hsl(rand(0, 360), 100, rand(50, 85));
    }
    static get randomDim() {
        return Color.hsl(rand(0, 360), 50, rand(15, 50));
    }
    static table256(index) {
        if (index > 255 || index < 0)
            throw new InvalidParameter("index", "a number between 0-255");
        return new Color(`5;${index}`);
    }
    static rgb(red, green, blue) {
        if (green > 255 || green < 0)
            throw new InvalidParameter("green", "a number between 0-255");
        if (blue > 255 || blue < 0)
            throw new InvalidParameter("blue", "a number between 0-255");
        if (red > 255 || red < 0)
            throw new InvalidParameter("red", "a number between 0-255");
        return new Color(`2;${red};${green};${blue}`);
    }
    static hsl(hue, saturation, lightness) {
        if (hue > 360 || hue < 0)
            throw new InvalidParameter("hue", "a number between 0-360");
        if (saturation > 100 || saturation < 0)
            throw new InvalidParameter("saturation", "a number between 0-100");
        if (lightness > 100 || lightness < 0)
            throw new InvalidParameter("lightness", "a number between 0-100");
        const s = saturation / 100;
        const l = lightness / 100;
        const c = (1 - Math.abs(2 * l - 1)) * s;
        const x = c * (1 - Math.abs(((hue / 60) % 2) - 1));
        const m = l - c / 2;
        let r, g, b;
        if (hue < 60) {
            r = c;
            g = x;
            b = 0;
        }
        else if (hue < 120) {
            r = x;
            g = c;
            b = 0;
        }
        else if (hue < 180) {
            r = 0;
            g = c;
            b = x;
        }
        else if (hue < 240) {
            r = 0;
            g = x;
            b = c;
        }
        else if (hue < 300) {
            r = x;
            g = 0;
            b = c;
        }
        else {
            r = c;
            g = 0;
            b = x;
        }
        return Color.rgb(Math.round((r + m) * 255), Math.round((g + m) * 255), Math.round((b + m) * 255));
    }
    static hex(hexCode) {
        if (!/^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hexCode))
            throw new InvalidParameter("hexCode", "a valid hex color code.");
        hexCode = hexCode.replace("#", "");
        if (hexCode.length === 3) {
            hexCode = hexCode
                .split("")
                .map((char) => char + char)
                .join("");
        }
        return Color.rgb(parseInt(hexCode.slice(0, 2), 16), parseInt(hexCode.slice(2, 4), 16), parseInt(hexCode.slice(4, 6), 16));
    }
}
