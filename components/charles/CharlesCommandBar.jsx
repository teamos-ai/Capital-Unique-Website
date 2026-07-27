"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Search,
  Plus,
  ArrowUp,
  CornerDownLeft,
  Sparkles,
  Briefcase,
  Send,
  Calculator,
  GitCompareArrows,
  Layers,
  Loader2,
  Check,
} from "lucide-react";

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

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
          <div className="flex items-center gap-3 px-5 pt-5">
            <Search size={18} className="shrink-0 text-muted-foreground" />
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setTimeout(() => setFocused(false), 120)}
              onKeyDown={onKeyDown}
              placeholder={started ? "Reply to Charles, or type / for actions" : "Ask Charles, or type / for actions"}
              aria-label="Ask Charles A.I"
              className="w-full bg-transparent py-1 text-base text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            <kbd className="hidden shrink-0 rounded border border-border px-1.5 py-0.5 text-[11px] text-muted-foreground sm:block">/</kbd>
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
      <div className="max-w-[85%] rounded-2xl rounded-br-md bg-cu-brandy px-4 py-2.5 text-sm leading-relaxed text-white">
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
      <div className="max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-tl-md bg-cu-surface-char px-4 py-2.5 text-sm leading-relaxed text-foreground/90">
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

// ── Lead capture ─────────────────────────────────────────────────────────
function LeadCapture({ messages }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [state, setState] = useState("idle"); // idle | submitting | done | error

  const valid = name.trim() && EMAIL_RE.test(email.trim()) && consent;

  async function submit(e) {
    e.preventDefault();
    if (!valid || state === "submitting") return;
    setState("submitting");
    const firstUser = messages.find((m) => m.role === "user")?.content || "";
    try {
      const res = await fetch("/api/charles/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), messages, summary: firstUser.slice(0, 300) }),
      });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div className="mt-5 flex items-center gap-3 rounded-2xl border border-cu-brandy/40 bg-cu-brandy-darkest px-5 py-4 text-sm text-cu-brandy-lighter">
        <Check size={18} className="shrink-0" />
        <span>You&apos;re in — the team will be in touch personally. Thanks for the detail.</span>
      </div>
    );
  }

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

  return (
    <form onSubmit={submit} className="mt-5 rounded-2xl border border-border bg-cu-surface-vault p-5">
      <p className="text-sm font-medium text-foreground">Leave your details and the team will follow up.</p>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          aria-label="Your name"
          className="rounded-md border border-border bg-input-background px-3.5 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-cu-brandy-light"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          aria-label="Email address"
          className="rounded-md border border-border bg-input-background px-3.5 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-cu-brandy-light"
        />
      </div>
      <label className="mt-3 flex cursor-pointer items-start gap-2.5 text-xs leading-relaxed text-muted-foreground">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 h-3.5 w-3.5 shrink-0 accent-cu-brandy"
        />
        <span>By sending this, you agree the team may contact you about your enquiry. Your chat is shared with the team so they can help.</span>
      </label>
      {state === "error" && (
        <p className="mt-3 text-xs text-[oklch(0.7_0.15_25)]">
          That didn&apos;t go through. Try again, or email hello@capitalunique.com directly.
        </p>
      )}
      <div className="mt-4 flex items-center gap-3">
        <button
          type="submit"
          disabled={!valid || state === "submitting"}
          className="inline-flex items-center gap-2 rounded-md bg-cu-brandy px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-cu-brandy-light disabled:opacity-40"
        >
          {state === "submitting" ? <Loader2 size={15} className="animate-spin" /> : <Send size={15} />}
          Send to the team
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          Not yet
        </button>
      </div>
    </form>
  );
}
