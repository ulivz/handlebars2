/**
 * @api public/helpers
 */
import {
  registerPartial,
  getPartial,
  SafeString,
  camelize,
  hyphenate,
  split
} from './utils'

const trimLeft = /^\s+/
const trimRight = /\s+$/

/**
 * Check necessary arguements
 * @param argMap
 */
function nullCheck(argMap) {
  const argkeys = Object.keys(argMap)
  for (let i = 0, l = argkeys.length; i < l; i++) {
    if (!argMap[argkeys[i]]) {
      throw new Error(`Expected arguement "${argkeys[i]}"`)
    }
  }
}

export default {
  /**
   * @name partial
   * @description Registers partials accessible by any template in the environment
   * @param name {String}
   * @return null
   * @example test/fixtures/templates/partial-slot.hbs
   */
  partial(name, opts) {
    nullCheck({ name: arguments[0] })
    registerPartial(`partial_${name}`, opts.fn)
  },


  slot(name, opts) {
    nullCheck({ name: arguments[0] })
    const partial = getPartial(`partial_${name}`) || opts.fn
    return partial(this, { data: opts.hash })
  },

  json(ctx) {
    nullCheck({ ctx: arguments[0] })
    return new SafeString(JSON.stringify(ctx))
  },

  trim(opts) {
    const result = opts.fn(this)
    return new SafeString(result.replace(trimLeft, '').replace(trimRight, ''))
  },

  camelize(ctx) {
    nullCheck({ ctx: arguments[0] })
    return new SafeString(camelize(ctx))
  },

  hyphenate(ctx) {
    nullCheck({ ctx: arguments[0] })
    return new SafeString(hyphenate(ctx))
  },

  split(ctx, opts) {
    nullCheck({ ctx: arguments[0] })
    let sep = opts.hash && opts.hash.sep || ' '
    return new SafeString(split(ctx, sep))
  },

  normalizeurl(ctx) {
    nullCheck({ ctx: arguments[0] })
    return new SafeString(ctx.replace(/^https?:\/\/(www.)?/, ''))
  },

  nospace(opts) {
    const result = opts.fn(this)
    return new SafeString(result.replace(/\s/g, ''))
  },

  nobreak(opts) {
    const result = opts.fn(this)
    return new SafeString(result.replace(/\n/g, ''))
  },

  noindent(opts) {
    const result = opts.fn(this)
    return new SafeString(
      result
        .replace(/^/gm, '<TOL>')
        .replace(/<TOL>(\s*)\n/gm, '<br>')
        .replace(/(<TOL>|<br>)(\s+)/gm, '$1')
        .replace(/<TOL>/g, '')
        .replace(/<br>/g, '\n')
    )
  },

  noblankline(opts) {
    const result = opts.fn(this)
    return new SafeString(result.replace(/\s*\n\s*/g, '\n'))
  }
}
