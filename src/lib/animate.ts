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
}: IAnimateByIntervalParams): StopAnimationFn => {
  const easingFn = BezierEasing(...bezier)
  const difference = to - from

  const frames = Math.round(duration / (1000 / fps))
  console.log('frames', frames)
  let frame = 1

  const intervalId = setInterval(() => {
    let progress = frame / frames
    if (progress > 1)
      progress = 1

    const value = from + (difference * easingFn(progress))
    on(value)

    if (progress === 1)
      clearInterval(intervalId)

    frame++
  }, duration / frames)

  return () => {
    clearInterval(intervalId)
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
}: IParams): StopAnimationFn => {
  const easingFn = BezierEasing(...bezier)
  const difference = to - from

  const timestamp = Date.now()
  let rqfId = 0

  const fn = () => {
    let progress = (Date.now() - timestamp) / duration
    if (progress > 1)
      progress = 1

    const value = from + (difference * easingFn(progress))
    on(value)

    if (progress === 1)
      return

    rqfId = requestAnimationFrame(fn)
  }

  rqfId = requestAnimationFrame(fn)

  return () => {
    cancelAnimationFrame(rqfId)
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
