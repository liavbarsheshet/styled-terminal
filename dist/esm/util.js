import { InvalidParameter } from "./errors.js";
let seed = Math.floor(Math.random() * 0xffffffff);
function randXorShift32() {
    seed ^= seed << 13;
    seed ^= seed >> 17;
    seed ^= seed << 5;
    return seed >>> 0;
}
export function rand(min, max) {
    if (typeof min !== "number" || typeof max !== "number")
        throw new InvalidParameter("min, max", "numbers");
    if (min > max || max < 0 || min < 0)
        throw new InvalidParameter("min, max", "min <= max");
    if (max === min)
        return min;
    return randXorShift32() % (max - min + 1);
}
