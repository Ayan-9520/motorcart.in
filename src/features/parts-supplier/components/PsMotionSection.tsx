import { motion } from "framer-motion";
import type { ReactNode } from "react";

const fadeUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
};

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function PsMotionSection({ children, className, delay = 0 }: Props) {
  return (
    <motion.section
      className={className}
      initial={fadeUp.initial}
      animate={fadeUp.animate}
      transition={{ duration: 0.35, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.section>
  );
}
