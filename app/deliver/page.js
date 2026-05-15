import { DocumentDelivery } from "@/components/deliver/DocumentDelivery";

export const metadata = {
  title: "DocSend",
  description:
    "Securely send documents directly to John Codrington at Capital Unique. Drag and drop statements, contracts, or deal files — private and encrypted in transit.",
  robots: { index: false, follow: false },
};

export default function DeliverPage() {
  return (
    <section className="bg-background section-pad-hero px-6 lg:px-10">
      <DocumentDelivery />
    </section>
  );
}
