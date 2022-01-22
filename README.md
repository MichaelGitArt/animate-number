# Animate Number

A simple utility to animate a single number.

For more complex cases you can take a look at the [shifty](https://www.npmjs.com/package/shifty). The package can animate a few fields and control the animation timelines.

## Usage

```ts
import { animate } from '@gitart/animate-number'

animate({
  from: 0,
  to: 500,
  duration: 1000,
  on: (value) => {
    console.log('value: ', value)
  },
}
```

## Types

```ts
type Animate = (
  params: IParams | IAnimateByIntervalParams,
  type: 'raf' | 'interval' = 'raf'
): StopAnimationFn
```

```ts
interface IParams {
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
  on: (value: CurrentValue) => void

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
```
