import { Container } from "@/components/ui/Container";

/** Shown while a route's server code and data are loading. Holds the page's vertical space. */
export default function Loading() {
  return (
    <section aria-busy="true" aria-label="Loading page" className="flex min-h-[70dvh] items-center bg-brand-gradient-soft py-20">
      <Container className="flex flex-col gap-4">
        <div className="h-3 w-40 animate-pulse rounded-full bg-brand-mist" />
        <div className="h-10 w-full max-w-xl animate-pulse rounded-2xl bg-brand-mist" />
        <div className="h-5 w-full max-w-md animate-pulse rounded-full bg-brand-mist" />
      </Container>
    </section>
  );
}
