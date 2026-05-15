'use client'

import { useState } from 'react'
import { font } from '@/tokens/typography'
import { space } from '@/tokens/spacing'
import { border } from '@/tokens/borders'

export interface ActionCardConfig {
  id: string
  title: string
  description: string
  cta: string
  href: string
}

interface ActionCardGridProps {
  cards: readonly ActionCardConfig[]
}

interface ActionCardProps {
  card: ActionCardConfig
}

function ActionCard({ card }: ActionCardProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <article
      style={{
        backgroundColor: 'var(--surface)',
        border: 'var(--border-thin)',
        borderRadius: border.radius.md,
        padding: `${space[5]} ${space[6]}`,
        display: 'flex',
        flexDirection: 'column',
        gap: space[2],
      }}
    >
      <h2
        style={{
          fontFamily: font.family.sans,
          fontSize: font.size.base,
          fontWeight: font.weight.medium,
          color: 'var(--text)',
          margin: 0,
          lineHeight: font.lineHeight.tight,
        }}
      >
        {card.title}
      </h2>
      <p
        style={{
          fontFamily: font.family.sans,
          fontSize: font.size.base,
          fontWeight: font.weight.regular,
          color: 'var(--text-muted)',
          margin: 0,
          lineHeight: font.lineHeight.normal,
          flexGrow: 1,
        }}
      >
        {card.description}
      </p>
      <div style={{ marginTop: space[3] }}>
        <a
          target='_blank'
          href={card.href}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            height: '32px',
            padding: `0 ${space[3]}`,
            fontFamily: font.family.sans,
            fontSize: font.size.sm,
            fontWeight: font.weight.regular,
            color: 'var(--text)',
            backgroundColor: hovered ? 'var(--btn-hover-bg)' : 'transparent',
            border: hovered ? 'var(--border-hover)' : 'var(--border-base)',
            borderRadius: border.radius.sm,
            textDecoration: 'none',
            transition: 'all 80ms ease',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          {card.cta}
        </a>
      </div>
    </article>
  )
}

export function ActionCardGrid({ cards }: ActionCardGridProps) {
  return (
    <div
      className="card-grid"
      style={{
        display: 'grid',
        gap: space[4],
      }}
    >
      {cards.map((card) => (
        <ActionCard key={card.id} card={card} />
      ))}
    </div>
  )
}
