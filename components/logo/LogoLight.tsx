import Image from 'next/image'

export default function LogoLight({ height = 32 }: { width?: number; height?: number }) {
  return (
    <Image
      src="/twyne-logo.png"
      alt="Twyne"
      width={1521}
      height={471}
      priority
      style={{ height: `${height}px`, width: 'auto', display: 'block' }}
    />
  )
}
