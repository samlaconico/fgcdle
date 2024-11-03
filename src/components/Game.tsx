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
  const [current, setCurrent] = useState<number>(0); //current index of array
  const [moveInput, setMoveInput] = useState<string>("1"); //input of current move displayed
  const [input, setInput] = useState<string>(); //input of player
  const [inputIcons, setInputIcons] = useState<JSX.Element[]>([]);
  const [isLose, setIsLose] = useState<boolean>(false); //lose state
  const [scope, animate] = useAnimate();
  const [wrongGuesses, setWrongGuesses] = useState<number>(0); //number of incorrect guesses

  //load data from api
  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api");
      const data = await res.json();

      setSp(data);
    }

    fetchData();
  }, []);

  const [sp, setSp] = useState<Special[]>([{ name: "", image: "", input: "" }]);

  //once special list is set, load current input into moveInput
  useEffect(() => {
    if (sp) {
      setMoveInput(sp[current].input);
    }
  }, [sp]);

  //go to next move
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

  //wrong input
  if (input == moveInput) {
    reset();
  }

  //add last input to the input
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

  //when input is changed, check to see if it's wrong
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
        <div className="flex aspect-auto h-[20vh] w-full flex-col md:h-44">
          <img
            className="m-auto h-fit w-auto md:h-full"
            src={sp[current].image}
          />
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
      <Controls callback={addToInput} />
    </div>
  );
}

export function StageGame() {
  return <div></div>;
}
