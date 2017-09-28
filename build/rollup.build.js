#!/usr/bin/env node
const rollup = require("rollup")
const babel = require("rollup-plugin-babel")
const eslint = require('rollup-plugin-eslint')
const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const replace = require('rollup-plugin-replace')
const uglify = require('rollup-plugin-uglify')
// const argv = require('yargs')
//   .option('p', {
//     alias: 'prob',
//     default: true,
//     boolean: true,
//     describe: 'is production enviroment',
//     type: 'boolean'
//   })
//   .argv;
// var isProb = argv.p;

module.exports = function (opts) {
  rollup.rollup({
    entry: 'src/' + opts.entry,
    plugins: (opts.plugins || []).concat([
      resolve({
        // Help node module to migrate to ES2015
        jsnext: true,
        // use "module" field for ES6 module if possible
        main: true,
        // some package.json files have a `browser` field which
        // specifies alternative files to load for people bundling
        // for the browser. If that's you, use this option, otherwise
        // pkg.browser will be ignored
        browser: true,
      }),
      // import existing CommonJS modules
      commonjs(),
      babel({
        exclude: 'node_modules/**'
      }),
      eslint({
        exclude: 'src/styles/**'
      }),
      replace({
        exclude: 'node_modules/**',
        ENV: JSON.stringify(process.env.NODE_ENV || 'development').replace(/\s/g, ''),
      })
    ])
  })
    .then(function (bundle) {
      var dest = 'lib/' + (opts.output || opts.entry)

      console.log(dest)
      bundle.write({
        format: "iife",
        moduleName: opts.moduleName || 'D',
        dest: dest,
        // sourceMap: 'inline'
      });
    })
    .catch(function (err) {
      console.log(err)
    })
}