import fs from 'fs'
import path from 'path'
import Handlebars2 from '../dist/handlebar2'
import comparison from '../src/helpers/comparison'
let { render, renderPartial } = Handlebars2
const templateDir = path.join(__dirname, 'fixtures/templates')

/**
 * For quickly catch the error
 * @param fn
 * @returns {Promise}
 * @constructor
 */
function Promisify(fn) {
  const args = arguments
  return new Promise(resolve => {
    resolve(fn && fn(...[...args].slice(1)))
  })
}

function get(name) {
  const target = path.join(templateDir, `${name}.hbs`)
  if (!fs.existsSync(target)) {
    throw new Error('No such template!')
  }
  return fs.readFileSync(target, 'utf-8')
}

describe('api', () => {
  test('should renderPartial work', () => {
    Handlebars2.registerPartial('temp', '{{name}}')
    let result = Handlebars2.renderPartial('temp', { name: 'Handlebars2' })
    expect(result).toBe('Handlebars2')
  })
})


describe('render', () => {

  /**
   * core.js
   */
  describe('core helpers', () => {
    test('base', () => {
      const ctx = { name: 'ulivz' }
      const result = render(get('base'), ctx)
      expect(result).toBe('ulivz')
    })

    test('partial & slot', () => {
      const ctx = { name: 'ulivz' }
      const result = render(get('partial-slot'), ctx)
      expect(result).toBe('ulivz')
    })

    test('json', () => {
      const ctx = { name: { name: 'ulivz' } }
      const result = render(get('json'), ctx)
      expect(result).toBe('{"name":"ulivz"}')
    })

    test('json - throw error', () => {
      return Promisify(render, get('json'))
        .catch(error => {
          expect(error.message).toBe('Expected arguement "ctx"')
        })
    })

    test('trim', () => {
      const ctx = { name: 'Luke Chen' }
      const result = render(get('trim'), ctx)
      expect(result).toBe('Luke Chen')
    })

    test('camelize', () => {
      const ctx = { name: 'camel-case' }
      const result = render(get('camelize'), ctx)
      expect(result).toBe('camelCase')
    })

    test('hyphenate', () => {
      const ctx = { name: 'camelCase' }
      const result = render(get('hyphenate'), ctx)
      expect(result).toBe('camel-case')
    })

    test('split - default', () => {
      const ctx = { name: 'camelCase' }
      const result = render(get('split'), ctx)
      expect(result).toBe('camel case')
    })

    test('split', () => {
      const ctx = { name: 'camelCase', sep: '_' }
      const result = render(get('split'), ctx)
      expect(result).toBe('camel_case')
    })

    test('normalizeurl', () => {
      const ctx = { url: 'http://www.v2js.com' }
      const result = render(get('normalizeurl'), ctx)
      expect(result).toBe('v2js.com')
    })

    test('nospace', () => {
      const result = render(get('nospace'))
      expect(result).toBe('abc')
    })

    test('nobreak', () => {
      const result = render(get('nobreak'))
      expect(result).toBe('a  b    c')
    })

    test('noindent', () => {
      const result = render(get('noindent'))
      expect(result).toBe('a\n\nb\n\n\nc\n')
    })

    test('noblankline', () => {
      const result = render(get('noblankline'))
      console.log({ a: result })
      expect(result).toBe('a\nb\nc\n')
    })
  })

  /**
   * comparison.js
   */
  describe('comparison', () => {
    test('and', () => {
      const ctx = { a: true, b: false }
      const result = render(get('and'), ctx)
      expect(result).toBe('false')
    })
  })
})


describe('mock', () => {

  const mockOpts = {
    fn: () => true,
    inverse: () => false
  }

  test('renderPartial', () => {
    Handlebars2.registerPartial('p1', get('base'))
    const result = Handlebars2.renderPartial('p1', { name: 'ulivz' })
    expect(result).toBe('ulivz')
  })

  test('renderPartial - should throw error when not found partial', () => {
    return Promisify(renderPartial, 'p2').catch(error => {
      expect(error.message).toBe('cannot find partial p2')
    })
  })

  test('compare', () => {
    const c1 = comparison.compare(1, '==', '1', mockOpts)
    expect(c1).toBe(true)
    const c2 = comparison.compare(1, '===', '1', mockOpts)
    expect(c2).toBe(false)
    const c3 = comparison.compare(1, '!=', '1', mockOpts)
    expect(c3).toBe(false)
    const c4 = comparison.compare(1, '!==', '1', mockOpts)
    expect(c4).toBe(true)
    const c5 = comparison.compare(2, '>', 1, mockOpts)
    expect(c5).toBe(true)
    const c6 = comparison.compare(2, '<', 1, mockOpts)
    expect(c6).toBe(false)
    const c7 = comparison.compare(1, '<=', 1, mockOpts)
    expect(c7).toBe(true)
    const c8 = comparison.compare(1, '>=', 1, mockOpts)
    expect(c8).toBe(true)
    const c9 = comparison.compare(1, 'typeof', 'number', mockOpts)
    expect(c9).toBe(true)
    return Promise.all([
      Promisify(comparison.compare, 1).catch(error => {
        expect(error.message).toBe(
          'handlebars Helper {{compare}} expects 4 arguments'
        )
      }),
      Promisify(comparison.compare, 1, '?', 1, mockOpts).catch(error => {
        expect(error.message).toBe('helper {{compare}}: invalid operator: `?`')
      })
    ])
  })
})
