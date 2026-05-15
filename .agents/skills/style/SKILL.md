# Antigravity Design System
**Next.js · Data-first · Brutally minimal**

---

## Philosophy

> Show the data. Remove everything else.

Antigravity's UI exists to surface numbers, states, and relationships — not to impress. Every visual decision is justified by information density. If it doesn't help the user understand data faster, it doesn't exist.

**Three principles:**
1. **Data is the hero.** Numbers and values lead. Labels support.
2. **Zero decoration.** No gradients, no shadows, no illustrations. Structure from whitespace and thin borders alone.
3. **Instant comprehension.** A user should understand any component in under 1 second.

---

## Tokens

### Colors

```ts
// tokens/colors.ts
export const colors = {
  // Neutrals — primary palette
  white:    '#FFFFFF',
  black:    '#0A0A0A',
  gray50:   '#F7F7F6',
  gray100:  '#EDEDEB',
  gray200:  '#D5D4CF',
  gray400:  '#8A8A84',
  gray600:  '#5A5A56',
  gray800:  '#2A2A28',

  // Semantic — data states only
  positive: '#1D9E75',   // growth, success, up
  negative: '#E24B4A',   // loss, error, down
  warning:  '#BA7517',   // caution, pending
  neutral:  '#378ADD',   // info, selected, link

  // Surfaces
  surface:  '#FFFFFF',
  bg:       '#F7F7F6',
  bgAlt:    '#F0EFEB',
} as const
```

**Rule:** Never use color decoratively. Only use `positive`, `negative`, `warning`, `neutral` when encoding real data meaning.

### Typography

```ts
// tokens/typography.ts
export const font = {
  family: {
    mono: "'JetBrains Mono', 'Fira Code', monospace",  // numbers, values, code
    sans: "'Geist', 'DM Sans', system-ui, sans-serif",  // labels, UI text
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
  }
} as const
```

**Rule:** All data values (numbers, percentages, timestamps) render in `font.family.mono`. Labels in `font.family.sans`. Weights only 400 or 500 — never bold or heavy.

### Spacing

```ts
// tokens/spacing.ts
export const space = {
  1:  '4px',
  2:  '8px',
  3:  '12px',
  4:  '16px',
  5:  '20px',
  6:  '24px',
  8:  '32px',
  10: '40px',
  12: '48px',
  16: '64px',
} as const
```

### Borders & Radius

```ts
// tokens/borders.ts
export const border = {
  thin:   '0.5px solid #EDEDEB',
  base:   '1px solid #EDEDEB',
  strong: '1px solid #D5D4CF',

  radius: {
    sm:  '4px',
    md:  '6px',
    lg:  '8px',
    xl:  '12px',
  }
} as const
```

**Rule:** Default to `border.thin`. Use `border.strong` only for focused or active states.

### Transitions

```ts
export const transition = {
  fast:   'all 80ms ease',
  base:   'all 140ms ease',
  slow:   'all 220ms ease',
} as const
```

---

## Layout

### Grid

```tsx
// 12-column grid, 24px gutter
// Use CSS Grid directly — no layout libraries

<div style={{
  display: 'grid',
  gridTemplateColumns: 'repeat(12, 1fr)',
  gap: '24px',
  maxWidth: '1280px',
  margin: '0 auto',
  padding: '0 24px',
}}>
```

### Page structure

```
┌─────────────────────────────────────────────┐
│ TopBar (48px)  ─ breadcrumb + page actions  │
├─────────────────────────────────────────────┤
│ KPI Row (auto) ─ 3–5 metric cards           │
├─────────────────────────────────────────────┤
│ Main content area (flex or grid)            │
│   ┌────────────────────┐ ┌────────────────┐ │
│   │ Primary (8 cols)   │ │ Side (4 cols)  │ │
│   └────────────────────┘ └────────────────┘ │
└─────────────────────────────────────────────┘
```

---

## Components

### MetricCard

The most important component. Displays a single KPI.

```tsx
interface MetricCardProps {
  label: string
  value: string | number
  unit?: string
  delta?: number        // positive = good, negative = bad
  deltaLabel?: string   // e.g. "vs last month"
  invertDelta?: boolean // true when lower is better (e.g. error rate)
}

// Rules:
// - value uses mono font, xl size
// - label uses sans, sm size, gray400
// - delta shows colored arrow + percentage, mono font
// - no icons, no illustrations
// - border: thin, radius: md, padding: 20px 24px
// - white background always
```

**Visual anatomy:**

```
┌──────────────────────────────┐
│ Revenue                      │  ← label (12px sans gray400)
│ $482,391          ↑ 12.4%   │  ← value (28px mono black) + delta (12px mono positive)
│                  vs last mo  │  ← deltaLabel (11px sans gray400)
└──────────────────────────────┘
```

