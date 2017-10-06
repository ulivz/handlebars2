// import fs from 'fs'
import { render } from '../src'

describe('core helpers', () => {

  test('should render correct - mustache', () => {
    const tmp = '{{ name }}'
    const ctx = { name: 'ulivz' }
    const result = render(tmp, ctx)
    expect(result).toBe('ulivz')
  })

  test('partial & slot', () => {
    const tmp = `{{#partial "p1"}}{{ name }}{{/partial}}{{#slot "p1"}}{{/slot}}`
    const ctx = { name: 'ulivz' }
    const result = render(tmp, ctx)
    expect(result).toBe('ulivz')
  })

})
