"use client"

import { motion } from "framer-motion";
import { useLayoutEffect, useRef } from "react";

type DialogueBoxProps = {
  header: string;
  children: React.ReactNode;
  open: boolean
};

export default function DialogueBox({ header, children, open}: DialogueBoxProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  open ? dialogRef.current?.showModal() : dialogRef.current?.close();
  useLayoutEffect(() => {
    const ref = dialogRef;
    ref.current?.showModal();
    return () => {
      ref.current?.close();
    };
  }, [dialogRef]);

  return (
    <motion.dialog
      ref={dialogRef}
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="rounded-md bg-neutral-600 p-10 text-white"
    >
      <h1 className="mb-6 text-3xl font-bold">{header}</h1>

      {children}

      <button
        onClick={() => {
          dialogRef.current?.close();
        }}
        className="rounded-sm bg-neutral-300 px-2 py-0.5 text-black transition-transform hover:bg-neutral-400"
      >
        Close
      </button>
    </motion.dialog>
  );
}
