import { DocumentDelivery } from "@/components/deliver/DocumentDelivery";
import { LightRays } from "@/components/shared/LightRays";

export const metadata = {
  title: "DocSend",
  description:
    "Securely send documents directly to John Codrington at Capital Unique. Drag and drop statements, contracts, or deal files — private and encrypted in transit.",
  robots: { index: false, follow: false },
};

export default function DeliverPage() {
  return (
    <section className="relative overflow-hidden bg-background section-pad-hero px-6 lg:px-10">
      <LightRays />
      <div className="relative z-10">
        <DocumentDelivery />
      </div>
    </section>
  );
}
