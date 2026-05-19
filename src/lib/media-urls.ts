/** Optimized CDN image URL for listings (WebP, crop, high quality) */
export function optimizeImageUrl(
  url: string,
  opts: { w?: number; h?: number; q?: number } = {}
): string {
  const { w = 1200, h, q = 85 } = opts;
  if (url.includes("images.unsplash.com")) {
    const base = url.split("?")[0]!;
    const params = new URLSearchParams({
      auto: "format",
      fit: "crop",
      w: String(w),
      q: String(q),
    });
    if (h) params.set("h", String(h));
    return `${base}?${params}`;
  }
  if (url.includes("images.pexels.com") && !url.includes("?")) {
    return `${url}?auto=compress&cs=tinysrgb&w=${w}&h=${h ?? Math.round(w * 0.67)}`;
  }
  if (url.includes("upload.wikimedia.org") && !url.includes("/thumb/")) {
    return url;
  }
  return url;
}

export function unsplash(id: string, w = 1200): string {
  return optimizeImageUrl(`https://images.unsplash.com/${id}`, { w });
}

export function pexels(id: number, w = 1200): string {
  return optimizeImageUrl(
    `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg`,
    { w }
  );
}
