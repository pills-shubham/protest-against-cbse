// lib/content.ts
// All page copy lives here — no hardcoded strings in JSX

export const content = {
  hero: {
    headline: '#UnfairCBSE',
    body: "CBSE's grading policies are pushing students into unfair outcomes. We're building a record of what's happening and demanding accountability. Join thousands who've already signed.",
  },

  cards: [
    {
      id: 'discord',
      title: 'join the discord community',
      description: 'connect with students sharing their experience',
      cta: 'join server →',
      href: 'https://discord.gg/QA8UVnSStE',
    },
    {
      id: 'petition',
      title: 'sign the petition',
      description: 'add your name on change.org and make it count',
      cta: 'sign now →',
      href: 'https://c.org/wbMkDmC2KT',
    },
    {
      id: "instagram",
      title: "follow us on instagram",
      description: "follow us on instagram for latest updates",
      cta: "follow now →",
      href: "https://www.instagram.com/protestagainstcbse1305/",
    }
  ],
} as const
