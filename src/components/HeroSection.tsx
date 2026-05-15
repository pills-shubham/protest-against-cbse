import { font } from '@/tokens/typography'
import { space } from '@/tokens/spacing'

interface HeroSectionProps {
  headline: string
  body: string
}

export function HeroSection({ headline, body }: HeroSectionProps) {
  return (
    <section
      style={{
        paddingBottom: space[10],
      }}
    >
      <h1
        className="hero-headline"
        style={{
          fontFamily:    font.family.mono,
          fontWeight:    font.weight.medium,
          color:         'var(--text)',
          lineHeight:    font.lineHeight.tight,
          margin:        0,
          marginBottom:  space[5],
          letterSpacing: '-0.5px',
        }}
      >
        {headline}
      </h1>
      <p
        style={{
          fontFamily: font.family.sans,
          fontSize:   font.size.md,
          fontWeight: font.weight.regular,
          color:      'var(--text-muted)',
          lineHeight: font.lineHeight.loose,
          margin:     0,
          maxWidth:   '520px',
        }}
      >
        {body}
      </p>
    </section>
  )
}
