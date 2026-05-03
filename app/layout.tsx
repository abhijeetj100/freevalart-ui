import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: 'Artist Portfolio and Business Site',
  description: 'A portfolio, shop, commissions, and teaching website for an independent artist.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const primaryNav = [
    { href: '/', label: 'Home' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/blog', label: 'Blog' },
    { href: '/classes', label: 'Classes' },
    { href: '/contact', label: 'Contact' }
  ];

  const secondaryNav = [
    { href: '/about', label: 'About' },
    { href: '/shop', label: 'Shop', badge: 'Coming soon' },
    { href: '/custom-orders', label: 'Custom Orders', badge: 'Coming soon' },
    { href: '/privacy', label: 'Privacy' },
    { href: '/terms', label: 'Terms' }
  ];

  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <div className="shell header-inner">
            <Link className="brand" href="/">
              Freeval Art
            </Link>
            <nav aria-label="Primary">
              <ul className="nav-list">
                {primaryNav.map((item) => (
                  <li key={item.href}>
                    <Link className="nav-link" href={item.href}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </header>

        {children}

        <footer className="site-footer">
          <div className="shell footer-grid">
            <div>
              <h3>Freeval Art</h3>
              <p>A photographic portfolio and journal with classes and direct contact options.</p>
            </div>

            <div>
              <h3>Explore</h3>
              <ul className="footer-links">
                {primaryNav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3>More</h3>
              <ul className="footer-links">
                {secondaryNav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href}>{item.label}</Link>
                    {item.badge ? <span className="tag">{item.badge}</span> : null}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
