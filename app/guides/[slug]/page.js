import { notFound } from "next/navigation";
import { PHASE1, getLeadMagnet } from "@/lib/lead-magnets";
import { LEAD_MAGNET_CONTENT } from "@/components/lead-magnets/leadMagnetContent";
import { LeadMagnetShell } from "@/components/lead-magnets/LeadMagnetShell";

export function generateStaticParams() {
  return PHASE1.filter((m) => m.group === "guides").map((m) => ({
    slug: m.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const m = getLeadMagnet(slug);
  if (!m || m.group !== "guides") return { title: "Guide not found" };
  return {
    title: m.title,
    description: m.summary,
    // Gated resource — reachable only via the GHL form redirect.
    robots: { index: false, follow: false },
    alternates: { canonical: `/guides/${slug}` },
  };
}

export default async function GuidePage({ params }) {
  const { slug } = await params;
  const m = getLeadMagnet(slug);
  const Content = LEAD_MAGNET_CONTENT[slug];
  if (!m || m.group !== "guides" || !Content) notFound();

  return (
    <LeadMagnetShell magnet={m}>
      <Content />
    </LeadMagnetShell>
  );
}
