"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Download, X } from "lucide-react";
import { BrandIcon } from "@/components/shared/BrandIcon";

/* Approved press portraits of John Codrington, from the design system's
   image library (src/imports/library/people). Journalists pick the crop that
   suits the piece rather than being handed one fixed shot.

   `width`/`height` are the real pixel dimensions — shown to the reader, who is
   choosing a file for print or web and needs to know what they're getting. */
const PORTRAITS = [
  {
    src: "/images/people/owner-seated-cafe.jpeg",
    label: "Seated, café",
    note: "Relaxed environmental portrait. The largest file of the three.",
    width: 2400,
    height: 1792,
  },
  {
    src: "/images/people/owner-cafe-call-002.png",
    label: "On a call, café",
    note: "Candid, mid-conversation. Suits a working or in-practice framing.",
    width: 1448,
    height: 1086,
  },
  {
    src: "/images/people/owner-handshake-lounge-001.png",
    label: "Handshake, lounge",
    note: "Client-facing moment. The most editorial of the three.",
    width: 1672,
    height: 941,
  },
];

const fileName = (src) => src.split("/").pop();

/* Client-render detection without a mount effect — the server snapshot is
   false, the client's is true. Using state + useEffect here would trip
   react-hooks/set-state-in-effect and cause a cascading render. */
const neverChanges = () => () => {};
const useIsClient = () =>
  useSyncExternalStore(
    neverChanges,
    () => true,
    () => false
  );

export function PortraitPicker({ label, note, cardClassName }) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef(null);
  const triggerRef = useRef(null);
  const wasOpen = useRef(false);
  const reduceMotion = useReducedMotion();
  // document.body only exists client-side, so the portal waits for it.
  const isClient = useIsClient();

  const close = useCallback(() => setOpen(false), []);

  /* Escape closes, and focus is trapped inside the dialog while it's open —
     without this, tabbing walks off into the page behind the overlay. */
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        close();
        return;
      }
      if (e.key !== "Tab") return;

      const focusable = dialogRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    /* Lock the page behind the overlay. The padding compensates for the
       scrollbar's width so the layout doesn't jump as it disappears. */
    const { body, documentElement } = document;
    const gutter = window.innerWidth - documentElement.clientWidth;
    const prevOverflow = body.style.overflow;
    const prevPadding = body.style.paddingRight;
    body.style.overflow = "hidden";
    if (gutter > 0) body.style.paddingRight = `${gutter}px`;

    dialogRef.current?.focus({ preventScroll: true });

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPadding;
    };
  }, [open, close]);

  /* Send focus back to the card that opened the dialog, so keyboard users
     resume where they left off. Guarded on `wasOpen` — without it this would
     also fire on first mount and steal focus on page load. */
  useEffect(() => {
    if (open) {
      wasOpen.current = true;
    } else if (wasOpen.current) {
      wasOpen.current = false;
      triggerRef.current?.focus({ preventScroll: true });
    }
  }, [open]);

  /* Design system motion: fade with a small rise, no spring, no overshoot. */
  const rise = reduceMotion ? 0 : 12;

  const overlay = (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          onClick={close}
          className="fixed inset-0 z-50 flex items-end justify-center overflow-y-auto overscroll-contain bg-black/80 p-4 backdrop-blur-sm sm:items-center sm:p-6"
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="portrait-picker-title"
            tabIndex={-1}
            initial={{ opacity: 0, y: rise }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: rise }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            /* The overlay closes on click; the panel must not inherit that. */
            onClick={(e) => e.stopPropagation()}
            className="relative my-auto w-full max-w-4xl rounded-2xl border border-border bg-cu-surface-vault p-6 shadow-2xl outline-none md:p-8"
          >
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-cu-brandy">
                  Press portraits
                </p>
                <h2
                  id="portrait-picker-title"
                  className="mt-3 font-serif text-2xl font-semibold leading-tight tracking-tight md:text-3xl"
                >
                  Choose a portrait to download
                </h2>
                <p className="mt-3 max-w-xl text-sm text-muted-foreground">
                  Three approved images of John Codrington, founder of Capital
                  Unique. All are high-resolution and cleared for editorial use.
                  Credit is not required but appreciated.
                </p>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="-mr-2 -mt-2 shrink-0 cursor-pointer rounded-md p-2 text-muted-foreground transition-colors hover:bg-cu-surface-char hover:text-foreground"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {PORTRAITS.map((p) => (
                <figure
                  key={p.src}
                  className="flex flex-col overflow-hidden rounded-xl border border-border bg-cu-surface-char"
                >
                  {/* Fixed aspect box so three different source ratios still
                      line up as a tidy row. */}
                  <div className="relative aspect-[4/3] bg-cu-surface-ember">
                    <Image
                      src={p.src}
                      alt={`John Codrington — ${p.label.toLowerCase()}`}
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                      className="object-cover object-center"
                    />
                  </div>
                  <figcaption className="flex flex-1 flex-col p-4">
                    <p className="font-serif text-base font-semibold leading-tight">
                      {p.label}
                    </p>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                      {p.note}
                    </p>
                    <p className="mt-3 font-mono text-[11px] text-muted-foreground">
                      {p.width} × {p.height}
                    </p>
                    {/* Points at the file in /public, not the next/image
                        endpoint, so the reader gets the full-resolution
                        original rather than a resized derivative. */}
                    {/* mt-auto on the wrapper keeps the three buttons on one
                        line even if a note wraps to a different number of
                        lines; pt-4 preserves the gap when it doesn't. */}
                    <div className="mt-auto pt-4">
                      <a
                        href={p.src}
                        download={fileName(p.src)}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-cu-brandy px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-cu-brandy-light"
                      >
                        <Download size={14} />
                        Download
                      </a>
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>

            <p className="mt-6 text-xs text-muted-foreground">
              Use the images unaltered — do not re-grade, filter, or composite
              them. For a crop or composition not shown here, email the press
              desk.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className={`${cardClassName} w-full cursor-pointer text-left`}
      >
        <div>
          <p className="font-serif text-lg font-semibold leading-tight md:text-xl">
            {label}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">{note}</p>
        </div>
        <BrandIcon name="Download" size="sm" className="mt-1" />
      </button>

      {/* Portalled to <body> deliberately. app/template.js wraps every page in
          an animating motion.div, and a transformed ancestor becomes the
          containing block for `position: fixed` — which would size this overlay
          to the page rather than the viewport and push the panel off-screen.
          The portal escapes that wrapper entirely. */}
      {isClient && createPortal(overlay, document.body)}
    </>
  );
}
