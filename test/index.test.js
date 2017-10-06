// import fs from 'fs'
import { render } from '../src'

describe('', () => {
  test('should render correct - mustache', () => {
    const tmp = '{{ name }}'
    const ctx = { name: 'ulivz' }
    const result = render(tmp, ctx)
    expect(result).toBe('ulivz')
  })
})
