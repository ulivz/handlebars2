# Handlebars2.js
> Just making happiness for [handlebars.js](https://github.com/wycats/handlebars.js)

## Badges

[![NPMversion](https://img.shields.io/npm/v/handlebars2.svg?style=flat)](https://npmjs.com/package/handlebars2) [![NPMdownloads](https://img.shields.io/npm/dm/handlebars2.svg?style=flat)](https://npmjs.com/package/handlebars2) [![CircleCI](https://circleci.com/gh/ulivz/handlebars2/tree/master.svg?style=shield)](https://circleci.com/gh/ulivz/handlebars2/tree/master) [![codecov](https://codecov.io/gh/ulivz/handlebars2/branch/master/graph/badge.svg)](https://codecov.io/gh/ulivz/handlebars2)

## Install

Install _handlebars2_:

```bash
# Either globally
yarn global add handlebars2
# Or locally (preferred)
yarn add handlebars2 --save--dev
```

or, If you use `npm`:

```bash
npm i handlebars2 -g
npm i handlebars2 --save-dev
```

## Quick Start

Import in your project:

```js
// ES6 Module
import Handlebars2 from 'handlebars2'

// Or, if you use CommonJS
const Handlebars2 = require('handlebars2')

// Go hacking!
```

## API

### Handlebars2.render(template, context)

#### template 

-  type: __{string}__
-  description: template string

#### context
- type: __{object}__
- description: context used to render template
  
```js
const template = '{{ name }}'
Handlebars2.render(template, {name: 'Handlebars2'}) // => Handlebars2
```  

### Handlebars2.renderPartial(partialName)

#### partialName

- type: __{string}__
- description: render a partial registered by `Handlebars2.registerPartial`

```js
Handlebars2.registerPartial('temp', '{{name}}')
Handlebars2.renderPartial('temp', { name: 'Handlebars2' }) // => Handlebars2
```

## built-in helpers

### partial

- [Code](https://github.com/ulivz/handlebars2/blob/master/src/helpers/core.js#L37) | [Test](https://github.com/ulivz/handlebars2/blob/master/test/index.test.js#L50)


A helper for using `Handlebars.registerPartial` in your template.

### slot

- [Code](https://github.com/ulivz/handlebars2/blob/master/src/helpers/core.js#L43) | [Test](https://github.com/ulivz/handlebars2/blob/master/test/index.test.js#L50)


A helper for using `Handlebars.renderPartial` in your template.

__example__:

```handlebars
{{#partial "p1"}}
  {{ name }}
{{/partial}}

{{#slot "p1"}}
{{/slot}}
```

```js
const ctx = { name: 'hbs2' }
```

Rendering result will be `hbs2`.

### json

- [Code](https://github.com/ulivz/handlebars2/blob/master/src/helpers/core.js#L49) | [Test](https://github.com/ulivz/handlebars2/blob/master/test/index.test.js#L62)

A helper used to `JSON stringify` the giving input.

__example__:

```handlebars
{{json data}}
```

```js
const context = { data: { statusCode: 200, msg: 'success'} }
```

Rendering result will be `'{"statusCode":200,"msg":"success"}'`.


### trim

- [Code](https://github.com/ulivz/handlebars2/blob/master/src/helpers/core.js#L54) | [Test](https://github.com/ulivz/handlebars2/blob/master/test/index.test.js#L69)

A helper used to `trim` the giving input.


### camelize

- [Code](https://github.com/ulivz/handlebars2/blob/master/src/helpers/core.js#L59) | [Test](https://github.com/ulivz/handlebars2/blob/master/test/index.test.js#L75)

A helper used to `camelize` the __hyphenated__ giving input.

__example__:

```handlebars
{{camelize name}}
```

```js
const context = { name: 'camel-case' }
```

Rendering result will be `'camelCase'`.


### hyphenate

- [Code](https://github.com/ulivz/handlebars2/blob/master/src/helpers/core.js#L64) | [Test](https://github.com/ulivz/handlebars2/blob/master/test/index.test.js#L81)

Opposite to [camelize](#camelize), A helper used to `hyphenate` the __camelized__ giving input.

__example__:

```handlebars
{{hyphenate name}}
```

```js
const context = { name: 'camelCase' }
```

Rendering result will be `'camel-case'`.


### split

- [Code](https://github.com/ulivz/handlebars2/blob/master/src/helpers/core.js#L69) | [Test](https://github.com/ulivz/handlebars2/blob/master/test/index.test.js#L93)

A helper used to combine the __camelized__ giving input with specified hyphen.
A helper used to combine the __camelized__ giving input with specified hyphen.

__example__:

```handlebars
{{ split name sep=sep }}
```

```js
const context = { name: 'camelCase', sep: '_' }
```

Rendering result will be `'camel_case'`.

> If not giving `sep`, default is `' '`


### normalizeurl

- [Code](https://github.com/ulivz/handlebars2/blob/master/src/helpers/core.js#L75) | [Test](https://github.com/ulivz/handlebars2/blob/master/test/index.test.js#L99)

A helper used to normalize the URL.

```
http://www.v2js.com => v2js.com 
https://www.v2js.com => v2js.com 
www.v2js.com => v2js.com 
```

### nospace

- [Code](https://github.com/ulivz/handlebars2/blob/master/src/helpers/core.js#L80) | [Test](https://github.com/ulivz/handlebars2/blob/master/test/index.test.js#L105)

A helper that outputs the content without any space.

### nobreak

- [Code](https://github.com/ulivz/handlebars2/blob/master/src/helpers/core.js#L85) | [Test](https://github.com/ulivz/handlebars2/blob/master/test/index.test.js#L110)

A helper that outputs the content without any break.

### noindent

- [Code](https://github.com/ulivz/handlebars2/blob/master/src/helpers/core.js#L90) | [Test](https://github.com/ulivz/handlebars2/blob/master/test/index.test.js#L115)

A helper that outputs the content without any line-first indent

### noblankline

- [Code](https://github.com/ulivz/handlebars2/blob/master/src/helpers/core.js#L102) | [Test](https://github.com/ulivz/handlebars2/blob/master/test/index.test.js#L120)

A helper that outputs the content without any blank line.


## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

**handlebars2** © [ULIVZ](https://github.com/ulivz), Released under the [MIT](./LICENSE) License.

Authored and maintained by ULIVZ with help from contributors ([list](https://github.com/ulivz/handlebars2/contributors)).

> [v2js.com](http://v2js.com) · GitHub [@ULIVZ](https://github.com/ulivz)
