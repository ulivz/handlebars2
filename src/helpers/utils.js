let Handlebars
let SafeString
let getPartial
let registerPartial

/**
 * Initialize handlebars for some utils
 * @param h
 */
function initialize(h) {
  Handlebars = h
  SafeString = Handlebars.SafeString.bind(Handlebars)
  registerPartial = Handlebars.registerPartial.bind(Handlebars)
  getPartial = name => Handlebars.partials[name]
}

/**
 * Camelize a hyphen-delimited string.
 */
const camelizeRE = /-(\w)/g
const camelize = function(str) {
  return str.replace(camelizeRE, (_, c) => {
    return c ? c.toUpperCase() : ''
  })
}

/**
 * Hyphenate a camelCase string.
 */
const hyphenateRE = /\B([A-Z])/g
const hyphenate = function(str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
}

/**
 * Split a camelCase string by specified seperator
 */
const split = function(str, sep) {
  return str.replace(hyphenateRE, `${sep || ' '}$1`).toLowerCase()
}

export {
  initialize,
  registerPartial,
  SafeString,
  getPartial,
  camelize,
  hyphenate,
  split
}
