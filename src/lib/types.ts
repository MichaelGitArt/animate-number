export type StopAnimationFn = () => void
export type SetValueCallback = (value: number) => void

export type BezierParams = [number, number, number, number]

export interface IParams {
  /**
   * start value
   */
  from: number

  /**
   * end value
   */
  to: number

  /**
   * milliseconds
   */
  duration: number

  /**
   * bezier curve parameters
   */
  bezier?: BezierParams

  /**
   * a callback that is called many times until the animation is complete.
   * the current progress is passed as the first parameter.
   */
  on: SetValueCallback
}

export interface IAnimateByIntervalParams extends IParams {
  /**
   * frames per second
   */
  fps?: number
}
