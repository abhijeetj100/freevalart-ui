'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function PageNav() {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
      return;
    }

    router.push('/');
  };

  return (
    <div className="page-nav" aria-label="Page navigation actions">
      <Link className="button" href="/">
        Home
      </Link>
      <button className="button" type="button" onClick={handleBack}>
        Back
      </button>
    </div>
  );
}
