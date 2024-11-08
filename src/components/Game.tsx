import { useEffect, useState } from "react";
import Controls from "./Controls";
import { inputList } from "@/data";
import { motion } from "framer-motion";
import { useAnimate } from "framer-motion";
import DialogueBox from "./DialogueBox";
import useLocalStorage from "@/hooks/useLocalStorage";

interface Special {
  name: string;
  image: string;
  input: string;
}

export default function MotionGame() {
  "use client";

  const [play, setPlay] = useLocalStorage("played", false);

  const [currentIndex, setCurrentIndex] = useState<number>(0); //current index of array
  const [moveInput, setMoveInput] = useState<string>("1"); //input of current move displayed
  const [input, setInput] = useState<string>(); //input of player
  const [inputIcons, setInputIcons] = useState<JSX.Element[]>([]);
  const [isLose, setIsLose] = useState<boolean>(play); //lose state
  const [scope, animate] = useAnimate();
  const [wrongGuesses, setWrongGuesses] = useState<number>(0); //number of incorrect guesses
  const [specialMove, setSpecialMove] = useState<Special[]>([
    { name: "", image: "", input: "" },
  ]);

  //check local storage
  useEffect(() => {}, []);

  //load data from api
  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api");
      const data = await res.json();

      setSpecialMove(data);
    }

    fetchData();
  }, []);

  //once special list is set, load current input into moveInput
  useEffect(() => {
    if (specialMove) {
      setMoveInput(specialMove[currentIndex].input);
    }
  }, [specialMove]);

  //go to next move
  const reset = async () => {
    animate("div", { opacity: 0, y: -50 }, { duration: 0.3 });
    await new Promise((resolve) => setTimeout(resolve, 400));
    setCurrentIndex(currentIndex + 1);
    animate("div", { opacity: 1, y: 0 }, { duration: 0.6, delay: 0.6 });

    setInput(undefined);
    setMoveInput(specialMove[currentIndex + 1].input);

    await new Promise((resolve) => setTimeout(resolve, 300));

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
          setPlay(true);
          setIsLose(true);
        }
      }
    }
  }, [input, moveInput]);

  return (
    <div className="m-auto h-min w-11/12 rounded-xl bg-neutral-700 px-8 py-6 text-center text-white md:w-1/2">
      <motion.div ref={scope} className="">
        <div className="flex aspect-auto h-[20vh] w-full flex-col py-4 md:h-72">
          <img
            className="m-auto h-fit w-auto md:h-full"
            src={specialMove[currentIndex].image}
          />
        </div>
      </motion.div>
      <div>
        <DialogueBox open={isLose} header="you lose ahah">
            <p className="mb-6 text-xl">you lose</p>
        </DialogueBox>
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
