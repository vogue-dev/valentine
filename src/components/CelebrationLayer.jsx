import { HEART_ITEMS } from '../constants/hearts'

function CelebrationLayer({ accepted }) {
  if (!accepted) {
    return null
  }

  return (
    <div className="celebration-layer" aria-hidden="true">
      {HEART_ITEMS.map((item) => (
        <span
          key={item.id}
          className={`heart ${item.type}`}
          style={{
            left: item.left,
            fontSize: item.size,
            animationDelay: item.delay,
            animationDuration: item.duration,
            color: item.color,
            '--drift': item.drift,
            '--drift-mid': item.driftMid,
            '--wobble': item.wobble,
            '--spin': item.spin,
            '--spin-end': item.spinEnd,
            '--tilt': item.tilt,
          }}
        >
          {item.symbol}
        </span>
      ))}
    </div>
  )
}

export default CelebrationLayer
