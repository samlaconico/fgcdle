import { motion } from "framer-motion";
import { useLayoutEffect, useRef } from "react";

type DialogueBoxProps = {
  header: string;
  body: string;
};

export default function DialogueBox({ header, body}: DialogueBoxProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  dialogRef.current?.showModal();
  useLayoutEffect(() => {
    dialogRef.current?.showModal()
    return () => {
      dialogRef.current?.close()
    }
  }, [])

  return (
    <motion.dialog
      ref={dialogRef}
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1 }}
      className="p-10 rounded-md bg-neutral-600 text-white"
    >
      <h1 className="mb-6 text-3xl font-bold">{header}</h1>

      <p className="text-xl">{body}</p>

      <button onClick={() => {dialogRef.current?.close()}} className="bg-neutral-300 text-black py-0.5 px-2 rounded-sm hover:scale-105 transition-all"> Close </button>
    </motion.dialog>
  );
}
