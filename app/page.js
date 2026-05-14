export default function Home() {
  return (
    <section className="bg-background text-foreground">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 py-32 text-center lg:py-40">
        <p className="text-sm uppercase tracking-[0.2em] text-cu-brandy">
          Scaffold live · Shared chrome wired
        </p>
        <h1>Capital Intelligently Applied.</h1>
        <p className="text-lg text-muted-foreground">
          Capital Unique website scaffold is wired to the design system, with the
          shared navbar and footer in place. Ready for page-by-page build.
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-4">
          <span className="inline-flex items-center rounded-md bg-cu-surface-vault px-3 py-1 text-sm">
            Next.js 16
          </span>
          <span className="inline-flex items-center rounded-md bg-cu-surface-vault px-3 py-1 text-sm">
            Tailwind 4
          </span>
          <span className="inline-flex items-center rounded-md bg-cu-surface-vault px-3 py-1 text-sm">
            Motion
          </span>
          <span className="inline-flex items-center rounded-md bg-cu-surface-vault px-3 py-1 text-sm">
            Lucide icons
          </span>
          <span className="inline-flex items-center rounded-md bg-cu-surface-vault px-3 py-1 text-sm">
            The Vault Theme
          </span>
        </div>
      </div>
    </section>
  );
}
