/* eslint-disable no-console */
import BezierEasing from 'bezier-easing'

// types
import type { IAnimateByIntervalParams, IParams, StopAnimationFn } from './types'

import { defaults } from './config'

/**
 * animate number using `setInterval`
 */
export const animateUsingInterval = ({
  from,
  to,
  duration,
  fps = defaults.FPS,
  bezier = defaults.BEZIER,
  on,
  completed,
  stopped,
  done,
}: IAnimateByIntervalParams): StopAnimationFn => {
  const easingFn = BezierEasing(...bezier)
  const difference = to - from

  const frames = Math.round(duration / (1000 / fps))
  let frame = 1
  let currentValue = from

  const intervalId = setInterval(() => {
    let progress = frame / frames
    if (progress > 1)
      progress = 1

    currentValue = from + (difference * easingFn(progress))
    on(currentValue)

    if (progress === 1) {
      clearInterval(intervalId)
      completed?.(currentValue)
      done?.(currentValue)
    }

    frame++
  }, duration / frames)

  return () => {
    clearInterval(intervalId)
    stopped?.(currentValue)
    done?.(currentValue)
  }
}

/**
 * animate number using `requestAnimationFrame`
 */
export const animateUsingRAF = ({
  from,
  to,
  duration,
  bezier = defaults.BEZIER,
  on,
  completed,
  stopped,
  done,
}: IParams): StopAnimationFn => {
  const easingFn = BezierEasing(...bezier)
  const difference = to - from

  const timestamp = Date.now()
  let rqfId = 0
  let currentValue = from

  const fn = () => {
    let progress = (Date.now() - timestamp) / duration
    if (progress > 1)
      progress = 1

    currentValue = from + (difference * easingFn(progress))
    on(currentValue)

    if (progress === 1) {
      completed?.(currentValue)
      done?.(currentValue)
      return
    }

    rqfId = requestAnimationFrame(fn)
  }

  rqfId = requestAnimationFrame(fn)

  return () => {
    cancelAnimationFrame(rqfId)
    stopped?.(currentValue)
    done?.(currentValue)
  }
}

/**
 * animate number using `requestAnimationFrame`
 */
export function animate(params: IParams, type?: 'raf'): StopAnimationFn

/**
 * animate number using `setInterval`
 */
export function animate(params: IAnimateByIntervalParams, type?: 'interval'): StopAnimationFn

export function animate(params: IParams | IAnimateByIntervalParams, type: 'raf' | 'interval' = 'raf'): StopAnimationFn {
  if (type === 'raf')
    return animateUsingRAF(params)

  else if (type === 'interval')
    return animateUsingInterval(params)

  else
    throw new Error('Wrong animate type passed')
}
