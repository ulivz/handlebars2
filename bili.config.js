module.exports = {
  // plugins: [
  // ],
  resolve: false, // rollup-plugin-commonjs
  // commonjs: {
  //   include: 'node_modules/**'
  // },
  exports: 'named',
  moduleName: 'handlebars2',
  format: 'es,cjs',
  compress: 'cjs',
  banner: {
    name: 'handlebars2',
    version: require('./package.json').version,
    author: require('./package.json').author,
    license: require('./package.json').license,
    year: 2016
  }
}
