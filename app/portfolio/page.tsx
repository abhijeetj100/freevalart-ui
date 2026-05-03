import PageNav from '../components/PageNav';

export default function PortfolioPage() {
  return (
    <main>
      <PageNav />
      <section className="section">
        <span className="kicker">Portfolio</span>
        <h1>Selected works and galleries</h1>
        <p className="lead">
          A curated gallery of artwork. Individual pieces will link to detail pages with
          high-resolution images, metadata, and purchase/commission options.
        </p>
        <div className="status">Status: MVP — Placeholder</div>
      </section>

      <section className="section">
        <h2>Sample gallery</h2>
        <div className="gallery-grid">
          <article className="card">Coming soon — artwork 1</article>
          <article className="card">Coming soon — artwork 2</article>
          <article className="card">Coming soon — artwork 3</article>
        </div>
      </section>
    </main>
  );
}
