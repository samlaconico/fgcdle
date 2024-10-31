"use client";

import MotionGame from "@/components/Game";
import Header from "@/components/Header";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div>
      <Header />

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className=""
      >
        <MotionGame />
      </motion.div>
    </div>
  );
}
