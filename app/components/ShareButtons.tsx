'use client';

import { useEffect, useState } from 'react';

interface ShareButtonsProps {
  path: string;
  title: string;
  description: string;
}

export default function ShareButtons({ path, title, description }: ShareButtonsProps) {
  const [shareUrl, setShareUrl] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setShareUrl(`${window.location.origin}${path}`);
  }, [path]);

  const openNativeShare = async () => {
    if (!shareUrl || !navigator.share) {
      return;
    }

    await navigator.share({ title, text: description, url: shareUrl });
  };

  const copyLink = async () => {
    if (!shareUrl) {
      return;
    }

    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="share-panel card">
      <h3>Share this page</h3>
      <div className="share-actions">
        <button className="button" type="button" onClick={openNativeShare} disabled={!shareUrl}>
          Share
        </button>
        <button className="button" type="button" onClick={copyLink} disabled={!shareUrl}>
          {copied ? 'Copied' : 'Copy link'}
        </button>
        <a
          className="button"
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
          rel="noreferrer"
          target="_blank"
        >
          LinkedIn
        </a>
        <a
          className="button"
          href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
          rel="noreferrer"
          target="_blank"
        >
          X
        </a>
      </div>
    </div>
  );
}