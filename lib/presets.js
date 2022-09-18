/*!
 * styled-terminal - Create, manage styles for console.
 *
 * [presets.js] - Use built in style presets.
 *
 * Author: Liav Barsheshet, LBDevelopments <liavbarsheshet@gmail.com, liavb@campus.technion.ac.il>
 * Website: https://www.liavbarsheshet.net
 * Copyright(c) 2020-2022 Liav Barsheshet <LBDevelopments>
 * MIT Licensed
 */

/**
 * Creates a rainbow color effect to characters of the given string.
 * Worst-Case Time complexity O(|str|).
 *
 * @param {string} str Target string.
 * @param {boolean} [lines] True creates unique rainbow for each line o.w false.
 * @returns {string} Styled string.
 */
export function rainbow(str, lines) {
  if (typeof str != "string") return str;
  lines = lines == true ? true : false;

  const SPECTRUM = 360;
  const length = str.length;
  const phase = length <= SPECTRUM ? Math.round(SPECTRUM / length) : 1;
  let counter = 0;

  let res = ``;

  const hsl = {
    h: 0,
    s: 100,
    l: 50,
  };

  for (let i = 0; i < length; ++i) {
    const char = str[i];
    if (char == "\n" && lines) {
      counter = 0;
      continue;
    }
    hsl.h = counter % SPECTRUM;
    res += `${char}`.style({ color: `hsl(${hsl.h},${hsl.s}%,${hsl.l}%)` });
    counter += phase;
  }
  return res;
}

/**
 * Take a number as string and format it as money.
 * Worst-Case Time complexity O(|str|).
 *
 * @param {string} str Number as string.
 * @returns {string} Formatted number.
 */
export function money(str) {

  if (typeof str != "string") return str;
  let num = parseInt(str, 10);
  if (!num) return str;

  const sign = num < 0;
  num = num.toString();

  if (sign) num = num.substring(1);

  const length = num.length;
  let count = (3 - (length % 3)) % 3;

  const result = [];

  if (sign) result.push("-");

  for (let i = 0; i < length; ++i) {
    if (count == 0 && i != 0) result.push(",");
    count = (count + 1) % 3;
    result.push(num[i]);
  }

  return result.join("");
}