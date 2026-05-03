import Link from 'next/link';
import { getArtworkEntries } from '@/lib/content';
import PageNav from '@/app/components/PageNav';

export default async function PortfolioPage() {
  const artworks = await getArtworkEntries();
  const publishedArtworks = artworks.filter((a) => a.status === 'published');

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
        <h2>Featured artworks</h2>
        {publishedArtworks.length === 0 ? (
          <p>No artworks yet. Check back soon.</p>
        ) : (
          <div className="gallery-grid">
            {publishedArtworks.map((artwork) => (
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
