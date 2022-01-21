# Animate Number

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