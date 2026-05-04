import Link from 'next/link';

const featuredArtworks = [
  {
    title: 'Morning Light',
    description: 'Oil on canvas, 2025'
  },
  {
    title: 'Rain Over Old Town',
    description: 'Acrylic on panel, 2026'
  },
  {
    title: 'Quiet River',
    description: 'Mixed media, 2026'
  }
];

const latestPosts = [
  {
    title: 'How I plan a landscape composition',
    meta: 'Studio journal'
  },
  {
    title: 'Choosing warm neutrals for mood',
    meta: 'Color process'
  },
  {
    title: 'Behind the scenes: weekend workshop',
    meta: 'Teaching notes'
  }
];

const classHighlights = [
  {
    title: 'Beginner Acrylic Foundations',
    meta: 'Online · 6 seats left'
  },
  {
    title: 'Intermediate Light and Shadow',
    meta: 'Hybrid · Waitlist open'
  },
  {
    title: 'Portfolio Review Session',
    meta: 'Online · Monthly cohort'
  }
];

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <div>
          <span className="kicker">Photographic portfolio and journal</span>
          <h1>Work that tells stories in light, color, and craft.</h1>
          <p className="lead">
            This content-first release highlights portfolio pieces and studio writing first, while
            keeping classes and contact pathways clear for visitors who are ready to engage.
          </p>
          <div className="actions">
            <Link className="button primary" href="/portfolio">
              View portfolio
            </Link>
            <Link className="button" href="/blog">
              Read the blog
            </Link>
          </div>
        </div>
        <div className="card">
          <h3>Release focus</h3>
          <p>
            Primary: Portfolio and Blog. Secondary support: Classes and Contact.
          </p>
          <p>
            Shop and custom orders remain visible as placeholders so future phases can ship without
            IA rework.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2>Featured artworks</h2>
          <Link className="button" href="/portfolio">
            Open full portfolio
          </Link>
        </div>
        <div className="gallery-grid">
          {featuredArtworks.map((art) => (
            <article className="card" key={art.title}>
              <h3>{art.title}</h3>
              <p>{art.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2>Latest blog posts</h2>
          <Link className="button" href="/blog">
            See all posts
          </Link>
        </div>
        <div className="post-grid">
          {latestPosts.map((post) => (
            <article className="card" key={post.title}>
              <h3>{post.title}</h3>
              <p className="meta">{post.meta}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2>Upcoming classes</h2>
          <Link className="button" href="/classes">
            Browse classes
          </Link>
        </div>
        <div className="class-grid">
          {classHighlights.map((item) => (
            <article className="card" key={item.title}>
              <h3>{item.title}</h3>
              <p className="meta">{item.meta}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="card">
          <h2>Contact</h2>
          <p className="lead">
            Questions about a piece, class availability, or collaborations? Reach out and expect a
            professional response window.
          </p>
          <div className="actions">
            <Link className="button primary" href="/contact">
              Open contact page
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
