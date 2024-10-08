"use client";

import Image from "next/image";
import { use, useEffect, useState } from "react";
import Controls from "./Controls";
import { SpecialsList } from "@/data/index";

export default function Game() {
  const [current, setCurrent] = useState<number>(0);
  const [moveInput, setMoveInput] = useState<string>(
    SpecialsList[current].input,
  );
  const [input, setInput] = useState<string>();
  const [isLose, setIsLose] = useState<boolean>(false);

  const reset = () => {
    setCurrent(current + 1);
    setInput(undefined);
    setMoveInput(SpecialsList[current + 1].input);
  };

  const clearInput = () => {
    setInput(undefined);
  };

  if (input == moveInput) {
    reset();
  }

  const addToInput = (newInput: string) => {
    if (input != undefined) {
      setInput(`${input}${newInput}`);
    } else {
      setInput(newInput);
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
  }, [input]);

  return (
    <div className="m-auto text-center text-white my-32">
      
      <div className="w-screen md:w-[50vw] h-96 relative m-auto">
      <Image
        src={SpecialsList[current].image}
        alt=""
        width="0"
        height="0"
        sizes="100vw"
        className="w-fit h-full object-cover pointer-events-none relative m-auto"
      />
      </div>
      <div>{isLose ? "you lose" : ""}</div>
      <div>{input ? input : "Input"}</div>
      <Controls callback={addToInput} clearInput={clearInput} />
    </div>
  );
}
