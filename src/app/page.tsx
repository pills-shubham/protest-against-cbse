import { HeroSection } from '@/components/HeroSection'
import { ActionCardGrid } from '@/components/ActionCardGrid'
import { content } from '@/lib/content'

export default function Home() {
  return (
    <main
      className="page-outer"
      style={{
        backgroundColor: 'var(--bg)',
        minHeight: '100vh',
      }}
    >
      <div
        style={{
          maxWidth: '720px',
          margin: '0 auto',
          padding: '1rem',
        }}
      >
        <HeroSection
          headline={content.hero.headline}
          body={content.hero.body}
        />
        <ActionCardGrid cards={content.cards} />
      </div>
    </main>
  )
}
