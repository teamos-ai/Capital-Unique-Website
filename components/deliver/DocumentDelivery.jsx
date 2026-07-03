import Image from "next/image";
import { Lock, ShieldCheck } from "lucide-react";
import { COMPANY } from "@/lib/company-info";
import { GhlForm } from "@/components/lead-magnets/GhlForm";

// DocSend — recipient framing + the embedded GHL DocSend form.
// Submissions (incl. uploaded files) are captured against the
// contact's profile in the CRM. The GHL form is configured in GHL to
// redirect to /thank-you on submit. Dark styling comes from
// GHL_DOCSEND_FORM_CSS (lib/ghl-form-css.js) pasted into the form.
export function DocumentDelivery() {
  return (
    <div className="mx-auto w-full max-w-3xl">
      {/* Recipient */}
      <div className="flex flex-col items-center text-center">
        <p className="heading-eyebrow mb-6">DocSend · Secure delivery</p>
        <div className="relative h-20 w-20 overflow-hidden rounded-full border border-border ring-4 ring-cu-surface-vault">
          <Image
            src="/images/people/owner-seated-cafe.jpeg"
            alt="John Codrington"
            fill
            sizes="80px"
            className="object-cover object-center"
          />
        </div>
        <h1 className="heading-section mt-5">Deliver files directly to the Team</h1>
        <p className="mt-3 text-base text-muted-foreground">
          John Codrington · Founder, {COMPANY.name}
        </p>
        <p className="mt-1 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
          <Lock size={12} className="text-cu-brandy" />
          Private link — only {COMPANY.name} receives what you send
        </p>
      </div>

      {/* Card */}
      <div className="relative mt-10 overflow-hidden rounded-2xl border border-border bg-cu-surface-vault shadow-xl shadow-black/5 dark:shadow-black/40">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, var(--cu-brandy-darkest) 0%, transparent 60%)",
          }}
        />
        <div className="relative z-10 p-5 md:p-7">
          <GhlForm slug="docsend" formName="DocSend" minHeight={620} />
          <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
            <ShieldCheck size={13} className="text-cu-brandy" />
            Encrypted in transit. Only {COMPANY.name} can access your
            documents.
          </p>
        </div>
      </div>
    </div>
  );
}
