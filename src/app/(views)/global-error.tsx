"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <h2 data-test-id="global-error-message">Something went wrong!</h2>
        <button data-test-id="global-error-btn" onClick={() => reset()}>
          Try again
        </button>
      </body>
    </html>
  );
}
