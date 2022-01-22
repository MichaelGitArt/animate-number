export type StopAnimationFn = () => void
export type SetValueCallback = (value: number) => void
export type CurrentValue = number

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

  /**
   * is called when the animation is stopped manually.
   * @param value - last value passed to `on` callback
   */
  stopped?: (value: CurrentValue) => void

  /**
   * is called when the animation is completed.
   * @param value - equal to the `to` parameter of the function. the final value
   */
  completed?: (value: CurrentValue) => void

  /**
   * is called when the animation is completed or stopped.
   * @param value - last value passed to `on` callback
   */
  done?: (value: CurrentValue) => void
}

export interface IAnimateByIntervalParams extends IParams {
  /**
   * frames per second
   */
  fps?: number
}
