import fs from 'fs'
import path from 'path'
import { render } from '../src'
import core from '../src/helpers/core'
import comparison from '../src/helpers/comparison'

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

describe('render', () => {
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

    test('trim', () => {
      const ctx = { name: 'Luke Chen' }
      const result = render(get('trim'), ctx)
      expect(result).toBe('Luke Chen')
    })
  })

  describe('comparison', () => {
    test('and', () => {
      const ctx = { a: true, b: false }
      const result = render(get('and'), ctx)
      expect(result).toBe('false')
    })
  })
})

const mockOpts = {
  fn: () => true,
  inverse: () => false
}

describe('mock', async () => {
  test('and', () => {
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
