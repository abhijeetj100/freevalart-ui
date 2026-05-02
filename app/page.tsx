const sections = [
  {
    title: 'Portfolio and blog',
    description: 'Daily artwork posts, category filters, image galleries, sharing, and audience engagement.'
  },
  {
    title: 'Custom orders',
    description: 'Commission requests, uploads, status tracking, confirmations, and quote management.'
  },
  {
    title: 'Shop and classes',
    description: 'Product sales, checkout, shipping, reviews, and paid teaching sessions with capacity controls.'
  }
];

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <div>
          <span className="kicker">Artist portfolio and business website</span>
          <h1>Show the work. Sell the work. Teach the craft.</h1>
          <p className="lead">
            This scaffold is designed for an independent artist who needs one site to showcase art,
            manage commissions, sell products, and run classes without losing control of content.
          </p>
          <div className="actions">
            <a className="button primary" href="/shop">
              Explore the shop
            </a>
            <a className="button" href="/custom-orders">
              Request a custom piece
            </a>
          </div>
        </div>
        <div className="card">
          <h3>Included sections</h3>
          <p>
            Portfolio, blog, about, contact, custom orders, marketplace, classes, privacy, and terms.
          </p>
          <p>
            The next step is to connect the pages to a CMS, payments, uploads, email automation, and
            analytics.
          </p>
        </div>
      </section>

      <section className="section">
        <h2>Core experience</h2>
        <p>A balanced information architecture for discovery, conversion, and repeat engagement.</p>
        <div className="section-grid">
          {sections.map((section) => (
            <article className="card" key={section.title}>
              <h3>{section.title}</h3>
              <p>{section.description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
