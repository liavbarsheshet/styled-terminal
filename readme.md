# styled-terminal
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
const styles = require('./index');

// Create global style templates - can be set on another module

// Headline 1
styles.set("h1",{
    foreground: 'white',
    weight: 'bold',
    decoration: 'underline',
});

// Marked Text
styles.set("marker",{
    background:'#7b8000',
    foreground:'white'
});

// Author Text
styles.set("author",{
    foreground:'rgb(90,90,90)', // Equivalent to '#909090'
    decoration:'italic',
    weight:'light'
});

// Author Text Highlighted
styles.set("authorHighlight",{
    foreground:'hsl(0,100,100)', // Equivalent to 'white'
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