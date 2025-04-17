<h1 align="center">
	<br>
	<img src="assets/logo.png" alt="styled-terminal logo">
	<br>
	<br>
</h1>

> A fast, lightweight, and high-performance terminal string styling library.

[![NPM Downloads][downloads-image]][downloads-url]
[![npm dependents](https://badgen.net/npm/dependents/styled-terminal)](https://www.npmjs.com/package/styled-terminal?activeTab=dependents)
[![NPM Version][npm-image]][npm-url]

<img src="assets/snapshot.png" style="width:100%;" alt="styled-terminal logo">

## Features

- Supports a wide range of color formats, including 8-bit, 256-bit, RGB, HSL, and HEX.
- Modular design enables the creation of color palettes and reusable styles.
- Does not extend `String.prototype`
- Minimize's string pollution.
- Ability to nest styles.
- Lightweight `< 40Kb`.
- Highly performant.
- No dependencies.
- Expressive.
- Maintained.
- Robust.

## Support

| Platform / Terminal       | Type     | Supported | Support Since                |
| ------------------------- | -------- | --------- | ---------------------------- |
| **Windows Console (CMD)** | Terminal | ❌        | Not supported                |
| **Terminal.app (macOS)**  | Terminal | ✅        | Since early versions         |
| **PowerShell 6+**         | Terminal | ✅        | Since release                |
| **PowerShell 5.1+**       | Terminal | ✅        | Windows 10 v1511 (2016)      |
| **Windows Terminal**      | Terminal | ✅        | Since initial release (2019) |
| **GNOME Terminal**        | Terminal | ✅        | Since early versions         |
| **Linux Console**         | Terminal | ✅        | Since early versions         |
| **iTerm2 (macOS)**        | Terminal | ✅        | Since early versions         |
| **Konsole (KDE)**         | Terminal | ✅        | Since early versions         |
| **Chrome DevTools**       | Browser  | ✅        | Since version 69 (2018)      |
| **Cygwin Terminal**       | Terminal | ✅        | With ANSI support enabled    |
| **ConEmu**                | Terminal | ✅        | With ANSI support enabled    |
| **xterm**                 | Terminal | ✅        | Since early versions         |

## Installation

Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```bash
npm install styled-terminal
```

## Declaration

##### Using CommonJS (ES5)

```js
const { style } = require("styled-terminal");
```

##### Using ES Modules (ES6+)

```js
import { style } from "styled-terminal";
```

## Usage

#### 1. Hello World Example

```js
import { style, Color } from "styled-terminal";

// Prints "Hello World!" with a random foreground color.
console.log(style.fg(Color.random).apply("Hello World!"));

// Or use the shorter syntax:
console.log(style.fg(Color.random)("Hello World!"));
```

#### 2. Styled String Concatenation

```js
import { style, Color } from "styled-terminal";

// Standard concatenation using the + operator:
console.log(
  style.fg(Color.green)("• ") + style.fg(Color.blue).bold.underline("Headline")
);

// Concatenation using multiple arguments:
console.log(
  style.fg(Color.green)("•", " "),
  style.fg(Color.blue).bold.underline("Headline")
);

// Nested concatenation:
console.log(style.fg(Color.green)("•", " ", style.fg(Color.blue).bold.underline("Headline"))
);
```

#### 3. Define Custom Styles and Colors

```js
import { style, Color } from "styled-terminal";

// Custom colors
const deepSkyBlue = Color.rgb(0, 191, 255);
const mediumOrchid = Color.hex("#BA55D3");
const hotPink = Color.hsl(330, 100, 17);
const darkOrange = Color.hex("#FF8C00");
const redMagenta = Color.hex("#ff0055");
const crimsonRed = Color.hex("#DC143C");
const limeGreen = Color.hex("#32CD32");
const slateBlue = Color.hex("#6A5ACD");
const gold = Color.hex("#FFD700");

// Custom styles
const headline = style.fg(deepSkyBlue).underline.bold;
const description = style.italic;
const highlight = style.fg(gold);

// Custom style function
const codeComment = (comment) =>
  `${style.fg(Color.green).light("// ", comment)}`;

console.log(headline("Headline"), highlight.bold.italic("1"));
console.log(description("A short description..."));

console.log(codeComment("A simple comment."));
```

## API

## `<class Color>`

_Represents a Color._

#### `Color.black`

_Gets the default black color._

#### `Color.brightBlack`

_Gets the default bright black color._

#### `Color.red`

_Gets the default red color._

#### `Color.brightRed`

_Gets the default bright red color._

#### `Color.green`

_Gets the default green color._

#### `Color.brightGreen`

_Gets the default bright green color._

#### `Color.yellow`

_Gets the default yellow color._

#### `Color.brightYellow`

_Gets the default bright yellow color._

#### `Color.blue`

_Gets the default blue color._

#### `Color.brightBlue`

_Gets the default bright blue color._

#### `Color.magenta`

_Gets the default magenta color._

#### `Color.brightMagenta`

_Gets the default bright magenta color._

#### `Color.cyan`

_Gets the default cyan color._

#### `Color.brightCyan`

_Gets the default bright cyan color._

#### `Color.white`

_Gets the default white color._

#### `Color.brightWhite`

_Gets the default bright white color._

#### `Color.random`

_Gets a random color._

#### `Color.randomBright`

_Gets a random bright color._

#### `Color.randomDim`

_Gets a random dim color._

#### `Color.table256(index)`

[_256 Color's list_](https://www.ditig.com/256-colors-cheat-sheet)
_Creates a `Color` object by choosing an index from the 256-color lookup table._
_`index {number}` A number between 0-255 which represent a cell index._

#### True Colors

[_An online color picker._](https://g.co/kgs/5PSjquY)

#### `Color.rgb(red, green, blue)`

_Creates a `Color` object from RGB (Red, Green, Blue) values._
_`red {number}` The red component of the color, typically a value between 0 and 255._
_`green {number}` The green component of the color, typically a value between 0 and 255._
_`blue {number}` The blue component of the color, typically a value between 0 and 255._

#### `Color.hsl(hue, saturation, lightness)`

_Creates a `Color` object from HSL (Hue, Saturation, Lightness) values._
_`hue {number}` The hue of the color, typically a value between 0 and 360 degrees._
_`saturation {number}` The saturation of the color, typically a percentage value between 0 and 100._
_`lightness {number}` The lightness of the color, typically a percentage value between 0 and 100._

#### `Color.hex(hexCode)`

_Creates a `Color` instance from a hexadecimal color code._
_`hexCode {string}` A string representing the color in hexadecimal format (e.g., `#FF5733`)._

## `<class Style>`

_Represents a style used for terminal text._

#### `style.<modifier>...<modifier>(string, ...string[])`

_Example:_ `style.underline.bold.fg(Color.random)("Hello World!")`

### Modifiers

#### `reset`

_Resets all the current style modifiers._

#### `hidden`

_Hides the text._

#### `reveal`

_Force revealing a hidden text._

#### `autoVisibility`

_Sets visibility to be auto._

#### `invert`

_Mode that swaps foreground and background colors._

#### `noInvert`

_Force disable the mode that swaps foreground and background colors._

#### `autoInvert`

_Sets the mode that swaps foreground and background colors to auto._

#### `bold`

_Sets the font weight of the text to bold._

#### `light`

_Sets the font weight of the text to light._

#### `normal`

_Sets the font weight of the text to normal._

#### `autoFontWeight`

_Sets the font weight of the text to auto._

#### `italic`

_Applies italic styling to the text._

#### `noItalic`

_Force remove italic styling from the text._

#### `autoItalic`

_Sets italic styling of the text to auto._

#### `underline`

_Applies underline styling to the text._

#### `doubleUnderline`

_Applies double underline styling to the text._

#### `noUnderline`

_Force remove any underline styling from the text._

#### `autoUnderline`

_Sets any underline styling from the text to auto._

#### `strikethrough`

_Applies strikethrough styling to the text._

#### `noStrikethrough`

_Force remove any strikethrough styling from the text._

#### `autoStrikethrough`

_Sets any strikethrough styling from the text to auto._

#### `resetFg`

_Force resetting the foreground color to the terminal default value._

#### `autoFg`

_Setting the foreground color to auto._

#### `resetBg`

_Force resetting the background color to the terminal default value._

#### `autoBg`

_Setting the background color to be auto._

#### `fg(color)`

_Sets the foreground color of the text._
_`color {Color}` A Color instance representing a color._

#### `bg(color)`

_Sets the background color of the text._
_`color {Color}` A Color instance representing a color._

### Methods

#### `start()`

_Begins a style chain for terminal output._
_Applies the specified styles until explicitly ended._

`Example`

```ts
import { style } from "styled-terminal";
import * as readline from "readline";

// Create an interface for reading input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Creating an hidden text style.
const hiddenText = style.hidden;

// Hides the input...
rl.question(`Enter password: ${hiddenText.start()}`, (password) => {
  console.log(hiddenText.end());
  /// Rest of the code...
  rl.close();
});
```

#### `end()`

_Ends the current style chain or resets terminal styles._

#### `apply(str, ...args)`

_Applies a style to a string by concatenating it with additional strings._
_`str {string}` The base string to apply the style to._
_`args {string[]}` Additional strings to concatenate._

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Author

[Liav Barsheshet, LBDevelopments](https://github.com/liavbarsheshet)

## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/styled-terminal.svg
[npm-url]: https://www.npmjs.com/package/styled-terminal
[downloads-image]: https://img.shields.io/npm/dm/styled-terminal.svg
[downloads-url]: https://npmcharts.com/compare/styled-terminal?minimal=true
