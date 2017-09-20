const Handlebars = require('handlebars/dist/cjs/handlebars.js')
const { setupHelpers } = require('./lib')

setupHelpers(Handlebars)

module.exports = Handlebars

module.exports.render = function render(tmp, context) {
  const compiler = Handlebars.compile(tmp)
  return compiler(context)
}

module.exports.renderPartial = (name, context) => {
  let partial = Handlebars.partials[name]
  return partial ? partial(context) : (new Error(`cannot find partial ${name}`))
}