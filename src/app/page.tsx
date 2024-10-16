"use client";

import Game from "@/components/Game";
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
        <Game />
      </motion.div>
    </div>
  );
}
