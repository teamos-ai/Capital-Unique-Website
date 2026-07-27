import { CharlesCommandBar } from "@/components/charles/CharlesCommandBar";
import { InteractiveGridPattern } from "@/components/shared/InteractiveGridPattern";

export const metadata = {
  alternates: { canonical: "/charles-ai" },
  title: "Charles A.I",
  description:
    "Workshop your deal with Charles A.I. Map structure, timing, and constraints before speaking with Capital Unique.",
};

export default function CharlesAIPage() {
  return (
    <section className="relative overflow-hidden bg-background section-pad-hero px-6 lg:px-10">
      <InteractiveGridPattern
        width={32}
        height={32}
        squares={[50, 25]}
        className="cu-grid-vignette"
        squaresClassName="hover:fill-cu-brandy/30"
      />
      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
        <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-border bg-cu-surface-vault py-1.5 pl-2 pr-4">
          <span className="relative inline-flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cu-brandy opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-cu-brandy" />
          </span>
          <span className="text-xs font-medium tracking-wide text-foreground/85">
            Charles A.I
          </span>
          <span className="text-xs text-muted-foreground">
            Live now
          </span>
        </div>
        <h1 className="heading-hero">Your shortcut to the right capital.</h1>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground md:text-xl">
          No vague advice. No forms to wade through. Describe your scenario —
          Charles maps the structure, timing and constraints before you speak
          with the Team.
        </p>
        <CharlesCommandBar />
      </div>
    </section>
  );
}
