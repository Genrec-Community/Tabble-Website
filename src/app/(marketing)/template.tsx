"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Page-transition template — remounts on every navigation so entrance
 * choreography replays, with a calm fade/slide like the old PageSwitcher.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? undefined : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: [0.2, 0, 0, 1] }}
      className="flex flex-1 flex-col"
    >
      {children}
    </motion.div>
  );
}
