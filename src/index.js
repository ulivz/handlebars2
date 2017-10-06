import handlebars from 'handlebars'
// import helpers from 'handlebars-helpers'
import helpers from './helpers'

/**
 * Setup helpers
 */
helpers(handlebars)

/**
 * render
 *
 * @param tmp
 * @param context
 */
function render(tmp, context) {
  const compiler = handlebars.compile(tmp)
  return compiler(context)
}

/**
 * render partial
 *
 * @param name
 * @param context
 * @returns {Error}
 */
function renderPartial(name, context) {
  const partial = handlebars.partials[name]
  return partial ? partial(context) : new Error(`cannot find partial ${name}`)
}

export { handlebars as default, render, renderPartial }
