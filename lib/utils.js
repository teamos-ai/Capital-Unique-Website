// Tiny `cn` (className join) helper. Mirrors the clsx/twMerge API enough
// for the shadcn-style components we use, without adding the runtime
// dependency. Accepts strings, arrays and falsy values; collapses to a
// single space-separated string.
export function cn(...inputs) {
  return inputs.flat(Infinity).filter(Boolean).join(" ");
}
