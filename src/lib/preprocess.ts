

export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/x/g, " ")
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function extractRestrictions(text: string): string[] {
  const matches = text.match(/[A-Z]{3}/g);

  return matches ?? [];
}
