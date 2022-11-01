import BezierEasing from 'bezier-easing'

// types
import type { AnimateFn, IParams, StopAnimationFn } from './types'

import { defaults } from './config'

/**
 * animate number using `requestAnimationFrame`
 */
export const animate: AnimateFn = ({
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
