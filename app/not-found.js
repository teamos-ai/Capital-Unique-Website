import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BrandIcon } from "@/components/shared/BrandIcon";

export const metadata = {
  title: "Page not found",
  description:
    "The page you were looking for doesn't exist. Find your way back to capital.",
};

const QUICK_LINKS = [
  {
    iconName: "Home",
    label: "Home",
    href: "/",
    body: "Capital intelligently applied — start here.",
  },
  {
    iconName: "MessageSquare",
    label: "Speak with John",
    href: "/contact",
    body: "If you were looking for something specific, just ask.",
  },
  {
    iconName: "Search",
    label: "Site map",
    href: "/sitemap",
    body: "Every page on the site, in one place.",
  },
];

export default function NotFound() {
  return (
    <section className="bg-background px-6 py-24 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <p className="font-serif text-7xl font-semibold tracking-tight text-cu-brandy md:text-8xl">
          404
        </p>
        <h1 className="mt-6 font-serif text-4xl font-semibold leading-tight tracking-tight md:text-5xl lg:text-6xl">
          We can&apos;t find that page
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
          The page may have moved, the link may be broken, or the address may be
          mistyped. Capital Unique is still here. Let&apos;s reorient.
        </p>
        <Link
          href="/"
          className="mt-10 inline-flex items-center gap-2 rounded-md bg-cu-brandy px-6 py-3 text-sm font-medium text-white shadow-sm hover:bg-cu-brandy-light transition-colors"
        >
          Back to home
          <ArrowRight size={16} />
        </Link>
      </div>

      <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
        {QUICK_LINKS.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="group rounded-2xl border border-border bg-cu-surface-vault p-6 transition-colors hover:bg-cu-surface-char"
          >
            <BrandIcon name={link.iconName} size="sm" className="mb-4" />
            <p className="font-serif text-lg font-semibold leading-tight">
              {link.label}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{link.body}</p>
            <p className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-cu-brandy group-hover:text-cu-brandy-light">
              Open <ArrowRight size={14} />
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
