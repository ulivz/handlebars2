import handlebars from 'handlebars'
import helpers from './helpers'
import { registerPartial } from './helpers/utils'

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
  if (!partial) {
    throw new Error(`cannot find partial ${name}`)
  }
  return render(partial, context)
}

export { handlebars as default, render, renderPartial, registerPartial }
