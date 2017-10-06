import { camelize, hyphenate, split } from './util'

const trimLeft = /^\s+/
const trimRight = /\s+$/
const blankLine = /^(\s*)\n/g

export default function setupHelpers(Handlebars) {
  const SafeString = Handlebars.SafeString
  const getPartial = name => Handlebars.partials[name]

  const helpersMap = {
    /* [arguments...], options */
    partial(name, opts) {
      if (!name) {
        return
      }
      Handlebars.registerPartial(`partial_${name}`, opts.fn)
    },

    slot(name, opts) {
      if (!name) {
        return
      }
      const partial = getPartial(`partial_${name}`) || opts.fn
      return partial(this, { data: opts.hash })
    },

    base(name) {
      if (!name) {
        return
      }
      return new SafeString(name)
    },

    json(context) {
      if (!context) {
        return
      }
      return new SafeString(JSON.stringify(context))
    },

    trim(opts) {
      const result = opts.fn(this)
      return new SafeString(result.replace(trimLeft, '').replace(trimRight, ''))
    },

    camelize(ctx) {
      return new SafeString(camelize(ctx))
    },

    hyphenate(ctx) {
      return new SafeString(hyphenate(ctx))
    },

    split(ctx, opts) {
      return new SafeString(split(ctx, opts.hash.sep))
    },

    normalizeurl(ctx) {
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
      return new SafeString(result.replace(blankLine, ''))
    },

    ifeq(left, right, options) {
      if (!left || !right) {
        return
      }
      return left === right ? options.fn(this) : options.inverse(this)
    },

    ifuneq(left, right, options) {
      if (!left || !right) {
        return
      }
      return left === right ? options.inverse(this) : options.fn(this)
    }
  }

  Object.keys(helpersMap).forEach(name => {
    Handlebars.registerHelper(name, helpersMap[name])
  })
}
