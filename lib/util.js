/**
 * Camelize a hyphen-delimited string.
 */
const camelizeRE = /-(\w)/g;
const camelize = function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
}

/**
 * Hyphenate a camelCase string.
 */
const hyphenateRE = /\B([A-Z])/g;
const hyphenate = function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
}

exports.camelize = camelize
exports.hyphenate = hyphenate


