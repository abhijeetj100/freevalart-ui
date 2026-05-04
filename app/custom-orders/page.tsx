import PageNav from '../components/PageNav';

export default function CustomOrdersPage() {
  return (
    <main>
      <PageNav />
      <section className="section">
        <span className="kicker">Custom orders</span>
        <h1>Commission requests and order tracking</h1>
        <p className="lead">
          This page will hold the structured intake form, reference upload flow, automated email
          confirmation, and order status updates.
        </p>
        <div className="status">Status: Coming soon</div>
      </section>
    </main>
  );
}
