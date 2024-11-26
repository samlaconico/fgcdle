"use client";

import MotionGame from "@/components/Game";
import Header from "@/components/Header";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="font-figtree">
      <Header />

      <motion.div
      >
        <MotionGame />
      </motion.div>
    </div>
  );
}
