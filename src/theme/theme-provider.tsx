import { useEffect } from "react";
import { useThemeStore } from "./theme-store";
import type { ThemeMode } from "./colors";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const hydrate = useThemeStore((s) => s.hydrate);
  const mode = useThemeStore((s) => s.mode);
  const setMode = useThemeStore((s) => s.setMode);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    if (mode !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => setMode("system");
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [mode, setMode]);

  return <>{children}</>;
}

export function useTheme() {
  const mode = useThemeStore((s) => s.mode);
  const resolved = useThemeStore((s) => s.resolved);
  const setMode = useThemeStore((s) => s.setMode);
  const toggle = useThemeStore((s) => s.toggle);

  return {
    theme: mode,
    setTheme: (t: ThemeMode) => setMode(t),
    resolved,
    toggle,
    isDark: resolved === "dark",
  };
}
