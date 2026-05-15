"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  UploadCloud,
  FileText,
  X,
  CheckCircle2,
  ShieldCheck,
  Lock,
  Loader2,
} from "lucide-react";
import { COMPANY } from "@/lib/company-info";

function formatBytes(b) {
  if (b === 0) return "0 B";
  const k = 1024;
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(b) / Math.log(k));
  return `${parseFloat((b / Math.pow(k, i)).toFixed(1))} ${units[i]}`;
}

const MAX_PER_FILE = 50 * 1024 * 1024; // 50 MB guidance

export function DocumentDelivery() {
  const inputRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [sender, setSender] = useState({ name: "", email: "", note: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent

  function addFiles(list) {
    const incoming = Array.from(list).map((f, i) => ({
      id: `${f.name}-${f.size}-${Date.now()}-${i}`,
      name: f.name,
      size: f.size,
      oversize: f.size > MAX_PER_FILE,
    }));
    setFiles((prev) => [...prev, ...incoming]);
  }

  function onDrop(e) {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files?.length) addFiles(e.dataTransfer.files);
  }

  function removeFile(id) {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  }

  function onSubmit(e) {
    e.preventDefault();
    if (files.length === 0 || status === "sending") return;
    setStatus("sending");
    // ── Placeholder ───────────────────────────────────────────────
    // Secure intake is not wired yet. When the GHL upload form (or a
    // signed-storage endpoint) exists, POST `files` + `sender` here.
    // Mirrors the newsletter GHL-placeholder convention.
    setTimeout(() => setStatus("sent"), 1100);
  }

  const totalSize = files.reduce((a, f) => a + f.size, 0);
  const hasOversize = files.some((f) => f.oversize);

  return (
    <div className="mx-auto w-full max-w-2xl">
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
        <h1 className="heading-section mt-5">Deliver files directly to John</h1>
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

        <AnimatePresence mode="wait">
          {status === "sent" ? (
            <motion.div
              key="sent"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative z-10 px-8 py-16 text-center md:px-12"
            >
              <span className="mx-auto mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-cu-brandy-darkest text-cu-brandy">
                <CheckCircle2 size={28} strokeWidth={1.5} />
              </span>
              <h2 className="heading-card">Delivery received</h2>
              <p className="mx-auto mt-3 max-w-md text-base text-muted-foreground">
                {files.length} {files.length === 1 ? "file" : "files"} sent
                securely to John. You&apos;ll get a confirmation
                {sender.email ? ` at ${sender.email}` : ""} and a direct reply —
                not an auto-response.
              </p>
              <button
                type="button"
                onClick={() => {
                  setFiles([]);
                  setSender({ name: "", email: "", note: "" });
                  setStatus("idle");
                }}
                className="mt-8 inline-flex items-center rounded-md border border-border bg-transparent px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-cu-surface-char"
              >
                Send more files
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={onSubmit}
              data-ghl-form-placeholder="document-delivery"
              className="relative z-10 p-6 md:p-8"
            >
              {/* Dropzone */}
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={onDrop}
                onClick={() => inputRef.current?.click()}
                role="button"
                tabIndex={0}
                onKeyDown={(e) =>
                  (e.key === "Enter" || e.key === " ") &&
                  inputRef.current?.click()
                }
                className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-14 text-center transition-colors ${
                  dragging
                    ? "border-cu-brandy bg-cu-brandy-darkest/40"
                    : "border-border hover:border-cu-brandy/50 hover:bg-cu-surface-char/40"
                }`}
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-cu-brandy-darkest text-cu-brandy">
                  <UploadCloud size={22} strokeWidth={1.6} />
                </span>
                <p className="mt-4 font-serif text-lg font-semibold tracking-tight text-foreground">
                  Drag files here
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  or{" "}
                  <span className="font-medium text-cu-brandy underline underline-offset-2">
                    browse your computer
                  </span>
                </p>
                <p className="mt-3 text-xs text-muted-foreground">
                  PDF, images, spreadsheets, statements — up to 50 MB each
                </p>
                <input
                  ref={inputRef}
                  type="file"
                  multiple
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files?.length) addFiles(e.target.files);
                    e.target.value = "";
                  }}
                />
              </div>

              {/* File list */}
              <AnimatePresence>
                {files.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-5 space-y-2 overflow-hidden"
                  >
                    {files.map((f) => (
                      <div
                        key={f.id}
                        className="flex items-center gap-3 rounded-lg border border-border bg-cu-surface-char/50 px-4 py-3"
                      >
                        <FileText
                          size={18}
                          className="shrink-0 text-cu-brandy"
                        />
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-medium text-foreground">
                            {f.name}
                          </span>
                          <span
                            className={`text-xs ${
                              f.oversize
                                ? "text-[oklch(0.65_0.16_25)]"
                                : "text-muted-foreground"
                            }`}
                          >
                            {formatBytes(f.size)}
                            {f.oversize && " — exceeds 50 MB"}
                          </span>
                        </span>
                        <button
                          type="button"
                          onClick={() => removeFile(f.id)}
                          aria-label={`Remove ${f.name}`}
                          className="shrink-0 rounded-md p-1 text-muted-foreground transition-colors hover:bg-cu-surface-vault hover:text-foreground"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                    <p className="pt-1 text-xs text-muted-foreground">
                      {files.length} {files.length === 1 ? "file" : "files"} ·{" "}
                      {formatBytes(totalSize)} total
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Sender details */}
              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <input
                  value={sender.name}
                  onChange={(e) =>
                    setSender((s) => ({ ...s, name: e.target.value }))
                  }
                  placeholder="Your name"
                  className="rounded-md border border-border bg-input-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-cu-brandy-light"
                />
                <input
                  type="email"
                  value={sender.email}
                  onChange={(e) =>
                    setSender((s) => ({ ...s, email: e.target.value }))
                  }
                  placeholder="Your email"
                  className="rounded-md border border-border bg-input-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-cu-brandy-light"
                />
                <textarea
                  value={sender.note}
                  onChange={(e) =>
                    setSender((s) => ({ ...s, note: e.target.value }))
                  }
                  rows={2}
                  placeholder="A short note for John (optional)"
                  className="sm:col-span-2 rounded-md border border-border bg-input-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-cu-brandy-light"
                />
              </div>

              <button
                type="submit"
                disabled={files.length === 0 || hasOversize || status === "sending"}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-cu-brandy px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-cu-brandy-light disabled:cursor-not-allowed disabled:opacity-40"
              >
                {status === "sending" ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Sending securely…
                  </>
                ) : (
                  <>
                    Send to John
                    {files.length > 0 && ` (${files.length})`}
                  </>
                )}
              </button>

              <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                <ShieldCheck size={13} className="text-cu-brandy" />
                Encrypted in transit. Only {COMPANY.name} can access your
                documents.
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
