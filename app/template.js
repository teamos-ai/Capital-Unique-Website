"use client";

// template.js re-renders on every route change (unlike layout.js which
// persists). Used for subtle cross-page fade-up — adds polish without
// being noisy.

import { motion } from "motion/react";

export default function Template({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
