import { inputList } from "@/data";

export default function Controls({
  callback,
}: {
  callback: (newInput : string) => void;
}) {
  return (
    <div>
      <div className="m-auto w-max grid grid-cols-3 content-around items-center justify-around justify-items-center gap-3 py-12">
        <DirectionButton callback={callback}>7</DirectionButton>
        <DirectionButton callback={callback}>8</DirectionButton>
        <DirectionButton callback={callback}>9</DirectionButton>
        <DirectionButton callback={callback}>4</DirectionButton>
        <DirectionButton callback={callback}>5</DirectionButton>
        <DirectionButton callback={callback}>6</DirectionButton>
        <DirectionButton callback={callback}>1</DirectionButton>
        <DirectionButton callback={callback}>2</DirectionButton>
        <DirectionButton callback={callback}>3</DirectionButton>
      </div>
    </div>
  );
}

function DirectionButton({
  children,
  callback,
}: {
  children: string;
  callback: (newInput : string) => void;
}) {
  return (
    <div
      className="size-16 rounded-3xl bg-yellow-300 text-black transition-all hover:scale-110 hover:cursor-pointer"
      onClick={() => {
        callback(children);
      }}
    >
      <div className="flex w-full h-full flex-col justify-center">
        <div className="flex flex-row justify-center">{inputList[Number(children)].icon}</div>
      </div>
    </div>
  );
}
