/** SEO utility — updates document head for SPA routes */
export function setPageMeta(options: {
  title?: string;
  description?: string;
  ogImage?: string;
}) {
  const { title, description, ogImage } = options;
  const base = "Motorcart.in";

  if (title) {
    document.title = title.includes(base) ? title : `${title} | ${base}`;
  }

  if (description) {
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", description);
  }

  if (ogImage) {
    let og = document.querySelector('meta[property="og:image"]');
    if (!og) {
      og = document.createElement("meta");
      og.setAttribute("property", "og:image");
      document.head.appendChild(og);
    }
    og.setAttribute("content", ogImage);
  }
}
