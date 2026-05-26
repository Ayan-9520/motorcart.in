/** Spacing, typography, radii, shadows — theme-agnostic scales */

export const spacing = {
  sectionY: "4rem",
  sectionYMd: "6rem",
  cardPadding: "1.5rem",
  navHeight: "4rem",
} as const;

export const radius = {
  sm: "0.5rem",
  md: "0.75rem",
  lg: "1rem",
  xl: "1.25rem",
  "2xl": "1.25rem",
  full: "9999px",
} as const;

export const typography = {
  fontFamily: '"Inter", system-ui, sans-serif',
  h1: "text-4xl font-bold tracking-tight text-foreground md:text-5xl",
  h2: "text-3xl font-bold tracking-tight text-foreground md:text-4xl",
  h3: "text-xl font-semibold text-foreground",
  body: "text-base text-foreground",
  bodyMuted: "text-sm text-muted-foreground",
  label: "text-sm font-medium text-foreground",
  caption: "text-xs text-muted-foreground",
} as const;

export const shadows = {
  card: "var(--shadow-card)",
  cardHover: "var(--shadow-card-hover)",
  wa: "var(--shadow-primary)",
} as const;
