/**
 * @fileoverview Index Module
 *
 * Exports the Styled Terminal API.
 *
 * @author Liav Barsheshet <liavbarsheshet@gmail.com>
 * @copyright Liav Barsheshet <LBDevelopments> © 2025
 */
import { Color } from "./color.ts";
import { Style } from "./style.ts";

const style: Style = new Style();

// Exposing API
export { style as default, style, Style, Color };
