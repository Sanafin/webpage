// Decorative laurel branch; mirror it for the right-hand side.
export function Laurel({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  const leaves = [0, 1, 2, 3, 4, 5]
  return (
    <svg
      viewBox="0 0 24 56"
      className={className}
      style={flip ? { transform: "scaleX(-1)" } : undefined}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18 54 C 8 44, 6 26, 14 4" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      {leaves.map((i) => {
        const y = 48 - i * 8
        const x = 12 - Math.sin(i / 2) * 2.5
        return (
          <g key={i}>
            <ellipse cx={x - 4} cy={y} rx="4.2" ry="1.8" transform={`rotate(-35 ${x - 4} ${y})`} />
            <ellipse cx={x + 3} cy={y - 3} rx="3.6" ry="1.6" transform={`rotate(-70 ${x + 3} ${y - 3})`} />
          </g>
        )
      })}
    </svg>
  )
}
