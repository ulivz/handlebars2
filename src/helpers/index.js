import comparison from './comparison'
import core from './core'
import { initialize } from './utils'

/**
 * Register handlebar helpers
 * @param Handlebars
 */
export default function helpers(Handlebars) {
  function setup(helpersMap) {
    Object.keys(helpersMap).forEach(name => {
      Handlebars.registerHelper(name, helpersMap[name])
    })
  }

  initialize(Handlebars)
  setup(comparison)
  setup(core)
}
