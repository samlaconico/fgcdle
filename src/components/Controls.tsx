import { inputList } from "@/data";

export default function Controls({
  disable,
  callback,
}: {
  disable: boolean;
  callback: (newInput: string) => void;
}) {
  return (
    <div>
      <div className="m-auto grid w-max grid-cols-3 content-around items-center justify-around justify-items-center gap-3 py-6">
        <DirectionButton callback={disable ? () => {} : callback}>
          7
        </DirectionButton>
        <DirectionButton callback={disable ? () => {} : callback}>
          8
        </DirectionButton>
        <DirectionButton callback={disable ? () => {} : callback}>
          9
        </DirectionButton>
        <DirectionButton callback={disable ? () => {} : callback}>
          4
        </DirectionButton>
        <DirectionButton callback={disable ? () => {} : callback}>
          5
        </DirectionButton>
        <DirectionButton callback={disable ? () => {} : callback}>
          6
        </DirectionButton>
        <DirectionButton callback={disable ? () => {} : callback}>
          1
        </DirectionButton>
        <DirectionButton callback={disable ? () => {} : callback}>
          2
        </DirectionButton>
        <DirectionButton callback={disable ? () => {} : callback}>
          3
        </DirectionButton>
      </div>
    </div>
  );
}

function DirectionButton({
  children,
  callback,
}: {
  children: string;
  callback: (newInput: string) => void;
}) {
  return (
    <div
      className="size-16 rounded-md bg-yellow-300 text-black transition-all hover:scale-110 hover:cursor-pointer md:size-20"
      onClick={() => {
        callback(children);
      }}
    >
      <div className="flex h-full w-full flex-col justify-center">
        <div className="flex flex-row justify-center">
          {inputList[Number(children)].icon}
        </div>
      </div>
    </div>
  );
}
