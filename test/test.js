const fs = require('fs')
const path = require('path')
const render = require('../dist/handlebars2.js').render

const context = {
  usage: true,
  author: 'ULIVZ',
  username: 'ulivz',
  name: 'plain-template',
  camelCaseName: 'plainTemplate',
  website: 'http://www.v2js.com',
  logo: {
    img: 'https://cdn.rawgit.com/ulivz/v-codemirror/master/media/logo.svg',
    width: 300,
    description: "How's it different from a boilerplate?"
  },
  badges: {
    version: true,
    downloads: true,
    codecov: true,
    ci: true,
    coverage: true
  },
  install: {
    newname: 'Install it',
    yarn: true,
    npm: true
  },
  faq: {
    newname: 'Q & A',
    qaList: [
      {
        q: "How's it different from a boilerplate?",
        a: `It's hard to upgrade your project if you're using a boilerplate since you might change the code to suit your needs. However you can easily upgrade your project to use latest version of Poi by simply updating the dependency. You can also get rid of boilerplate code in this way.`
      }
    ]
  },
  using: {
    newname: 'Projects Using Docute',
    usingList: [
      {
        name: 'codepan',
        username: 'egoist',
        description: 'Like codepen and jsbin but works offline.'
      }
    ]
  },
  customizeColums: [
    {
      title: 'Who is using Poi?',
      content: 'usings'
    }
  ]
}

const readmeTmpl = fs.readFileSync(
  path.resolve(__dirname, './test.hbs'),
  'utf-8'
)

fs.writeFileSync('./test/test-result.hbs', render(readmeTmpl, context), 'utf-8')
