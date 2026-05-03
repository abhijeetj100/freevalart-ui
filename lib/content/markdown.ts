type FrontmatterValue = string | number | boolean | string[];

export interface ParsedMarkdown {
  frontmatter: Record<string, FrontmatterValue>;
  body: string;
}

function coerceScalar(value: string): string | number | boolean {
  const trimmed = value.trim();

  if (trimmed === 'true') {
    return true;
  }

  if (trimmed === 'false') {
    return false;
  }

  const numeric = Number(trimmed);
  if (!Number.isNaN(numeric) && trimmed !== '') {
    return numeric;
  }

  return trimmed;
}

function coerceValue(raw: string): FrontmatterValue {
  const trimmed = raw.trim();

  if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
    return trimmed
      .slice(1, -1)
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
  }

  if (trimmed.includes(',') && !trimmed.includes('://')) {
    const items = trimmed
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);

    if (items.length > 1) {
      return items;
    }
  }

  return coerceScalar(trimmed);
}

export function parseMarkdownFile(content: string): ParsedMarkdown {
  if (!content.startsWith('---\n')) {
    return { frontmatter: {}, body: content };
  }

  const end = content.indexOf('\n---\n', 4);
  if (end === -1) {
    return { frontmatter: {}, body: content };
  }

  const rawFrontmatter = content.slice(4, end).trim();
  const body = content.slice(end + 5).trim();
  const frontmatter: Record<string, FrontmatterValue> = {};

  for (const line of rawFrontmatter.split('\n')) {
    const separator = line.indexOf(':');
    if (separator === -1) {
      continue;
    }

    const key = line.slice(0, separator).trim();
    const value = line.slice(separator + 1).trim();

    if (!key) {
      continue;
    }

    frontmatter[key] = coerceValue(value);
  }

  return { frontmatter, body };
}
