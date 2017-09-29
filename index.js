import Handlebars from 'handlebars/lib/handlebars'
import {setupHelpers} from './lib'

setupHelpers(Handlebars)

function render(tmp, context) {
  const compiler = Handlebars.compile(tmp)
  return compiler(context)
}

function renderPartial(name, context) {
  let partial = Handlebars.partials[name]
  return partial ? partial(context) : (new Error(`cannot find partial ${name}`))
}

export {
  Handlebars as default,
  render,
  renderPartial
}