const HEART_SYMBOLS = ['♥', '♡', '❣']
const HEART_COLORS = ['#ff4d8d', '#ff7abf', '#ff6b6b', '#ffa65c', '#f284ff', '#ff8fab']

const randomRange = (min, max) => Math.random() * (max - min) + min
const randomItem = (items) => items[Math.floor(Math.random() * items.length)]

export const HEART_ITEMS = Array.from({ length: 84 }, (_, index) => {
  const angle = randomRange(-28, 28)
  const drift = randomRange(-160, 160)
  const driftMid = drift * randomRange(0.4, 0.75)
  const wobble = randomRange(12, 36)

  return {
    id: `heart-${index}`,
    left: `${randomRange(0, 100).toFixed(2)}%`,
    size: `${Math.round(randomRange(25, 48))}px`,
    delay: `${randomRange(0, 1.8).toFixed(2)}s`,
    duration: `${randomRange(3.2, 6.4).toFixed(2)}s`,
    color: randomItem(HEART_COLORS),
    drift: `${drift.toFixed(1)}px`,
    driftMid: `${driftMid.toFixed(1)}px`,
    wobble: `${wobble.toFixed(1)}px`,
    spin: `${randomRange(-50, 50).toFixed(1)}deg`,
    spinEnd: `${randomRange(210, 520).toFixed(1)}deg`,
    tilt: `${angle.toFixed(1)}deg`,
    symbol: randomItem(HEART_SYMBOLS),
    type: `heart-${Math.floor(randomRange(1, 4))}`,
  }
})
