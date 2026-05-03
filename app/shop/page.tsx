import PageNav from '../components/PageNav';

export default function ShopPage() {
  return (
    <main>
      <PageNav />
      <section className="section">
        <span className="kicker">Shop</span>
        <h1>Originals, prints, and made-to-order work</h1>
        <p className="lead">
          This area is reserved for the catalog, product filters, shipping options, reviews, and a
          secure checkout.
        </p>
        <div className="status">Status: Coming soon</div>
      </section>
    </main>
  );
}
