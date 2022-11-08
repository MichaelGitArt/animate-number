# Animate Number

A simple utility to animate a single number. The number changes on each frame (by requestAnimationFrame).

For more complex cases, you can take a look at the [shifty](https://www.npmjs.com/package/shifty).
The package can animate a few fields and control the animation timelines.

🤯 [Demo](https://stackblitz.com/edit/gitart-animate-number-playground?file=src%2Fmain.ts&terminal=dev)

## Usage

### `animate`

`animate` works with `requestAnimationFrame` and changes the number on each frame.

```ts
import { animate } from 'gitart-animate-number'

const stopFn = animate({
  from: 0,
  to: 500,
  duration: 1000,
  on: (value) => {
    console.log('value: ', value)
  },
}

// stop animation if needed
stopFn()
```

### `animateUsingInterval`

`animateUsingInterval` works with `setInterval` and changes the number on each interval. Specify the interval by `fps` option.

```ts
import { animateUsingInterval } from 'gitart-animate-number'

const stopFn = animate({
  from: 0,
  to: 500,
  duration: 1000,
  fps: 60,
  on: (value) => {
    console.log('value: ', value)
  },
}
```

### easingTypes

You can specify `bezier` options by yourselft or use the `easingTypes`.
There is this types of easing:

```ts
type EasingTypes = 'ease' | 'easeIn' | 'easeOut' | 'easeInOut' | 'linear' | 'default'
```
[(source)](https://github.com/MichaelGitArt/animate-number/blob/main/src/lib/config.ts)

Usage:

```ts
import { animate, easingTypes } from 'gitart-animate-number'

const stopFn = animate({
  from: 0,
  to: 500,
  duration: 1000,
  easing: easingTypes.easeInOut, // the same like [0.42, 0, 0.58, 1]
  on: (value) => {
    console.log('value: ', value)
  },
}
```


## Details

### `animate`

`animate` works with `requestAnimationFrame` and changes the number on each frame.
perfect for browser environment.

```ts
type AnimateFn = (
  params: IParams,
) => StopAnimationFn
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
   * a callback called many times (on requestAnimationFrame) until the animation is complete.
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

### `animateUsingInterval`

`animateUsingInterval` works with `setInterval` and changes the number on each interval. To specify the interval, use the `fps` option.

```ts
type AnimateByIntervalFn = (
  params: IParams,
) => StopAnimationFn
```

```ts
interface IAnimateByIntervalParams extends IParams {
  /**
   * frames per second
   * default: 60
   * @example 10 means that the animation will be updated 10 times per second
   */
  fps?: number
}
```