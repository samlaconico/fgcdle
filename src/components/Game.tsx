"use client";

import { useEffect, useState } from "react";
import Controls from "./Controls";
import { inputList } from "@/data";
import { motion } from "framer-motion";
import { useAnimate } from "framer-motion";
import DialogueBox from "./DialogueBox";

interface Special {
  name: string;
  image: string;
  input: string;
}

export default function MotionGame() {
  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api");
      const data = await res.json();

      setSp(data);
    }

    fetchData();
  }, []);

  const [sp, setSp] = useState<Special[]>([{ name: "", image: "", input: "" }]);

  useEffect(() => {
    if (sp) {
      setMoveInput(sp[current].input);
    }
  }, [sp]);

  const [current, setCurrent] = useState<number>(0);
  const [moveInput, setMoveInput] = useState<string>("1");
  const [input, setInput] = useState<string>();
  const [inputIcons, setInputIcons] = useState<JSX.Element[]>([]);
  const [isLose, setIsLose] = useState<boolean>(false);
  const [scope, animate] = useAnimate();
  const [wrongGuesses, setWrongGuesses] = useState<number>(0);

  const reset = async () => {
    animate("div", { opacity: 0, y: -50 }, { duration: 0.3 });
    await new Promise((resolve) => setTimeout(resolve, 300));
    setCurrent(current + 1);
    animate("div", { opacity: 1, y: 0 }, { duration: 0.6, delay: 0.6 });

    setInput(undefined);
    setMoveInput(sp[current + 1].input);

    await new Promise((resolve) => setTimeout(resolve, 300));
    console.log(sp);

    if (!isLose) {
      setInputIcons([]);
    }
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
        input.charAt(input.length - 1) != moveInput?.charAt(input.length - 1)
      ) {
        if (wrongGuesses < 3) {
          setWrongGuesses((wrongGuesses) => wrongGuesses + 1);
          reset();
        } else {
          setIsLose(true);
        }
      }
    }
  }, [input, moveInput]);

  if (!sp)
    return (
      <div>
        <motion.div ref={scope}>
          <div>Loading</div>
        </motion.div>
      </div>
    );

  return (
    <div className="m-auto my-12 px-8 text-center text-white md:my-32">
      <motion.div ref={scope} className="">
        <div className="flex aspect-auto h-[40vh] w-full flex-col md:h-96">
          <img
            className="m-auto h-fit w-auto md:h-full"
            src={sp[current].image}
          />
          <button onClick={reset}>next</button>
        </div>
      </motion.div>
      <div>
        {isLose ? (
          <DialogueBox header="you lose ahah">
            <p>you lose</p>
          </DialogueBox>
        ) : (
          ""
        )}
      </div>
      <div className="m-auto mb-10 mt-10 flex h-12 flex-row justify-center md:mb-0">
        {inputIcons.map((value, index) => (
          <div key={index}>{value}</div>
        ))}
      </div>
      {sp[current].name}
      {wrongGuesses}
      <Controls callback={addToInput} />
    </div>
  );
}

export function StageGame() {
  return <div></div>;
}
