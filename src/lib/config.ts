import type { BezierParams } from './types'

export const easingTypes: Record<string, BezierParams> = {
  ease: [0.25, 0.1, 0.25, 1],
  linear: [0, 0, 1, 1],
  easeIn: [0.42, 0, 1, 1],
  easeOut: [0, 0, 0.58, 1],
  easeInOut: [0.42, 0, 0.58, 1],
  default: [0.5, 0, 0.5, 1],
}

export const defaults = {
  FPS: 60,
  BEZIER: easingTypes.default,
}
