/** SEO utility — updates document head for SPA routes */

const SITE = "Motorcart.in";

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

export function setPageMeta(options: {
  title?: string;
  description?: string;
  ogImage?: string;
  canonical?: string;
  noIndex?: boolean;
}) {
  const { title, description, ogImage, canonical, noIndex } = options;

  if (title) {
    const full = title.includes(SITE) ? title : `${title} | ${SITE}`;
    document.title = full;
    upsertMeta("property", "og:title", full);
    upsertMeta("name", "twitter:title", full);
  }

  if (description) {
    upsertMeta("name", "description", description);
    upsertMeta("property", "og:description", description);
    upsertMeta("name", "twitter:description", description);
  }

  if (ogImage) {
    upsertMeta("property", "og:image", ogImage);
    upsertMeta("name", "twitter:image", ogImage);
  }

  if (canonical) {
    upsertLink("canonical", canonical);
  }

  const robots = noIndex ? "noindex, nofollow" : "index, follow";
  upsertMeta("name", "robots", robots);
}

/** Private dashboards, auth, and admin — keep out of search indexes. */
export function setPrivatePageMeta(title: string) {
  setPageMeta({
    title,
    description: "Secure Motorcart account area.",
    noIndex: true,
  });
}
