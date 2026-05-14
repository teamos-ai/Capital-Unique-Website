"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Menu, X } from "lucide-react";
import { PRIMARY_NAV, PRIMARY_CTA } from "@/lib/nav";

const SCROLL_THRESHOLD = 24;

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef(null);

  // Scroll listener for shrink/float behavior
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onScroll = () => setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Click-outside for mobile drawer
  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Escape closes desktop dropdown + mobile drawer
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onEscape = (e) => {
      if (e.key === "Escape") {
        setOpenDropdown(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener("keydown", onEscape);
    return () => document.removeEventListener("keydown", onEscape);
  }, []);

  // Lock body scroll when mobile drawer open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <div
      className={`sticky top-0 z-50 w-full transition-all duration-300 ease-out ${
        isScrolled ? "px-4 pt-3 lg:px-6 lg:pt-4" : "px-0 pt-0"
      }`}
    >
      <header
        className={`mx-auto transition-all duration-300 ease-out ${
          isScrolled
            ? "max-w-5xl rounded-2xl border border-border bg-background/85 shadow-2xl shadow-black/30 backdrop-blur-xl"
            : "w-full max-w-none rounded-none border-b border-border/60 bg-background/80 backdrop-blur-md"
        }`}
      >
        <div
          className={`flex items-center justify-between gap-6 transition-all duration-300 ease-out ${
            isScrolled
              ? "px-5 py-2.5 lg:px-6"
              : "mx-auto max-w-7xl px-6 py-4 lg:px-10"
          }`}
        >
          {/* Logo */}
          <Link
            href="/"
            aria-label="Capital Unique home"
            className="relative inline-flex items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cu-brandy-light focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <Image
              src="/brand/logo-horizontal.png"
              alt="Capital Unique"
              width={160}
              height={32}
              priority
              className={`w-auto object-contain transition-all duration-300 ease-out ${
                isScrolled ? "h-7" : "h-8 md:h-9"
              }`}
            />
          </Link>

          {/* Desktop nav */}
          <nav
            className="hidden lg:flex items-center gap-1"
            aria-label="Primary"
          >
            {PRIMARY_NAV.map((item) => (
              <DesktopNavItem
                key={item.label}
                item={item}
                isOpen={openDropdown === item.label}
                onOpen={() => setOpenDropdown(item.label)}
                onClose={() => setOpenDropdown(null)}
              />
            ))}
          </nav>

          {/* Right: CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <Link
              href={PRIMARY_CTA.href}
              className={`hidden lg:inline-flex items-center rounded-md bg-cu-brandy text-white shadow-sm hover:bg-cu-brandy-light transition-all ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cu-brandy-light focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                isScrolled ? "px-4 py-2 text-sm" : "px-5 py-2.5 text-sm"
              } font-medium`}
            >
              {PRIMARY_CTA.label}
            </Link>
            <button
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground hover:bg-cu-surface-vault transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cu-brandy-light"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              ref={menuRef}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className={`lg:hidden border-t border-border ${
                isScrolled ? "rounded-b-2xl" : ""
              } bg-background`}
            >
              <nav
                aria-label="Mobile primary"
                className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-6"
              >
                {PRIMARY_NAV.map((item) => (
                  <MobileNavItem
                    key={item.label}
                    item={item}
                    onNavigate={() => setMobileOpen(false)}
                  />
                ))}
                <Link
                  href={PRIMARY_CTA.href}
                  onClick={() => setMobileOpen(false)}
                  className="mt-4 inline-flex items-center justify-center rounded-md bg-cu-brandy px-4 py-3 text-sm font-medium text-white"
                >
                  {PRIMARY_CTA.label}
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </div>
  );
}

function DesktopNavItem({ item, isOpen, onOpen, onClose }) {
  const wrapperRef = useRef(null);

  // If focus moves outside the wrapper entirely, close the menu.
  // (Used when user tabs out of the button or its panel.)
  const handleBlurWithin = (e) => {
    if (!wrapperRef.current) return;
    if (!wrapperRef.current.contains(e.relatedTarget)) {
      onClose();
    }
  };

  if (!item.children) {
    return (
      <Link
        href={item.href}
        className="rounded-md px-3 py-2 text-sm font-medium text-foreground/85 hover:text-foreground hover:bg-cu-surface-vault transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cu-brandy-light"
      >
        {item.label}
      </Link>
    );
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      isOpen ? onClose() : onOpen();
    } else if (e.key === "ArrowDown" && !isOpen) {
      e.preventDefault();
      onOpen();
    }
  };

  return (
    <div
      ref={wrapperRef}
      className="relative"
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
      onFocus={onOpen}
      onBlur={handleBlurWithin}
    >
      <button
        type="button"
        className="inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-foreground/85 hover:text-foreground hover:bg-cu-surface-vault transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cu-brandy-light"
        aria-expanded={isOpen}
        aria-haspopup="true"
        onClick={() => (isOpen ? onClose() : onOpen())}
        onKeyDown={handleKeyDown}
      >
        {item.label}
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.18 }}
          className="inline-flex"
        >
          <ChevronDown size={14} />
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.18 }}
            className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3"
            role="menu"
          >
            <div
              className={`rounded-xl border border-border bg-cu-surface-vault p-2 shadow-2xl shadow-black/40 backdrop-blur-xl ${
                item.children.length > 4 ? "w-[640px]" : "min-w-[300px]"
              }`}
            >
              <div
                className={`grid gap-1 ${
                  item.children.length > 4 ? "grid-cols-2" : "grid-cols-1"
                }`}
              >
                {item.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    role="menuitem"
                    className="flex flex-col gap-0.5 rounded-md px-3 py-2.5 text-sm text-foreground/85 hover:text-foreground hover:bg-cu-surface-char transition-colors focus-visible:outline-none focus-visible:bg-cu-surface-char focus-visible:ring-2 focus-visible:ring-cu-brandy-light"
                  >
                    <span className="font-medium">{child.label}</span>
                    {child.description && (
                      <span className="text-xs text-muted-foreground">
                        {child.description}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileNavItem({ item, onNavigate }) {
  const [open, setOpen] = useState(false);

  if (!item.children) {
    return (
      <Link
        href={item.href}
        onClick={onNavigate}
        className="rounded-md px-3 py-3 text-base font-medium text-foreground/90 hover:bg-cu-surface-vault focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cu-brandy-light"
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div className="flex flex-col">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-between rounded-md px-3 py-3 text-base font-medium text-foreground/90 hover:bg-cu-surface-vault focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cu-brandy-light"
        aria-expanded={open}
      >
        {item.label}
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.18 }}>
          <ChevronDown size={16} />
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="ml-3 flex flex-col border-l border-border pl-3 py-1">
              {item.children.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  onClick={onNavigate}
                  className="rounded-md px-3 py-2 text-sm text-foreground/80 hover:text-foreground hover:bg-cu-surface-vault focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cu-brandy-light"
                >
                  {child.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
