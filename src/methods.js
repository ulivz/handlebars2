import { registerPartial } from './helpers/utils'

export default function(handlebars) {
  /**
   * render
   *
   * @param tmp {string}
   * @param context {object}
   */
  handlebars.render = function(template, context) {
    const compiler = handlebars.compile(template)
    return compiler(context)
  }

  /**
   * register partial
   */
  handlebars.registerPartial = registerPartial

  /**
   * render partial
   *
   * @param name {string}
   * @param context {object}
   * @returns {Error|string}
   */
  handlebars.renderPartial = function(name, context) {
    const partial = handlebars.partials[name]
    if (!partial) {
      throw new Error(`cannot find partial ${name}`)
    }
    return handlebars.render(partial, context)
  }
}
