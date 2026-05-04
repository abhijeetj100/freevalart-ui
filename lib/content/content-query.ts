import type { ArtworkMeta, BlogPostMeta } from './models';

type SearchableContent = {
  title: string;
  excerpt: string;
  tags: string[];
  publishedAt: string;
};

type BlogScoredPost = BlogPostMeta & { score: number };
type ArtworkScoredItem = ArtworkMeta & { score: number };

function normalizeValue(value: string | undefined): string {
  return value?.trim().toLowerCase() ?? '';
}

function buildSearchTarget(item: SearchableContent): string {
  return [item.title, item.excerpt, item.tags.join(' ')].join(' ').toLowerCase();
}

function uniqueValues(values: Array<string | undefined>): string[] {
  return [...new Set(values.map(normalizeValue).filter(Boolean))].sort((a, b) => a.localeCompare(b));
}

function scoreTagMatches(sourceTags: string[], candidateTags: string[]): number {
  const sourceSet = new Set(sourceTags.map(normalizeValue));
  return candidateTags.reduce((score, tag) => (sourceSet.has(normalizeValue(tag)) ? score + 1 : score), 0);
}

export function normalizeSearchTerm(value: string | undefined): string {
  return normalizeValue(value);
}

export function getPostFilterOptions(posts: BlogPostMeta[]) {
  return {
    categories: uniqueValues(posts.map((post) => post.category)).map((value) => ({
      value,
      label: value
    })),
    tags: uniqueValues(posts.flatMap((post) => post.tags)).map((value) => ({
      value,
      label: value
    }))
  };
}

export function getArtworkFilterOptions(artworks: ArtworkMeta[]) {
  return {
    mediums: uniqueValues(artworks.map((artwork) => artwork.medium)).map((value) => ({
      value,
      label: value
    })),
    styles: uniqueValues(artworks.map((artwork) => artwork.style)).map((value) => ({
      value,
      label: value
    })),
    themes: uniqueValues(artworks.map((artwork) => artwork.theme)).map((value) => ({
      value,
      label: value
    })),
    tags: uniqueValues(artworks.flatMap((artwork) => artwork.tags)).map((value) => ({
      value,
      label: value
    }))
  };
}

export function filterBlogPosts(
  posts: BlogPostMeta[],
  filters: { query?: string; category?: string; tag?: string }
): BlogPostMeta[] {
  const query = normalizeSearchTerm(filters.query);
  const category = normalizeSearchTerm(filters.category);
  const tag = normalizeSearchTerm(filters.tag);

  return posts.filter((post) => {
    const matchesQuery = !query || buildSearchTarget(post).includes(query);
    const matchesCategory = !category || normalizeSearchTerm(post.category) === category;
    const matchesTag = !tag || post.tags.some((item) => normalizeSearchTerm(item) === tag);

    return matchesQuery && matchesCategory && matchesTag;
  });
}

export function filterArtworks(
  artworks: ArtworkMeta[],
  filters: { query?: string; medium?: string; style?: string; theme?: string; tag?: string }
): ArtworkMeta[] {
  const query = normalizeSearchTerm(filters.query);
  const medium = normalizeSearchTerm(filters.medium);
  const style = normalizeSearchTerm(filters.style);
  const theme = normalizeSearchTerm(filters.theme);
  const tag = normalizeSearchTerm(filters.tag);

  return artworks.filter((artwork) => {
    const matchesQuery = !query || buildSearchTarget(artwork).includes(query);
    const matchesMedium = !medium || normalizeSearchTerm(artwork.medium) === medium;
    const matchesStyle = !style || normalizeSearchTerm(artwork.style) === style;
    const matchesTheme = !theme || normalizeSearchTerm(artwork.theme) === theme;
    const matchesTag = !tag || artwork.tags.some((item) => normalizeSearchTerm(item) === tag);

    return matchesQuery && matchesMedium && matchesStyle && matchesTheme && matchesTag;
  });
}

export function getRelatedBlogPosts(posts: BlogPostMeta[], currentPost: BlogPostMeta, limit = 3) {
  return posts
    .filter((post) => post.slug !== currentPost.slug)
    .map<BlogScoredPost>((post) => {
      let score = 0;

      if (normalizeSearchTerm(post.category) === normalizeSearchTerm(currentPost.category)) {
        score += 3;
      }

      score += scoreTagMatches(currentPost.tags, post.tags);

      return { ...post, score };
    })
    .sort((a, b) => b.score - a.score || b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, limit);
}

export function getRelatedArtworks(
  artworks: ArtworkMeta[],
  currentArtwork: ArtworkMeta,
  limit = 3
) {
  return artworks
    .filter((artwork) => artwork.slug !== currentArtwork.slug)
    .map<ArtworkScoredItem>((artwork) => {
      let score = 0;

      if (normalizeSearchTerm(artwork.medium) === normalizeSearchTerm(currentArtwork.medium)) {
        score += 3;
      }

      if (normalizeSearchTerm(artwork.style) === normalizeSearchTerm(currentArtwork.style)) {
        score += 2;
      }

      if (normalizeSearchTerm(artwork.theme) === normalizeSearchTerm(currentArtwork.theme)) {
        score += 2;
      }

      score += scoreTagMatches(currentArtwork.tags, artwork.tags);

      return { ...artwork, score };
    })
    .sort((a, b) => b.score - a.score || b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, limit);
}