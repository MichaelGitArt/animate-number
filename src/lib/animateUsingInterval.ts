
import BezierEasing from 'bezier-easing'

// types
import type { AnimateByIntervalFn, IAnimateByIntervalParams, StopAnimationFn } from './types'

import { defaults } from './config'

/**
 * animate number using `setInterval`
 */
export const animateUsingInterval: AnimateByIntervalFn = ({
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
