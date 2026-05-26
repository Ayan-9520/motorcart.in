export function extractHashtags(text: string): string[] {
  const re = /#([\p{L}\p{N}_]+)/gu;
  const out = new Set<string>();
  let m: RegExpExecArray | null;
  const s = text.toLowerCase();
  while ((m = re.exec(s)) !== null) {
    if (m[1].length <= 64) out.add(m[1]);
  }
  return [...out];
}
