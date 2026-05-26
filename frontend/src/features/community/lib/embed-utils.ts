import type { EmbedProvider } from "../types";

export function detectEmbedProvider(url: string): EmbedProvider | null {
  const u = url.toLowerCase();
  if (u.includes("youtube.com") || u.includes("youtu.be")) return "youtube";
  if (u.includes("linkedin.com")) return "linkedin";
  if (u.includes("instagram.com/reel") || u.includes("/reels/")) return "reel";
  return null;
}

export function youtubeEmbedSrc(url: string): string | null {
  try {
    const u = new URL(url);
    let id: string | null = u.searchParams.get("v");
    if (!id && u.hostname.includes("youtu.be")) id = u.pathname.slice(1).split("/")[0] ?? null;
    if (!id) return null;
    return `https://www.youtube-nocookie.com/embed/${id}`;
  } catch {
    return null;
  }
}

export function buildShareUrl(postId: string): string {
  const base = typeof window !== "undefined" ? window.location.origin : "";
  return `${base}/community/post/${postId}`;
}
