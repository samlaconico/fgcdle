"use client";

import { useEffect, useState } from "react";
import Controls from "./Controls";
import { SpecialsList } from "@/data/index";
import { inputList } from "@/data";
import { motion } from "framer-motion";
import { useAnimate } from "framer-motion";

export default function Game() {
  const [current, setCurrent] = useState<number>(0);
  const [moveInput, setMoveInput] = useState<string>(
    SpecialsList[current].input,
  );
  const [input, setInput] = useState<string>();
  const [inputIcons, setInputIcons] = useState<JSX.Element[]>([]);
  const [isLose, setIsLose] = useState<boolean>(false);
  const [scope, animate] = useAnimate();

  const reset = async () => {
    animate("div", { opacity: 0, y: -50 }, { duration: 0.3 });
    await new Promise((resolve) => setTimeout(resolve, 300));
    setCurrent(current + 1);
    animate("div", { opacity: 1, y: 0 }, { duration: 0.3, delay: 0.1 });

    setInput(undefined);
    setMoveInput(SpecialsList[current + 1].input);
  };

  if (input == moveInput) {
    reset();
  }

  const addToInput = (newInput: string) => {
    if (newInput != "5") {
      if (input != undefined) {
        setInput(`${input}${newInput}`);
        setInputIcons([...inputIcons, inputList[+newInput].icon]);
      } else {
        setInput(newInput);
        setInputIcons([inputList[+newInput].icon]);
      }
    }
  };

  useEffect(() => {
    if (input != undefined) {
      if (
        input.charAt(input.length - 1) != moveInput.charAt(input.length - 1)
      ) {
        setIsLose(true);
      }
    }
  }, [input, moveInput]);

  return (
    <div className="m-auto my-32 text-center text-white">
      <motion.div ref={scope} className="">
        <div className="h-96">
          <img className="m-auto h-full" src={SpecialsList[current].image}/>
        </div>
      </motion.div>
      <div>{isLose ? "you lose" : ""}</div>
      <div className="m-auto mt-10 flex h-12 flex-row justify-center">
        {inputIcons.map((value, index) => (
          <div key={index}>{value}</div>
        ))}
      </div>
      <Controls callback={addToInput} />
    </div>
  );
}
