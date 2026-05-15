// tokens/typography.ts
export const font = {
  family: {
    mono: "var(--font-geist-mono), 'JetBrains Mono', 'Fira Code', monospace",
    sans: "var(--font-geist-sans), 'DM Sans', system-ui, sans-serif",
  },
  size: {
    xs:   '11px',  // metadata, timestamps
    sm:   '12px',  // labels, captions
    base: '13px',  // body, table cells
    md:   '15px',  // subheadings
    lg:   '20px',  // section headers
    xl:   '28px',  // KPI values
    xxl:  '40px',  // hero metrics
  },
  weight: {
    regular: 400,
    medium:  500,
  },
  lineHeight: {
    tight:  1.2,
    normal: 1.5,
    loose:  1.7,
  },
} as const
