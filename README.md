# TitleCaseIt

[![npm](https://img.shields.io/npm/v/@ahmadawais/titlecaseit.svg?style=flat-square)](https://www.npmjs.com/package/@ahmadawais/titlecaseit)

> Convert any text to title case.

![TitleCaseIt](https://i.imgur.com/IoZQh1Y.png)

## Web App

Use the free web tool at [TitleCaseIt.AhmadAwais.com](https://titlecaseit.ahmadawais.com/)

## Install

```sh
npm install @ahmadawais/titlecaseit
```

## Usage

### Node.js (CommonJS)

```js
const titleCaseIt = require('@ahmadawais/titlecaseit');

titleCaseIt('the quick brown fox');
//=> 'The Quick Brown Fox'

titleCaseIt('a tale of two cities');
//=> 'A Tale of Two Cities'
```

### Node.js (ESM)

```js
import titleCaseIt from '@ahmadawais/titlecaseit';

titleCaseIt('the quick brown fox');
//=> 'The Quick Brown Fox'
```

### Browser (CDN)

```html
<script src="https://unpkg.com/@ahmadawais/titlecaseit"></script>
<script>
  console.log(titleCaseIt('hello world'));
  //=> 'Hello World'
</script>
```

## How It Works

Words like `a`, `an`, `the`, `and`, `but`, `or`, `for`, `nor`, `on`, `at`, `to`, `by`, `in`, `of`, `per`, `vs`, `via`, `en`, `as`, `if` are kept lowercase unless they are the first or last word. Words with internal capitals (like `iPhone`) or dots (like `U.S.A.`) are left unchanged.

## Changelog

Read the [CHANGELOG.md](CHANGELOG.md) for details.

## License

GPL-2.0 (C) [Ahmad Awais](https://AhmadAwais.com/)
