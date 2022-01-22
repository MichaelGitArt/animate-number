import { describe, expect, it, vi } from 'vitest'
import { animate } from '../lib/animate'

import { awaitEnough, baseParams } from './test.utils'

describe('hooks', () => {
  it('"completed" hook should be called when the required time has passed', async() => {
    const completedFnSpy = vi.fn()

    animate({
      ...baseParams,
      completed: completedFnSpy,
    })

    await awaitEnough()
    expect(completedFnSpy).toHaveBeenCalledOnce()
  })

  it('"completed" and "done" hooks should be called when the required time has passed', async() => {
    const completedFnSpy = vi.fn()
    const doneFnSpy = vi.fn()

    animate({
      ...baseParams,
      completed: completedFnSpy,
      done: doneFnSpy,
    })

    await awaitEnough()
    expect(completedFnSpy).toHaveBeenCalledOnce()
    expect(doneFnSpy).toHaveBeenCalledOnce()
  })

  it('"stopped" and "done" hooks should be called if we cancel animation', async() => {
    const stoppedFnSpy = vi.fn()
    const doneFnSpy = vi.fn()

    const cancel = animate({
      ...baseParams,
      stopped: stoppedFnSpy,
      done: doneFnSpy,
    })

    cancel()

    expect(stoppedFnSpy).toHaveBeenCalledOnce()
    expect(doneFnSpy).toHaveBeenCalledOnce()
  })
})
