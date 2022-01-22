import { describe, expect, it } from 'vitest'
import { animate } from '../lib/animate'

import { awaitEnough, awaitNotEnough, baseParams, toValue } from './test.utils'

describe('base functionality', () => {
  it('reach the value "to" when the required time has passed', async() => {
    let number = 0
    animate({
      ...baseParams,
      on: (value) => {
        number = value
      },
    })

    await awaitEnough()
    expect(number).toBe(toValue)
  })

  it('should not reach the value "to" if not enough time has passed', async() => {
    let number = 0
    animate({
      ...baseParams,
      on: (value) => {
        number = value
      },
    })

    await awaitNotEnough()
    expect(number).not.toBe(toValue)
  })
})