### DataTable

```tsx
// Rules:
// - thead: 11px sans, gray400, uppercase tracking-wide, border-bottom strong
// - tbody rows: 13px sans, 40px row height, border-bottom thin
// - numeric columns: mono font, right-aligned
// - text columns: sans, left-aligned
// - hover state: bg gray50, transition fast
// - no zebra stripes
// - no rounded corners on table itself
// - status cells use StatusBadge component

interface DataTableProps<T> {
  columns: {
    key: keyof T
    label: string
    type: 'text' | 'number' | 'currency' | 'percent' | 'status' | 'date'
    align?: 'left' | 'right'
    width?: string
  }[]
  data: T[]
  onRowClick?: (row: T) => void
}
```

**Column type formatting:**

| Type       | Font    | Align | Format example      |
|------------|---------|-------|---------------------|
| `text`     | sans    | left  | Acme Corp           |
| `number`   | mono    | right | 1,482               |
| `currency` | mono    | right | $48,200.00          |
| `percent`  | mono    | right | 94.2%               |
| `status`   | sans    | left  | `<StatusBadge />`   |
| `date`     | mono    | right | 2024-05-14          |

### StatusBadge

```tsx
type Status = 'active' | 'inactive' | 'pending' | 'error' | 'warning'

// Visual: small dot + label text
// No border, no background fill
// dot: 6px circle, colored by status
// label: 12px sans, gray600
// gap between dot and label: 6px

const statusColors: Record<Status, string> = {
  active:   '#1D9E75',  // positive
  inactive: '#8A8A84',  // gray400
  pending:  '#BA7517',  // warning
  error:    '#E24B4A',  // negative
  warning:  '#BA7517',  // warning
}
```

### Sparkline

```tsx
// Inline mini chart — lives inside table cells or metric cards
// Width: 80–120px, Height: 28–32px
// No axes, no labels, no tooltip by default
// Line: 1.5px stroke, color by trend (positive/negative/neutral)
// Fill: 10% opacity fill below the line
// Use recharts or victory-native stripped to bare minimum

interface SparklineProps {
  data: number[]
  width?: number       // default 96
  height?: number      // default 28
  positive?: boolean   // drives line color
}
```

### SegmentBar

```tsx
// Horizontal bar showing proportional breakdown
// Height: 6px, radius: 3px, no gaps between segments
// Labels below: 11px mono, same color as segment
// Max 5 segments — use "Other" bucket beyond that

interface SegmentBarProps {
  segments: {
    label: string
    value: number
    color: string  // use tokens.colors.*
  }[]
}
```

### FilterRow

```tsx
// Horizontal row of filter controls
// Lives at top of data-heavy pages/sections
// Pills for discrete values, date pickers for ranges
// Active filter: border-strong, black text
// Inactive filter: border-thin, gray400 text
// Height: 32px, font: 12px sans
// Clear all button appears only when filters are active

interface FilterRowProps {
  filters: FilterConfig[]
  active: Record<string, unknown>
  onChange: (key: string, value: unknown) => void
  onClear: () => void
}
```

### EmptyState

```tsx
// When a data view has no data
// NO illustrations, NO icons larger than 16px
// Center aligned: label (13px sans gray400) + optional action button
// Keep it boring — empty state is not the moment for personality
// Example:
//   "No transactions found"
//   [Adjust filters]
```

### LoadingSkeleton

```tsx
// Rectangular gray blocks that match the shape of loading content
// Background: gray100, animated pulse (opacity 0.5 → 1 → 0.5, 1.2s infinite)
// Border-radius: same as the element being replaced
// No spinners anywhere in the product
```

---

## Charts

All charts use **recharts** with a shared config. No chart.js, no d3 directly.

```ts
// chart-config.ts — shared across all charts
export const chartDefaults = {
  // Axes
  axisStyle: {
    fontSize: 11,
    fontFamily: font.family.mono,
    fill: colors.gray400,
    tickLine: false,
    axisLine: false,
  },
  // Grid
  gridStyle: {
    stroke: colors.gray100,
    strokeDasharray: '0',  // solid, not dashed
  },
  // Tooltip
  tooltipStyle: {
    backgroundColor: colors.white,
    border: border.strong,
    borderRadius: border.radius.sm,
    fontSize: 12,
    fontFamily: font.family.mono,
    boxShadow: 'none',
  },
  // Animations
  animationDuration: 300,
  animationEasing: 'ease-out',
}
```

