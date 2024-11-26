"use client";

import { useEffect, useState } from "react";
import Controls from "./Controls";
import { SpecialsList, inputList } from "@/data";
import { motion } from "framer-motion";
import { useAnimate } from "framer-motion";
import DialogueBox from "./DialogueBox";
import { usePersistedState } from "@/hooks/usePersistedState";
import { MdClose } from "react-icons/md";
import { useSeededDate } from "@/hooks/useSeededDate";
import { shuffle } from "@/utils/shuffle";

interface Special {
  name: string;
  image: string;
  input: string;
}

export default function MotionGame() {
  //use hook to create data in local storage
  const [gameDataState, setGameDataState] = usePersistedState("gameData", {
    hasPlayed: false,
    wrong: 0,
    currentGuess: 0,
    guesses: ["", "", "", "", "", ""],
    lastDate: 0,
  });

  const [playerInput, setPlayerInput] = useState<string>(""); //current input of the player
  const [loaded, setLoaded] = useState(false); //loaded variable to prevent hydration error

  //load list for special moves using todays date as the seed
  const [specialList, setSpecialList] = useState(
    shuffle(SpecialsList, useSeededDate()),
  );

  useEffect(() => {
    if (gameDataState.lastDate != useSeededDate()) {
      setGameDataState((prev) => ({
        ...prev,
        hasPlayed: false,
        wrong: 0,
        currentGuess: 0,
        guesses: ["", "", "", "", "", ""],
        lastDate: useSeededDate(),
      }));
    }

    setLoaded(true);
    return () => {};
  }, []);

  console.log(specialList);

  useEffect(() => {
    if (
      playerInput.charAt(playerInput.length - 1) !=
      specialList[gameDataState.currentGuess].input.charAt(
        playerInput.length - 1,
      )
    ) {
      console.log("wrong");
      setGameDataState((prev) => ({
        ...prev,
        wrong: prev.wrong + 1,
        currentGuess: prev.currentGuess + 1,
      }));
      setPlayerInput("");
    } else if (
      playerInput.length == specialList[gameDataState.currentGuess].input.length
    ) {
      setGameDataState((prev) => ({
        ...prev,
        currentGuess: prev.currentGuess + 1,
      }));
      setPlayerInput("");
      console.log("correct!");
    }
  }, [playerInput]);

  const onInput = (input: string) => {
    setPlayerInput((prev) => prev.concat(input));
    /*setGameDataState((prev) => ({
      ...prev,
      currentGuess: prev.currentGuess + 1,
    }));*/
  };

  return loaded ? (
    <div className="m-auto h-min w-11/12 rounded-xl bg-neutral-700 px-8 py-6 text-center text-white md:w-1/2">
      <div className="flex aspect-auto h-[20vh] w-full flex-col py-4 md:h-72">
        <img
          className="m-auto h-fit w-auto md:h-full"
          src={specialList[gameDataState.currentGuess].image}
        />
      </div>
      <h1>{gameDataState.currentGuess}</h1>
      <h1>{playerInput}</h1>
      <Controls disable={gameDataState.hasPlayed} callback={onInput} />
    </div>
  ) : (
    <div className="m-auto text-center text-4xl text-white">
      {" "}
      <h1 className="">Loading...</h1>{" "}
    </div>
  );
}
