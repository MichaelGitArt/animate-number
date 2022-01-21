export type StopAnimationFn = () => void
export type SetValueCallback = (value: number) => void

export type BezierParams = [number, number, number, number]

export interface IParams {
  from: number
  to: number
  duration: number
  bezier?: BezierParams
  on: SetValueCallback
}

export interface IAnimateByIntervalParams extends IParams {
  fps?: number
}
