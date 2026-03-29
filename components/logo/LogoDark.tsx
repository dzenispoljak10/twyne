export default function LogoDark({ width = 140, height = 32 }: { width?: number; height?: number }) {
  return (
    <svg width={width} height={height} viewBox="0 0 140 32" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="16" r="9" fill="none" stroke="#7C3AED" strokeWidth="2.5"/>
      <circle cx="32" cy="16" r="9" fill="none" stroke="#A78BFA" strokeWidth="2.5"/>
      <line x1="21" y1="16" x2="23" y2="16" stroke="#7C3AED" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="12" cy="16" r="3" fill="#7C3AED"/>
      <circle cx="32" cy="16" r="3" fill="#A78BFA"/>
      <text x="50" y="22" fontFamily="Manrope,sans-serif" fontWeight="800" fontSize="22" fill="#FFFFFF" letterSpacing="-1">twyne</text>
    </svg>
  )
}
