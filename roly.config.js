const pkg = require('./package.json')
const banner = {
  name: 'handlebars2',
  version: pkg.version,
  author: pkg.author,
  license: pkg.license,
  year: 2016
}

module.exports = [
  {
    input: 'src/handlebar2-compiler.js',
    resolve: true,
    exports: 'default',
    filename: 'handlebar2',
    moduleName: 'Handlebars2',
    format: 'umd',
    compress: 'umd',
    banner
  },
  {
    input: 'src/handlebar2-runtime-compiler.js',
    resolve: true,
    exports: 'default',
    filename: 'handlebar2.runtime',
    moduleName: 'Handlebars2',
    format: 'umd',
    compress: 'umd',
    banner
  }
]
