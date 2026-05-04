'use client';

import { useEffect, useState } from 'react';

interface CommentItem {
  id: string;
  name: string;
  message: string;
  createdAt: string;
}

interface CommentSectionProps {
  storageKey: string;
  title?: string;
}

function loadComments(storageKey: string): CommentItem[] {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(storageKey);
    return raw ? (JSON.parse(raw) as CommentItem[]) : [];
  } catch {
    return [];
  }
}

export default function CommentSection({ storageKey, title = 'Comments' }: CommentSectionProps) {
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    setComments(loadComments(storageKey));
  }, [storageKey]);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(comments));
  }, [comments, storageKey]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedMessage) {
      return;
    }

    setComments((current) => [
      ...current,
      {
        id: globalThis.crypto.randomUUID(),
        name: trimmedName,
        message: trimmedMessage,
        createdAt: new Date().toISOString()
      }
    ]);
    setName('');
    setMessage('');
  };

  return (
    <section className="section comment-section">
      <div className="card">
        <h3>{title}</h3>
        <p>Comments are stored in this browser for now and can be replaced with a backend later.</p>

        <form className="comment-form" onSubmit={handleSubmit}>
          <label className="filter-field">
            <span className="filter-label">Name</span>
            <input
              className="filter-input"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Your name"
              type="text"
            />
          </label>

          <label className="filter-field">
            <span className="filter-label">Comment</span>
            <textarea
              className="filter-textarea"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Share a thought about this piece"
              rows={4}
            />
          </label>

          <button className="button primary" type="submit">
            Post comment
          </button>
        </form>
      </div>

      <div className="comment-list">
        {comments.length === 0 ? (
          <div className="card">
            <p>No comments yet. Be the first to leave a note.</p>
          </div>
        ) : (
          comments
            .slice()
            .reverse()
            .map((comment) => (
              <article className="card comment-item" key={comment.id}>
                <div className="comment-meta">
                  <strong className="comment-name">{comment.name}</strong>
                  <span className="comment-date">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p>{comment.message}</p>
              </article>
            ))
        )}
      </div>
    </section>
  );
}