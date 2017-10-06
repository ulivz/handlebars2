export default {
  /**
   * Render a block when a comparison of the first and third
   * arguments returns true. The second argument is
   * the [arithemetic operator][operators] to use. You may also
   * optionally specify an inverse block to render when falsy.
   *
   * @param `a`
   * @param `operator` The operator to use. Operators must be enclosed in quotes: `">"`, `"="`, `"<="`, and so on.
   * @param `b`
   * @param {Object} `options` Handlebars provided options object
   * @return {String} Block, or if specified the inverse block is rendered if falsey.
   * @block
   * @api public
   */
  compare(a, operator, b, options) {
    /* eslint eqeqeq: 0 */

    if (arguments.length < 4) {
      throw new Error('handlebars Helper {{compare}} expects 4 arguments')
    }

    let result
    switch (operator) {
      case '==':
        result = a == b
        break
      case '===':
        result = a === b
        break
      case '!=':
        result = a != b
        break
      case '!==':
        result = a !== b
        break
      case '<':
        result = a < b
        break
      case '>':
        result = a > b
        break
      case '<=':
        result = a <= b
        break
      case '>=':
        result = a >= b
        break
      case 'typeof':
        result = typeof a === b
        break
      default: {
        throw new Error(
          'helper {{compare}}: invalid operator: `' + operator + '`'
        )
      }
    }

    return result ? options.fn(this) : options.inverse(this)
  },

  /**
   * Block helper that renders the block if **both** of the given values
   * are truthy. If an inverse block is specified it will be rendered
   * when falsy.
   *
   * @param {any} `a`
   * @param {any} `b`
   * @param {Object} `options` Handlebars provided options object
   * @return {String}
   * @block
   * @api public
   */

  and() {
    const len = arguments.length - 1
    const options = arguments[len]
    let val = true

    for (let i = 0; i < len; i++) {
      if (!arguments[i]) {
        val = false
        break
      }
    }

    return val ? options.fn(this) : options.inverse(this)
  }
}
