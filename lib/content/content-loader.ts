import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { parseMarkdownFile } from './markdown';
import type { ArtworkMeta, BlogPostMeta, ContentStatus } from './models';

const CONTENT_ROOT = path.join(process.cwd(), 'content');

function toStringValue(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback;
}

function toNumberValue(value: unknown, fallback = 0): number {
  return typeof value === 'number' ? value : fallback;
}

function toArrayValue(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === 'string');
  }

  if (typeof value === 'string') {
    return value
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

function toContentStatus(value: unknown): ContentStatus {
  const valid: ContentStatus[] = ['draft', 'scheduled', 'published', 'archived'];
  return typeof value === 'string' && valid.includes(value as ContentStatus)
    ? (value as ContentStatus)
    : 'draft';
}

async function readMarkdownCollection<T>(
  collectionName: string,
  mapper: (slug: string, frontmatter: Record<string, unknown>, body: string) => T
): Promise<T[]> {
  const folderPath = path.join(CONTENT_ROOT, collectionName);
  const entries = await readdir(folderPath, { withFileTypes: true });

  const markdownFiles = entries.filter((entry) => entry.isFile() && entry.name.endsWith('.md'));

  const items = await Promise.all(
    markdownFiles.map(async (entry) => {
      const filePath = path.join(folderPath, entry.name);
      const raw = await readFile(filePath, 'utf8');
      const { frontmatter, body } = parseMarkdownFile(raw);
      const slug = entry.name.replace(/\.md$/, '');
      return mapper(slug, frontmatter, body);
    })
  );

  return items;
}

export async function getArtworkEntries(): Promise<Array<ArtworkMeta & { body: string }>> {
  const artworks = await readMarkdownCollection('artworks', (slug, frontmatter, body) => ({
    slug,
    title: toStringValue(frontmatter.title, slug),
    excerpt: toStringValue(frontmatter.excerpt),
    status: toContentStatus(frontmatter.status),
    publishedAt: toStringValue(frontmatter.publishedAt),
    updatedAt: toStringValue(frontmatter.updatedAt),
    tags: toArrayValue(frontmatter.tags),
    medium: toStringValue(frontmatter.medium),
    dimensions: toStringValue(frontmatter.dimensions),
    year: toNumberValue(frontmatter.year),
    style: toStringValue(frontmatter.style),
    theme: toStringValue(frontmatter.theme),
    imageUrl: toStringValue(frontmatter.imageUrl),
    body
  }));

  return artworks.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export async function getBlogPostEntries(): Promise<Array<BlogPostMeta & { body: string }>> {
  const posts = await readMarkdownCollection('posts', (slug, frontmatter, body) => ({
    slug,
    title: toStringValue(frontmatter.title, slug),
    excerpt: toStringValue(frontmatter.excerpt),
    status: toContentStatus(frontmatter.status),
    publishedAt: toStringValue(frontmatter.publishedAt),
    updatedAt: toStringValue(frontmatter.updatedAt),
    tags: toArrayValue(frontmatter.tags),
    category: toStringValue(frontmatter.category),
    coverImageUrl: toStringValue(frontmatter.coverImageUrl),
    readingMinutes: toNumberValue(frontmatter.readingMinutes),
    body
  }));

  return posts.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export async function getContentModelSummary() {
  const [artworks, posts] = await Promise.all([getArtworkEntries(), getBlogPostEntries()]);

  return {
    artworks: artworks.length,
    posts: posts.length,
    activeStatuses: ['draft', 'scheduled', 'published', 'archived'] as const
  };
}