**Chart rules:**
- X-axis: dates in `YYYY-MM-DD` or `MMM DD` format, mono font
- Y-axis: numbers with SI suffix (1K, 2.4M) — never full numbers on axis
- Grid: horizontal lines only, thin, gray100
- Tooltip: shows raw values, mono font — appears on hover only
- Legend: text only, 12px sans, no icons or boxes
- Colors: 1–3 data series max per chart; use `positive`, `neutral`, `negative`, and `gray400`
- Line charts: 1.5px stroke, no dot markers unless < 10 data points
- Bar charts: no border-radius on bars, gap ratio 0.3
- No pie charts — use SegmentBar or horizontal bars instead

---

## States

Every interactive element must handle all states explicitly:

| State    | Visual change                              |
|----------|--------------------------------------------|
| default  | border.thin                                |
| hover    | border.base, bg gray50, transition fast    |
| active   | border.strong, bg gray100                  |
| focus    | 2px offset ring, color neutral             |
| disabled | opacity 0.4, cursor not-allowed            |
| loading  | replaced by LoadingSkeleton or spinner     |
| error    | border 1px negative, label color negative  |

---

## Forms

```tsx
// All form elements: 36px height, 13px sans
// Input border: thin, radius md
// Input padding: 0 12px
// Focus: border-strong + focus ring (2px neutral, 2px offset)
// Error: border negative-color, error message 11px negative below field
// Label: 12px sans gray600, 4px above field
// Helper text: 11px sans gray400, 4px below field

// DO NOT use floating labels — static labels above only
// DO NOT use custom dropdowns — use native <select> styled to match
```

---

## Responsive

| Breakpoint | Width    | Behavior                           |
|------------|----------|------------------------------------|
| `sm`       | < 640px  | Single column, stacked cards       |
| `md`       | 640–1024px | 2-col grid, side panels collapse |
| `lg`       | > 1024px | Full layout, all columns visible   |

**On mobile:** Tables become card lists. KPIs stack vertically. Charts reduce to sparklines.

---

## Writing / Copy

- Labels: lowercase, concise. "total revenue" not "Total Revenue"
- Values: always formatted (commas, units, 2 decimal places for currency)
- Dates: ISO-style `2024-05-14` in tables, `May 14` in prose
- Empty states: plain, factual. No humor.
- Error messages: tell the user what happened + what to do. No blame.
- Avoid: "Please", "Simply", "Just", "Easy", "Powerful"

---

## Do / Don't

| ✓ Do                                          | ✗ Don't                                      |
|-----------------------------------------------|----------------------------------------------|
| Mono font for all numbers                     | Mix sans and mono in same numeric column     |
| Delta = colored number + directional arrow    | Use only color to encode delta direction     |
| Empty state with 1 plain sentence             | Add illustrations or emoji to empty states  |
| Format: `$1,482,300.00`                       | Format: `$1482300`                           |
| Thin 0.5px borders for separation             | Use background colors for separation        |
| Gray400 for all secondary text                | Use multiple gray shades for secondary text  |
| Filter → server-side data update              | Filter → hide rows client-side in DOM       |
| Status dot + label                            | Colored background badges for status        |

---

## File structure (Next.js)

```
src/
├── tokens/
│   ├── colors.ts
│   ├── typography.ts
│   ├── spacing.ts
│   └── borders.ts
├── components/
│   ├── data/
│   │   ├── MetricCard.tsx
│   │   ├── DataTable.tsx
│   │   ├── StatusBadge.tsx
│   │   ├── Sparkline.tsx
│   │   ├── SegmentBar.tsx
│   │   └── charts/
│   │       ├── chart-config.ts
│   │       ├── LineChart.tsx
│   │       └── BarChart.tsx
│   ├── ui/
│   │   ├── FilterRow.tsx
│   │   ├── EmptyState.tsx
│   │   ├── LoadingSkeleton.tsx
│   │   └── Button.tsx
│   └── layout/
│       ├── TopBar.tsx
│       ├── PageGrid.tsx
│       └── KPIRow.tsx
├── styles/
│   └── globals.css   ← resets only, no utility classes
└── lib/
    └── formatters.ts  ← all number/date formatting functions
```

---

## Formatters (required)

```ts
// lib/formatters.ts
// All data display goes through these — never format inline

export const fmt = {
  currency: (n: number, decimals = 2) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency', currency: 'USD',
      minimumFractionDigits: decimals,
    }).format(n),

  number: (n: number) =>
    new Intl.NumberFormat('en-US').format(n),

  compact: (n: number) =>
    new Intl.NumberFormat('en-US', { notation: 'compact' }).format(n),

  percent: (n: number, decimals = 1) =>
    `${n.toFixed(decimals)}%`,

  delta: (n: number) =>
    `${n >= 0 ? '↑' : '↓'} ${Math.abs(n).toFixed(1)}%`,

  date: {
    iso:   (d: Date) => d.toISOString().slice(0, 10),
    short: (d: Date) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    full:  (d: Date) => d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
  },
}
```