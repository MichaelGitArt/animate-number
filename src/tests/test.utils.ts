export const delay = (ms: number) => new Promise(resolve => setTimeout(() => resolve(null), ms))
export const fromValue = 0
export const toValue = 10
export const durationValue = 100

export const awaitEnough = () => delay(durationValue * 1.1)
export const awaitNotEnough = () => delay(durationValue * 0.9)

export const baseParams = {
  from: fromValue,
  to: toValue,
  duration: durationValue,
  on: () => {},
}
