"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
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
  }, [input, moveInput]);

  return (
    <div className="m-auto my-32 text-center text-white">
      <div className="relative m-auto h-96 w-screen md:w-[50vw]">
        <Image
          src={SpecialsList[current].image}
          alt=""
          width="0"
          height="0"
          sizes="100vw"
          className="pointer-events-none relative m-auto h-full w-fit object-cover"
        />
      </div>
      <div>{isLose ? "you lose" : ""}</div>
      <div>{input ? input : "Input"}</div>
      <Controls callback={addToInput} />
    </div>
  );
}
