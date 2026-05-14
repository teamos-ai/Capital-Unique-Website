export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-6">
      <div className="max-w-2xl text-center space-y-6">
        <p className="text-sm uppercase tracking-[0.2em] text-cu-brandy">
          Scaffold live
        </p>
        <h1>Capital Intelligently Applied.</h1>
        <p className="text-lg text-muted-foreground">
          Capital Unique website scaffold is wired to the design system. Ready for
          page-by-page build.
        </p>
        <div className="flex gap-3 justify-center pt-4">
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
            The Vault Theme
          </span>
        </div>
      </div>
    </main>
  );
}
