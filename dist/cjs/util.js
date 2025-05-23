"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rand = rand;
let seed = Math.floor(Math.random() * 0xffffffff);
function randXorShift32() {
    seed ^= seed << 13;
    seed ^= seed >> 17;
    seed ^= seed << 5;
    return seed >>> 0;
}
function rand(min, max) {
    if (typeof min !== "number" || typeof max !== "number")
        throw new TypeError("Expected a numbers as value parameters.");
    if (min > max || max < 0 || min < 0)
        throw new RangeError("Invalid range: min and max must be non-negative, and min must be less than or equal to max");
    if (max === min)
        return min;
    return randXorShift32() % (max - min + 1);
}
