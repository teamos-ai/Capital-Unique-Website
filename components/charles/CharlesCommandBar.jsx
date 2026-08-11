"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Script from "next/script";
import { AnimatePresence, motion } from "motion/react";
import {
  Search,
  Plus,
  ArrowUp,
  Sparkles,
  Briefcase,
  Send,
  Calculator,
  GitCompareArrows,
  Layers,
  Loader2,
  X,
} from "lucide-react";
import { HANDOVER_FORM, handoverFormSrc, ghlFormHost } from "@/lib/ghl-forms";

// Charles opens with this (display-only — not sent to the model, which gets
// its identity from the system prompt).
const GREETING =
  "G'day, I'm Charles. Tell me the shape of what you're working on — a deal, a scenario, or a number you want to run — and I'll help you get it ready for the team. What's on?";

// Slash actions. Clicking one drops the command into the input for the person
// to finish; Charles interprets it on send.
const COMMANDS = [
  { cmd: "/deal", label: "Submit a deal", desc: "Outline a live deal for the team to review.", icon: Briefcase },
  { cmd: "/scenario", label: "Workshop a scenario", desc: "Describe a structure or what-if and get a considered view.", icon: Send },
  { cmd: "/calculate", label: "Run a calculator", desc: "Feasibility, DSCR, bridging cost, true cost of capital.", icon: Calculator },
  { cmd: "/compare", label: "Compare funding options", desc: "Weigh two structures side by side.", icon: GitCompareArrows },
  { cmd: "/stack", label: "Structure a capital stack", desc: "Layer senior, mezzanine and equity.", icon: Layers },
];

const CHIPS = [
  { text: "/deal bridging finance, settling in 3 weeks" },
  { text: "/scenario 18-unit residential development" },
  { text: "/calculate development feasibility" },
  { text: "/compare bridging vs term debt" },
  { text: "/stack construction — senior + mezzanine" },
];

