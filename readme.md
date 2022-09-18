![styled-terminal logo][styled-terminal-logo]

---

Create, manage styles for console.

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]

## Installation

Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```bash
$ npm install styled-terminal
```

## Declaration

via ES6:

```js
import * as style from "styled-terminal.js";
```

via ES5:

```js
const style = require("styled-terminal");
```

## Usage

### Style Object

Style object structure is consist of style properties.

```ts
type StyleObject = {
  weight?: "bold" | "light" | "auto";
  style?: "italic";
  decoration?: "underline" | "crossed" | "overline";
  foreground?: Color;
  background?: Color;
  color?: Color;
  bg?: Color;
  underlineColor?: Color;
  visibility?: "hidden" | "visible";
  border?: "box" | "circle";
  font?:
    | "0"
    | "1"
    | "2"
    | "3"
    | "4"
    | "5"
    | "6"
    | "7"
    | "8"
    | "9"
    | "10"
    | "fraktur"
    | "gothic";
  blink?: "slow" | "fast";
  colorMode?: "auto" | "invert";
};
```

#### weight Property

_The weight property sets how thick or thin characters in text should be displayed, it can be set to either 'bold' or 'light'._

#### colorMode Property

_The colorMode property sets how the color should be displayed, it can be set to either 'auto' or 'invert'._

#### visibility Property

_The colorMode property specifies whether or not a text is visible, it can be set to either 'visible' or 'hidden'._

#### decoration Property

_The decoration property specifies what decoration will be added to the text, it can be set to either 'underline' or 'overline' or 'crossed' or a combination separated by space, for example, 'overline underline'._

#### style Property

_The style property specifies what style will be added to the text, it can be set to either 'italic'._

#### border Property

_The border property specifies what border will be added to the text, it can be set to either 'box' or 'circle'._

#### font Property

_The font property specifies what font will be used, it can be set to any number between 0-20 as string._

#### blink Property

_The blink property enables blink animation and specifies it speed, it can be set to either 'slow' or 'fast'_

#### foreground|color Property

_The foreground property specifies the color of text, it can only receive **Color**._

#### background|bg Property

_The background property sets the background color of a text, it can only receive **Color**._

#### underlineColor Property

_The underlineColor property sets the underline color of a text, it can only receive **Color**._

### Color

```ts
type BaseColors =
  | "black"
  | "red"
  | "green"
  | "yellow"
  | "blue"
  | "magenta"
  | "cyan"
  | "white";

type Color =
  | BaseColors
  | "rand"
  | "random"
  | "random normal"
  | "random semi-bright"
  | "random bright"
  | "random semi-dark"
  | "random dark"
  | "rand normal"
  | "rand semi-bright"
  | "rand bright"
  | "rand semi-dark"
  | "rand dark"
  | "#000000"
  | "rgb(0,0,0)"
  | "hsl(0,0%,0%)";
```

1. **Basic Colors**
   - 'black'
   - 'red'
   - 'green'
   - 'yellow'
   - 'blue',
   - 'magenta'
   - 'cyan'
   - 'white'
2. **rand|random** - Set to a random color.
3. **HEX Color** - '#RRGGBB', RR (red), GG (green) and BB (blue) are hexadecimal integers between 00 and FF specifying the intensity of the color.
4. **RGB Color** - 'rgb(red,green,blue)', Each parameter (red, green, and blue) defines the intensity of the color as an integer between 0 and 255.
5. **HSL Color** - 'hsl(h,s%,l%)', HSL stands for hue, saturation, and lightness.
   - Hue is a degree on the color wheel from 0 to 360.
   - Saturation is a percentage value, 0% means a shade of gray and 100% is the full color.
   - Lightness is also a percentage; 0% is black, 100% is white.

### Apply Style

Apply style on a given string.

_Returns styled string._

```js
const style = require('styled-terminal'); // ES5

const styleObject = {...};

let result;

result = style.apply('Hello World!', styleObject);

// OR

result = "Hello World!".style(styleObject);


console.log(result); // prints the styled string.

```

### Apply Preset

Apply preset (pre-made design) on a given string.

_Returns styled string._

```ts
const style = require("styled-terminal"); // ES5

type Preset = "rainbow" | "money";

let result;

result = style.preset("preset-name");

// OR

result = "Hello World!".preset("preset-name");

console.log(result); // prints the styled string.
```

### Clear Style

Clears a string from any styles.

_Returns unstyled string._

```js
const style = require("styled-terminal"); // ES5

let styledString = "...";

let result;

result = styledString.clear();

// OR

result = "...".clearStyle();

console.log(result); // prints the styled string.
```

### Save Style Template

Saves style as template within a given name.

```js
const style = require('styled-terminal'); // ES5

const styleObject = {...};

style.saveStyle('template', styleObject);

console.log("Hello World!".style("template")); // prints the styled string.

```

### Save Color Template

Saves color as template within a given name.

```js
const style = require("styled-terminal"); // ES5

style.saveColor("warm-green", "#87AA31");
style.saveColor("black-bg", "hsl(0,100%,0%)");

const styleObject = {
  color: "warm-green",
  bg: "black-bg",
};

console.log("Hello World!".style(styleObject)); // prints the styled string.
```

### Save Style|Color as Templates

Saves template auto detection (COLOR|STYLE).

```js
const style = require("styled-terminal"); // ES5

style.save("style1", {...});
style.save("color", "#FFFFFF");

```

### Save Multi Style|Color Templates

Saves multiples styles|colors from js object.

```js
const style = require('styled-terminal'); // ES5

style.saveStyles({
    'style1':{...},
    'style2':{...},
    'style3':{...},
    ...
});

style.saveColors({
    'color1':'#FFFFFF',
    'color2':'hsl(0,100%,50%)',
    'color3':'rgb(255,0,0)',
    'color4':'random semi-dark',
    ...
});
```

## Rendering

Render style from file.

### Tags

```log
    Use tags in order to style your text.

    <! color="blue" weight="bold">Hello World!</!>
```

#### Style Tag

Custom style tag.

```log
    <! style_property="...">...Your text goes here...</!>
```

#### Template Tag

Style from template.

```log
    <@template_name>...Your text goes here...</template_name>
```

#### Preset Tag

Style from preset.

```log
    <#preset_name>...Your text goes here...</preset_name>
```

### Render

Renders style of a txt file [Callback].

```js
const style = require("styled-terminal"); // ES5

style.render("src", (err, res) => {
  if (err) throw err;
  console.log(res);
});
```

### Render Sync

Renders style of a txt file [Callback].

```js
const style = require("styled-terminal"); // ES5

const result = style.render("src");

console.log(result);
```

### Render Async

Renders style of a txt file [Promise].

```js
const style = require("styled-terminal"); // ES5

style
  .render("src")
  .then((result) => { console.log(result);})
  .catch((err) => {...});
```

## Demo

To run the demo, first install the dependencies, then run `npm demo`:

```bash
$ npm install
$ npm demo
```

## Author

[Liav Barsheshet, LBDevelopments](https://github.com/liavbarsheshet)

## License

[MIT](LICENSE)

[styled-terminal-logo]: https://github.com/liavbarsheshet/styled-terminal/blob/master/assets/styled-terminal.png?raw=true
[npm-image]: https://img.shields.io/npm/v/styled-terminal.svg
[npm-url]: https://www.npmjs.com/package/styled-terminal
[downloads-image]: https://img.shields.io/npm/dm/styled-terminal.svg
[downloads-url]: https://npmcharts.com/compare/styled-terminal?minimal=true
