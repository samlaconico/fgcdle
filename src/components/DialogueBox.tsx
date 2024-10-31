import { motion } from "framer-motion";
import { useLayoutEffect, useRef } from "react";

type DialogueBoxProps = {
  header: string;
  children: React.ReactNode;
};

export default function DialogueBox({ header, children }: DialogueBoxProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  dialogRef.current?.showModal();
  useLayoutEffect(() => {
    dialogRef.current?.showModal();
    return () => {
      dialogRef.current?.close();
    };
  }, []);

  return (
    <motion.dialog
      ref={dialogRef}
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1 }}
      className="rounded-md bg-neutral-600 p-10 text-white"
    >
      <h1 className="mb-6 text-3xl font-bold">{header}</h1>

      <p className="mb-6 text-xl">{children}</p>

      <button
        onClick={() => {
          dialogRef.current?.close();
        }}
        className="rounded-sm bg-neutral-300 px-2 py-0.5 text-black transition-all hover:scale-105"
      >
        Close
      </button>
    </motion.dialog>
  );
}
