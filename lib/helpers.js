"use strict"

const { camelize, hyphenate, split } = require('./util')

const setupHelpers = Handlebars => {

  const SafeString = Handlebars.SafeString
  const getPartial = (name) => Handlebars.partials[name]

  const helpersMap = {

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
      let partial = getPartial(`partial_${name}`) || opts.fn
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
      return new SafeString(result.replace(/(^\s+|\s+$)/gm, ''))
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

    normalizeurl(value) {
      return new SafeString(value.replace(/^https?:\/\/(www.)?/, ''))
    }

  }

  Object.keys(helpersMap).forEach(name => {
    Handlebars.registerHelper(name, helpersMap[name])
  })

}

exports.setupHelpers = setupHelpers