export function CharlesCommandBar() {
  const inputRef = useRef(null);
  const threadRef = useRef(null);
  const sendingRef = useRef(false); // synchronous in-flight guard

  const [messages, setMessages] = useState([]); // {role, content}
  const [input, setInput] = useState("");
  const [status, setStatus] = useState("idle"); // idle | streaming | error
  const [focused, setFocused] = useState(false);

  const started = messages.length > 0;
  const streaming = status === "streaming";
  const showMenu = focused && input.trim().startsWith("/");
  const filtered = COMMANDS.filter((c) =>
    input.trim() ? c.cmd.startsWith(input.trim().split(/\s+/)[0]) : true
  );

  // Keep the thread pinned to the latest message.
  useEffect(() => {
    const el = threadRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages]);

  // Auto-grow the textarea to fit pasted / multi-line content (capped, then
  // it scrolls). Resets to one line when the field is cleared after sending.
  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 192)}px`;
  }, [input]);

  const setLastAssistant = useCallback((content, error = false) => {
    setMessages((prev) => {
      const copy = [...prev];
      for (let i = copy.length - 1; i >= 0; i--) {
        if (copy[i].role === "assistant") {
          copy[i] = { ...copy[i], content, error };
          break;
        }
      }
      return copy;
    });
  }, []);

  const send = useCallback(
    async (text) => {
      const content = (text ?? input).trim();
      if (!content || sendingRef.current) return;
      sendingRef.current = true;

      // Don't feed our own error/busy bubbles back to the model as context.
      const convo = [...messages.filter((m) => !m.error), { role: "user", content }];
      setMessages([...convo, { role: "assistant", content: "" }]);
      setInput("");
      setStatus("streaming");

      try {
        const res = await fetch("/api/charles", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: convo }),
        });

        if (res.status === 429) {
          setLastAssistant(
            "I'm getting a lot of questions right now — give me a moment and try again, or leave your details below and I'll get John onto it.",
            true
          );
          setStatus("idle");
          return;
        }
        if (!res.ok || !res.body) {
          setLastAssistant("Something went wrong on my end. Mind trying that again?", true);
          setStatus("error");
          return;
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let acc = "";
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          acc += decoder.decode(value, { stream: true });
          setLastAssistant(acc);
        }
        if (!acc.trim())
          setLastAssistant("Sorry, I didn't quite catch that — mind rephrasing?", true);
        setStatus("idle");
      } catch {
        setLastAssistant("Connection dropped there. Give it another go in a sec?", true);
        setStatus("error");
      } finally {
        sendingRef.current = false;
      }
    },
    [input, messages, setLastAssistant]
  );

  function onKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  return (
    <div className="mx-auto mt-12 w-full max-w-2xl">
      <div className="relative rounded-2xl border border-border bg-cu-surface-vault shadow-xl shadow-black/5 dark:shadow-black/40">
        {/* Brand glow */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-40"
          style={{ background: "radial-gradient(ellipse at 50% 0%, var(--cu-brandy-darkest) 0%, transparent 65%)" }}
        />

        {/* Thread */}
        {started && (
          <div
            ref={threadRef}
            className="relative z-10 max-h-[46vh] overflow-y-auto px-5 pt-5 md:px-7"
          >
            <CharlesBubble>{GREETING}</CharlesBubble>
            {messages.map((m, i) =>
              m.role === "user" ? (
                <UserBubble key={i}>{m.content}</UserBubble>
              ) : (
                <CharlesBubble key={i} pending={streaming && i === messages.length - 1 && !m.content}>
                  {m.content}
                </CharlesBubble>
              )
            )}
          </div>
        )}

        {/* Input row */}
        <div className="relative z-10">
          <div className="flex items-start gap-3 px-5 pt-5">
            <Search size={18} className="mt-1 shrink-0 text-muted-foreground" />
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setTimeout(() => setFocused(false), 120)}
              onKeyDown={onKeyDown}
              rows={1}
              placeholder={
                started
                  ? "Reply to Charles — paste dot points or figures if it's easier"
                  : "Ask Charles, or paste your scenario — dot points welcome"
              }
              aria-label="Ask Charles A.I"
              className="max-h-48 w-full resize-none overflow-y-auto bg-transparent py-1 text-base leading-relaxed text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            <kbd className="mt-1 hidden shrink-0 rounded border border-border px-1.5 py-0.5 text-[11px] text-muted-foreground sm:block">
              ↵
            </kbd>
          </div>

          {/* Slash menu */}
          <AnimatePresence>
            {showMenu && filtered.length > 0 && (
              <motion.ul
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.18 }}
                className="mt-4 overflow-hidden border-t border-border"
              >
                {filtered.map((c) => {
                  const Icon = c.icon;
                  return (
                    <li key={c.cmd}>
                      <button
                        type="button"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => {
                          setInput(c.cmd + " ");
                          inputRef.current?.focus();
                        }}
                        className="flex w-full items-center gap-3.5 px-5 py-3 text-left transition-colors hover:bg-cu-surface-char/60"
                      >
                        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cu-brandy-darkest text-cu-brandy">
                          <Icon size={16} strokeWidth={1.6} />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="flex items-baseline gap-2">
                            <span className="font-mono text-sm text-cu-brandy">{c.cmd}</span>
                            <span className="truncate text-sm font-medium text-foreground">{c.label}</span>
                          </span>
                          <span className="mt-0.5 block truncate text-xs text-muted-foreground">{c.desc}</span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </motion.ul>
            )}
          </AnimatePresence>

          {/* Action row */}
          <div className="flex items-center justify-between px-4 py-3.5">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border">
                <Plus size={15} />
              </span>
              <span className="hidden text-xs sm:inline">Attach a deal or scenario</span>
            </div>
            <button
              type="button"
              onClick={() => send()}
              disabled={streaming || !input.trim()}
              aria-label="Send to Charles"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-cu-brandy text-white transition-colors hover:bg-cu-brandy-light disabled:opacity-40"
            >
              {streaming ? <Loader2 size={17} className="animate-spin" /> : <ArrowUp size={17} />}
            </button>
          </div>
        </div>
      </div>

      {/* Quick-start chips (before the conversation begins) */}
      {!started && (
        <div className="mt-6 flex flex-wrap justify-center gap-2.5">
          {CHIPS.map((chip) => (
            <button
              key={chip.text}
              type="button"
              onClick={() => send(chip.text)}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-cu-surface-vault px-3.5 py-1.5 text-xs text-muted-foreground transition-colors hover:border-cu-brandy/40 hover:text-foreground"
            >
              <span className="font-mono text-cu-brandy">{chip.text.split(" ")[0]}</span>
              <span className="truncate">{chip.text.split(" ").slice(1).join(" ")}</span>
            </button>
          ))}
        </div>
      )}

      {/* Lead capture (once the conversation has some substance) */}
      {messages.filter((m) => m.role === "user").length >= 1 && (
        <LeadCapture messages={messages} />
      )}

      <p className="mt-6 text-center text-xs text-muted-foreground">
        Charles A.I gives general information only, not financial advice.
        Conversations are guided to the team — you always reach a person.
      </p>
    </div>
  );
}

function UserBubble({ children }) {
  return (
    <div className="mb-4 flex justify-end">
      <div className="max-w-[85%] whitespace-pre-wrap break-words rounded-2xl rounded-br-md bg-cu-brandy px-4 py-2.5 text-sm leading-relaxed text-white">
        {children}
      </div>
    </div>
  );
}

function CharlesBubble({ children, pending }) {
  return (
    <div className="mb-4 flex items-start gap-2.5">
      <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cu-brandy-darkest text-cu-brandy">
        <Sparkles size={14} />
      </span>
      <div className="max-w-[85%] whitespace-pre-wrap break-words rounded-2xl rounded-tl-md bg-cu-surface-char px-4 py-2.5 text-sm leading-relaxed text-foreground/90">
        {pending ? <TypingDots /> : children}
      </div>
    </div>
  );
}

function TypingDots() {
  return (
    <span className="inline-flex gap-1 py-1" aria-label="Charles is typing">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-cu-brandy"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </span>
  );
}

// ── Lead capture — embeds the GHL "Hand Over to John" form ────────────────
// The form is a cross-origin GHL iframe (it owns submission + John's workflow).
// We wrap it in a design-system card that flips with the site theme, pass the
// current theme (?cu) so the form's own custom CSS/JS can match it, remount it
// when the theme flips, and pass a short transcript (?conversation) that a
// hidden field in the form builder can receive.
function useSiteTheme() {
  const [theme, setTheme] = useState("dark");
  useEffect(() => {
    const read = () =>
      setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
    read();
    const obs = new MutationObserver(read);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);
  return theme;
}

function buildTranscript(messages) {
  return messages
    .filter((m) => (m.role === "user" || m.role === "assistant") && !m.error && m.content?.trim())
    .slice(-10)
    .map((m) => `${m.role === "user" ? "Client" : "Charles"}: ${m.content.trim()}`)
    .join("\n");
}

function LeadCapture({ messages }) {
  const [open, setOpen] = useState(false);
  const theme = useSiteTheme();

  if (!open) {
    return (
      <div className="mt-5 flex justify-center">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 rounded-full border border-cu-brandy/40 bg-cu-surface-vault px-4 py-2 text-sm font-medium text-cu-brandy transition-colors hover:bg-cu-surface-char"
        >
          <Send size={14} />
          Hand this to John
        </button>
      </div>
    );
  }

  const src = handoverFormSrc({ theme, conversation: buildTranscript(messages) });

  return (
    <div className="mt-5 overflow-hidden rounded-2xl border border-border bg-cu-surface-vault">
      <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-3.5">
        <div>
          <p className="text-sm font-medium text-foreground">Hand this to John</p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Leave your details and the team will follow up personally.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close"
          className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-cu-surface-char hover:text-foreground"
        >
          <X size={16} />
        </button>
      </div>
      <iframe
        key={theme}
        src={src}
        title={HANDOVER_FORM.name}
        id={`inline-${HANDOVER_FORM.id}`}
        data-layout="{'id':'INLINE'}"
        data-form-name={HANDOVER_FORM.name}
        data-height={String(HANDOVER_FORM.height)}
        data-layout-iframe-id={`inline-${HANDOVER_FORM.id}`}
        data-form-id={HANDOVER_FORM.id}
        data-trigger-type="alwaysShow"
        data-activation-type="alwaysActivated"
        data-deactivation-type="neverDeactivate"
        className="block w-full bg-cu-surface-vault"
        style={{ height: `${HANDOVER_FORM.height}px`, border: "none" }}
      />
      <Script src={`${ghlFormHost("handover")}/js/form_embed.js`} strategy="afterInteractive" />
    </div>
  );
}
