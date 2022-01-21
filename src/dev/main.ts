import './scss/main.scss'
import { animate } from '../lib/animate'

const box = document.querySelector('.box') as HTMLElement
const track = document.querySelector('.track') as HTMLElement

const marginLeft = track.offsetWidth - box.offsetWidth - 40

document.querySelector('.btn1')?.addEventListener('click', () => {
  animate({
    from: 0,
    to: marginLeft,
    duration: 1500,
    on: (value) => {
      box.style.marginLeft = `${value}px`
    },
  }, 'interval')
})

document.querySelector('.btn2')?.addEventListener('click', () => {
  animate({
    from: 0,
    to: marginLeft,
    duration: 1500,
    on: (value) => {
      box.style.marginLeft = `${value}px`
    },
  }, 'raf')
})
