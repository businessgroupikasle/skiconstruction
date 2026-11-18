"use client";

import { useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { GreenCTAButton } from "@/components/ui/GreenCTAButton";

/** Route-level error boundary. Shows a recovery path instead of a blank page. */
export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Logged to the console only. Add a monitoring service here if one is set up.
    console.error(error);
  }, [error]);

  return (
    <section aria-labelledby="error-title" className="flex min-h-[70dvh] items-center bg-brand-gradient-soft py-20">
      <Container className="flex flex-col items-start gap-6">
        <p className="text-sm font-bold tracking-[0.25em] text-brand-primary uppercase">Something went wrong</p>
        <h1 id="error-title" className="text-4xl font-extrabold text-brand-dark sm:text-5xl">
          We could not load this page.
        </h1>
        <p className="max-w-xl text-brand-muted">
          Please try again. If the problem continues, call us and we will send the information you need.
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={reset}
            className="inline-flex h-12 items-center justify-center rounded-full bg-brand-primary px-6 font-semibold text-white shadow-button transition-colors hover:bg-brand-dark"
          >
            Try again
          </button>
          <GreenCTAButton href="/" variant="outline">
            Back to home
          </GreenCTAButton>
        </div>
      </Container>
    </section>
  );
}
