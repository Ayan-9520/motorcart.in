/** Motorcart design tokens — single source of truth (hex) */

export const palette = {
  green: "#25D366",
  greenHover: "#1ebe5d",
  danger: "#ef4444",
  warning: "#f59e0b",
} as const;

export const lightColors = {
  background: "#f0f2f5",
  backgroundSecondary: "#ffffff",
  card: "#ffffff",
  navbar: "#ffffff",
  sidebar: "#ffffff",
  border: "#e5e7eb",
  foreground: "#111827",
  foregroundSecondary: "#6b7280",
  foregroundMuted: "#9ca3af",
  primary: palette.green,
  primaryHover: palette.greenHover,
  primaryForeground: "#ffffff",
  input: "#ffffff",
  accent: "#f3f4f6",
  destructive: palette.danger,
} as const;

export const darkColors = {
  background: "#0b141a",
  backgroundSecondary: "#111b21",
  card: "#1f2c34",
  navbar: "#111b21",
  sidebar: "#111b21",
  border: "#2a3942",
  foreground: "#ffffff",
  foregroundSecondary: "#b0b3b8",
  foregroundMuted: "#8696a0",
  primary: palette.green,
  primaryHover: palette.greenHover,
  primaryForeground: "#ffffff",
  input: "#111b21",
  accent: "#1f2c34",
  destructive: palette.danger,
} as const;

export type ThemeMode = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";
