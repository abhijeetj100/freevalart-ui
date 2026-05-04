import Link from 'next/link';
import { getArtworkEntries } from '@/lib/content';
import {
  filterArtworks,
  getArtworkFilterOptions,
  normalizeSearchTerm
} from '@/lib/content/content-query';
import ContentFilters from '@/app/components/ContentFilters';
import PageNav from '@/app/components/PageNav';

interface PortfolioPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function getSearchValue(params: Record<string, string | string[] | undefined>, key: string): string {
  const value = params[key];
  return typeof value === 'string' ? value : '';
}

export default async function PortfolioPage({ searchParams }: PortfolioPageProps) {
  const resolvedSearchParams = await searchParams;
  const artworks = await getArtworkEntries();
  const publishedArtworks = artworks.filter((a) => a.status === 'published');
  const query = getSearchValue(resolvedSearchParams, 'q');
  const medium = getSearchValue(resolvedSearchParams, 'medium');
  const style = getSearchValue(resolvedSearchParams, 'style');
  const theme = getSearchValue(resolvedSearchParams, 'theme');
  const tag = getSearchValue(resolvedSearchParams, 'tag');
  const filteredArtworks = filterArtworks(publishedArtworks, { query, medium, style, theme, tag });
  const filterOptions = getArtworkFilterOptions(publishedArtworks);

  return (
    <main>
      <PageNav />
      <section className="section">
        <span className="kicker">Portfolio</span>
        <h1>Selected works and galleries</h1>
        <p className="lead">
          A curated gallery of recent work. Each piece reflects a focused exploration of light,
          color, and form using warm-neutral palettes and photographic techniques.
        </p>
      </section>

      <section className="section">
        <div className="section-header">
          <h2>Featured artworks</h2>
          <p className="meta">
            Showing {filteredArtworks.length} of {publishedArtworks.length} artworks
          </p>
        </div>

        <ContentFilters
          action="/portfolio"
          clearHref="/portfolio"
          searchPlaceholder="Search artworks by title, excerpt, medium, style, or theme"
          searchValue={normalizeSearchTerm(query)}
          selects={[
            {
              name: 'medium',
              label: 'Medium',
              value: normalizeSearchTerm(medium),
              options: filterOptions.mediums,
              placeholder: 'All mediums'
            },
            {
              name: 'style',
              label: 'Style',
              value: normalizeSearchTerm(style),
              options: filterOptions.styles,
              placeholder: 'All styles'
            },
            {
              name: 'theme',
              label: 'Theme',
              value: normalizeSearchTerm(theme),
              options: filterOptions.themes,
              placeholder: 'All themes'
            },
            {
              name: 'tag',
              label: 'Tag',
              value: normalizeSearchTerm(tag),
              options: filterOptions.tags,
              placeholder: 'All tags'
            }
          ]}
        />

        {publishedArtworks.length === 0 ? (
          <p>No artworks yet. Check back soon.</p>
        ) : filteredArtworks.length === 0 ? (
          <div className="card">
            <p>No artworks matched your filters. Try a broader search or clear the form.</p>
          </div>
        ) : (
          <div className="gallery-grid">
            {filteredArtworks.map((artwork) => (
              <article key={artwork.slug} className="card">
                <Link href={`/portfolio/${artwork.slug}`}>
                  <h3>{artwork.title}</h3>
                </Link>
                <p className="meta">
                  {artwork.medium} • {artwork.year}
                </p>
                <p>{artwork.excerpt}</p>
                <div className="meta">
                  {artwork.tags.map((tag) => (
                    <span key={tag} style={{ marginRight: '8px' }}>
                      #{tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
