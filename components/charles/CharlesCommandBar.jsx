"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import {
  Search,
  Plus,
  Mic,
  ArrowUp,
  CornerDownLeft,
  Sparkles,
  Briefcase,
  Send,
  Calculator,
  GitCompareArrows,
  Layers,
} from "lucide-react";

// Slash actions Charles understands. Until the assistant is live,
// each one routes to the most useful existing destination.
const COMMANDS = [
  {
    cmd: "/deal",
    label: "Submit a deal",
    desc: "Outline a live deal for Capital Unique to review.",
    icon: Briefcase,
    href: "/contact",
  },
  {
    cmd: "/scenario",
    label: "Send a scenario to John",
    desc: "Describe a structure or what-if and get a considered view.",
    icon: Send,
    href: "/contact",
  },
  {
    cmd: "/calculate",
    label: "Run a calculator",
    desc: "Feasibility, DSCR, bridging cost, true cost of capital.",
    icon: Calculator,
    href: "/calculators",
  },
  {
    cmd: "/compare",
    label: "Compare funding options",
    desc: "Weigh structures side by side before you commit.",
    icon: GitCompareArrows,
    href: "/calculators/true-cost-of-capital",
  },
  {
    cmd: "/stack",
    label: "Structure a capital stack",
    desc: "Layer senior, mezzanine and equity for a project.",
    icon: Layers,
    href: "/contact",
  },
];

const CHIPS = [
  { text: "/deal bridging finance, settling in 3 weeks" },
  { text: "/scenario 18-unit residential development" },
  { text: "/calculate development feasibility" },
  { text: "/compare bridging vs term debt" },
  { text: "/stack construction — senior + mezzanine" },
];

