import { Metadata } from 'next';
import Link from 'next/link';
import { getArtworkEntries } from '@/lib/content';
import PageNav from '@/app/components/PageNav';

interface PortfolioDetailProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PortfolioDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const artworks = await getArtworkEntries();
  const artwork = artworks.find((a) => a.slug === slug);

  if (!artwork) {
    return { title: 'Artwork not found' };
  }

  return {
    title: artwork.title,
    description: artwork.excerpt,
    authors: [{ name: 'Freeval Art' }],
    openGraph: {
      title: artwork.title,
      description: artwork.excerpt,
      type: 'website',
      images: artwork.imageUrl ? [{ url: artwork.imageUrl }] : undefined
    }
  };
}

export async function generateStaticParams() {
  const artworks = await getArtworkEntries();
  return artworks.map((artwork) => ({ slug: artwork.slug }));
}

export default async function PortfolioDetailPage({ params }: PortfolioDetailProps) {
  const { slug } = await params;
  const artworks = await getArtworkEntries();
  const artwork = artworks.find((a) => a.slug === slug);

  if (!artwork) {
    return (
      <main>
        <PageNav />
        <section className="section">
          <h1>Artwork not found</h1>
          <p>Sorry, this artwork could not be found.</p>
        </section>
      </main>
    );
  }

  return (
    <main>
      <PageNav />

      <section className="section">
        <span className="kicker">{artwork.medium}</span>
        <h1>{artwork.title}</h1>
        <p className="meta">
          {artwork.style} • {artwork.theme} • {artwork.year}
        </p>
      </section>

      {artwork.imageUrl && (
        <section className="section">
          <img
            src={artwork.imageUrl}
            alt={artwork.title}
            style={{
              width: '100%',
              maxHeight: '600px',
              objectFit: 'cover',
              borderRadius: '12px'
            }}
          />
        </section>
      )}

      <section className="section">
        <article className="post-body">
          {artwork.body.split('\n\n').map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </article>
      </section>

      <section className="section">
        <div className="card">
          <h3>Details</h3>
          <p>
            <strong>Medium:</strong> {artwork.medium}
          </p>
          <p>
            <strong>Dimensions:</strong> {artwork.dimensions}
          </p>
          <p>
            <strong>Year:</strong> {artwork.year}
          </p>
          <p>
            <strong>Style:</strong> {artwork.style}
          </p>
        </div>
      </section>

      <section className="section">
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {artwork.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="card">
          <h3>Interested in this piece?</h3>
          <p>
            <Link className="button primary" href="/contact">
              Get in touch
            </Link>
            <Link className="button" href="/portfolio">
              Back to portfolio
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
