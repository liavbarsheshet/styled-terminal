"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rand = rand;
const errors_js_1 = require("./errors.js");
let seed = Math.floor(Math.random() * 0xffffffff);
function randXorShift32() {
    seed ^= seed << 13;
    seed ^= seed >> 17;
    seed ^= seed << 5;
    return seed >>> 0;
}
function rand(min, max) {
    if (typeof min !== "number" || typeof max !== "number")
        throw new errors_js_1.InvalidParameter("min, max", "numbers");
    if (min > max || max < 0 || min < 0)
        throw new errors_js_1.InvalidParameter("min, max", "min <= max");
    if (max === min)
        return min;
    return randXorShift32() % (max - min + 1);
}
