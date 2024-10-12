"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Controls from "./Controls";
import { SpecialsList } from "@/data/index";
import { inputList } from "@/data";

export default function Game() {
  const [current, setCurrent] = useState<number>(0);
  const [moveInput, setMoveInput] = useState<string>(
    SpecialsList[current].input,
  );
  const [input, setInput] = useState<string>();
  const [inputIcons, setInputIcons] = useState<JSX.Element[]>([]);
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
      setInputIcons([...inputIcons, inputList[+newInput].icon]);
    } else {
      setInput(newInput);
      setInputIcons([inputList[+newInput].icon]);
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
      <div className="flex flex-row m-auto justify-center mt-10">
        {inputIcons.map((value, index) => (
          <div key={index}>{value}</div>
        ))}
      </div>
      <Controls callback={addToInput} />
    </div>
  );
}