export function CharlesCommandBar() {
  const router = useRouter();
  const inputRef = useRef(null);
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [active, setActive] = useState(0);
  const [response, setResponse] = useState(null);

  // The slash menu shows while focused and the field is empty or a "/…".
  const showMenu =
    focused && (query.trim() === "" || query.trim().startsWith("/")) && !response;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q === "" || q === "/") return COMMANDS;
    if (q.startsWith("/")) {
      const token = q.split(/\s+/)[0];
      return COMMANDS.filter(
        (c) => c.cmd.startsWith(token) || token.startsWith(c.cmd)
      );
    }
    return COMMANDS;
  }, [query]);

  function runCommandHref(text) {
    const token = text.trim().split(/\s+/)[0].toLowerCase();
    const match = COMMANDS.find((c) => c.cmd === token);
    return match ? match.href : null;
  }

  function submit(text) {
    const value = (text ?? query).trim();
    if (!value) return;
    const href = runCommandHref(value);
    if (href) {
      router.push(href);
      return;
    }
    // Free-form question — Charles isn't live yet, so respond honestly.
    setResponse(value);
  }

  function onKeyDown(e) {
    if (showMenu && filtered.length > 0) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((i) => (i + 1) % filtered.length);
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((i) => (i - 1 + filtered.length) % filtered.length);
        return;
      }
      if (e.key === "Enter" && query.trim().startsWith("/")) {
        e.preventDefault();
        router.push(filtered[Math.min(active, filtered.length - 1)].href);
        return;
      }
    }
    if (e.key === "Enter") {
      e.preventDefault();
      submit();
    }
    if (e.key === "Escape") {
      setResponse(null);
      setQuery("");
      inputRef.current?.blur();
    }
  }

  return (
    <div className="mx-auto mt-12 w-full max-w-2xl">
      <div className="relative rounded-2xl border border-border bg-cu-surface-vault shadow-xl shadow-black/5 dark:shadow-black/40">
        {/* Glow consistent with the rest of the site */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-40"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, var(--cu-brandy-darkest) 0%, transparent 65%)",
          }}
        />

        <AnimatePresence mode="wait">
          {response ? (
            <motion.div
              key="response"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative z-10 p-6 md:p-7"
            >
              <div className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cu-brandy-darkest text-cu-brandy">
                  <Sparkles size={16} />
                </span>
                <div>
                  <p className="text-sm text-muted-foreground">
                    You asked:{" "}
                    <span className="text-foreground">
                      &ldquo;{response}&rdquo;
                    </span>
                  </p>
                  <p className="mt-3 text-base leading-relaxed text-foreground">
                    Charles A.I is in active development. Until it&apos;s live,
                    John will take this directly — you&apos;ll get a considered
                    answer, not an auto-reply.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => router.push("/contact")}
                      className="inline-flex items-center gap-2 rounded-md bg-cu-brandy px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-cu-brandy-light"
                    >
                      Send this to John
                      <Send size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => router.push("/charles-ai/waitlist-confirmed")}
                      className="inline-flex items-center rounded-md border border-border bg-transparent px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-cu-surface-char"
                    >
                      Request early access
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setResponse(null);
                        setQuery("");
                        inputRef.current?.focus();
                      }}
                      className="inline-flex items-center px-2 py-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Ask something else
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="input"
              initial={false}
              className="relative z-10"
            >
              <div className="flex items-center gap-3 px-5 pt-5">
                <Search
                  size={18}
                  className="shrink-0 text-muted-foreground"
                />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setActive(0);
                  }}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setTimeout(() => setFocused(false), 120)}
                  onKeyDown={onKeyDown}
                  placeholder="Ask Charles, or type / for actions"
                  aria-label="Ask Charles A.I"
                  className="w-full bg-transparent py-1 text-base text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
                <kbd className="hidden shrink-0 rounded border border-border px-1.5 py-0.5 text-[11px] text-muted-foreground sm:block">
                  /
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
                    {filtered.map((c, i) => {
                      const Icon = c.icon;
                      const isActive = i === Math.min(active, filtered.length - 1);
                      return (
                        <li key={c.cmd}>
                          <button
                            type="button"
                            onMouseEnter={() => setActive(i)}
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => router.push(c.href)}
                            className={`flex w-full items-center gap-3.5 px-5 py-3 text-left transition-colors ${
                              isActive
                                ? "bg-cu-surface-char"
                                : "hover:bg-cu-surface-char/60"
                            }`}
                          >
                            <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cu-brandy-darkest text-cu-brandy">
                              <Icon size={16} strokeWidth={1.6} />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="flex items-baseline gap-2">
                                <span className="font-mono text-sm text-cu-brandy">
                                  {c.cmd}
                                </span>
                                <span className="truncate text-sm font-medium text-foreground">
                                  {c.label}
                                </span>
                              </span>
                              <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                                {c.desc}
                              </span>
                            </span>
                            {isActive && (
                              <CornerDownLeft
                                size={14}
                                className="shrink-0 text-muted-foreground"
                              />
                            )}
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
                  <span className="hidden text-xs sm:inline">
                    Attach a deal or scenario
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground">
                    <Mic size={16} />
                  </span>
                  <button
                    type="button"
                    onClick={() => submit()}
                    aria-label="Send to Charles"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-cu-brandy text-white transition-colors hover:bg-cu-brandy-light"
                  >
                    <ArrowUp size={17} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Quick-start chips */}
      <div className="mt-6 flex flex-wrap justify-center gap-2.5">
        {CHIPS.map((chip) => (
          <button
            key={chip.text}
            type="button"
            onClick={() => {
              setResponse(null);
              setQuery(chip.text);
              submit(chip.text);
            }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-cu-surface-vault px-3.5 py-1.5 text-xs text-muted-foreground transition-colors hover:border-cu-brandy/40 hover:text-foreground"
          >
            <span className="font-mono text-cu-brandy">
              {chip.text.split(" ")[0]}
            </span>
            <span className="truncate">
              {chip.text.split(" ").slice(1).join(" ")}
            </span>
          </button>
        ))}
      </div>

      <p className="mt-6 text-center text-xs text-muted-foreground">
        Charles A.I is in active development. Conversations are guided to John
        until launch — you always reach a person.
      </p>
    </div>
  );
}
