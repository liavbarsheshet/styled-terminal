![styled-terminal logo](https://github.com/liavbarsheshet/styled-terminal/blob/master/assets/styled-terminal.png?raw=true)

---

Create, manage styles for output terminal strings.

  [![NPM Version][npm-image]][npm-url]
  [![NPM Downloads][downloads-image]][downloads-url]

## Installation

Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```bash
$ npm install styled-terminal
```

## Demo
```js
const style = require('styled-terminal');

// Create global style templates - can be set on another module

// Headline 1
style.set("h1",{
    foreground: 'white',
    weight: 'bold',
    decoration: 'underline',
});

// Marked Text
style.set("marker",{
    background:'#7b8000',
    foreground:'white'
});

// Author Text
style.set("author",{
    foreground:'rgb(90,90,90)', // Equivalent to '#5a5a5a'
    decoration:'italic',
    weight:'light'
});

// Author Text Highlighted
style.set("authorHighlight",{
    foreground:'hsl(0,100%,100%)', // Equivalent to 'white'
    decoration:'italic underline', // can include more than one decoration: 'italic unerline crossed'
    weight:'light'
});

// Usage - DEMO

console.log('');

// Template styles
console.log(`My first styled-terminal log`.appendStyle('h1'));
console.log(`${`Hello`.appendStyle('marker')} World`);
console.log(`Created by Liav Barsheshet, ${`"LBDevelopments"`.appendStyle('authorHighlight')}`.appendStyle('author'));

console.log('');

// Manual styles
console.log(`Installation: ${`npm install styled-terminal`.appendStyle({
    foreground:'#2CC880',
    decoration:'italic',
    weight:'light'
})}`);
```

#### Output
![Demo Output](https://github.com/liavbarsheshet/styled-terminal/blob/master/assets/styled-terminal-demo.png?raw=true)

## Usage

### Style Object

Style object structure is consist of style properties.

```js
    const styleObject = {
        foreground:'...',
        background:'...',
        decoration:'...',
        visibility:'...',
        colorMode:'...',
        weight:'...',
    }
```

#### weight Property
    
_The weight propety sets how thick or thin characters in text should be displayed, it can be set to either 'bold' or 'light'._

#### colorMode Property

_The colorMode propety sets how the color should be displayed, it can be set to either 'auto' or 'inverted'._
    
#### visibility Property

_The colorMode property specifies whether or not a text is visible, it can be set to either 'visible' or 'hidden'._
    
#### decoration Property

_The decoration property specifies what decoration will be added to the text, it can be set to either 'underline' or 'italic' or 'crossed' or a combination separated by space, for example, 'italic underline'._
    
#### foreground Property

_The foreground property specifies the color of text, it can only recieve **valid color**._

#### background Property

_The background property sets the background color of a text, it can only recieve **valid color**._

#### Valid Colors

1. **Basic Colors**
    - 'black'
    - 'red'
    - 'green'
    - 'yellow'
    - 'blue',
    - 'magenta'
    - 'cyan'
    - 'white'  
2. **HEX Color** - '#RRGGBB', RR (red), GG (green) and BB (blue) are hexadecimal integers between 00 and FF specifying the intensity of the color.
3. **RGB Color** - 'rgb(red,green,blue)', Each parameter (red, green, and blue) defines the intensity of the color as an integer between 0 and 255.
4. **HSL Color** - 'hsl(h,s%,l%)', HSL stands for hue, saturation, and lightness.
    - Hue is a degree on the color wheel from 0 to 360.
    - Saturation is a percentage value, 0% means a shade of gray and 100% is the full color.
    - Lightness is also a percentage; 0% is black, 100% is white.

### Declaration

Include styled-terminal module.

```js
const style = require('styled-terminal'); // ES5
```

### Apply Style

This method appends style to a given string.

_Returns styled string for chaining._

```js
const style = require('styled-terminal'); // ES5

const styleObject = {...} || 'styleName';

const styledString = style.apply('Hello World', styleObject); // styleObject can be a style object or a name reference for a style template.

console.log(styledString); // prints the styled string.

```

### Append Style

This method appends style to a string (This function extends the string prototype).

_Returns styled string for chaining._

```js
const style = require('styled-terminal'); // ES5

const styleObject = {...} || 'styleName';

const styledString = 'Hello World'.appendStyle(styleObject); // styleObject can be a style object or a name reference for a style template.

console.log(styledString); // prints the styled string.

```

### Set Style Template

This method sets a style template with a given name or creates a copy from an existing style.

_Returns true if the style is set, others false._

```js
const style = require('styled-terminal'); // ES5

const styleObject = {...};

style.set('template', styleObject); // Creates a new global template called 'template'

const styledString = 'Hello World'.appendStyle('template'); // Append style to a string by style template name.

console.log(styledString); // prints the styled string.

```

### Get Style Template

This method gets the style object copy of an existing style by its name.

_Returns style object if it found, others undefined._

```js
const style = require('styled-terminal'); // ES5

const styleObject = style.get('template'); // Gets a copy style object of 'template'.

console.log(styledString); // prints the copy styled object.

```

### Multi Set Style Template

This method set styles from a given object(string: styleName, object: styleObject).

_Returns an object containing the styles that have been set or not._

```js
const style = require('styled-terminal'); // ES5

const resultObject = style.multiSet({
    'style1':{...},
    'style2':{...},
    'style3':{...},
    ...
});

console.log(resultObject); // prints what styles have been set or not.

```

### Set Style Template From Files

This method sets styles from a given JSON files path.

_Returns a promise which resolves a result object._

```js
const style = require('styled-terminal'); // ES5

style.setFromFiles('./styles_file_0.json','./styles_file_1.json',....)
.then(resultObject =>{
    console.log(resultObject); // prints what styles have been set or not.
});

```

#### Styles File

Here is an example of json style file, _**myStyles.json**_:

```json
{
    "h1":{ "weight":"bold", "decoration":"underline", "foreground":"white"},
    "subtext":{ "weight":"light", "decoration":"italic", "foreground":"#505050"}
}
```

### Change Overwrite Mode

This method sets the overwrite mode.

```js
const style = require('styled-terminal'); // ES5

style.set('style',{weight:'bold'});
style.set('style',{weight:'light'}); // Will not change 'style', the default overwrite is false.
style.overwrite(true);
style.set('style',{weight:'light'}); // Will change 'style'.

style.overwriteToggle(); // (true => false), Will change the current overwrite mode to its negative.

```

## Tests

To run the test suite, first install the dependencies, then run `npm test`:

```bash
$ npm install
$ npm test
```

## Author

[Liav Barsheshet](https://github.com/liavbarsheshet)

## License

  [MIT](LICENSE)


[npm-image]: https://img.shields.io/npm/v/styled-terminal.svg
[npm-url]: https://www.npmjs.com/package/styled-terminal
[downloads-image]: https://img.shields.io/npm/dm/styled-terminal.svg
[downloads-url]: https://npmcharts.com/compare/styled-terminal?minimal=true