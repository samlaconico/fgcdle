import { SpecialsList } from "@/data";
import { NextResponse } from "next/server";

interface Special {
  name: string;
  image: string;
  input: string;
}

function shuffle(array: Special[], seed: number) {
  let m = array.length,
    t,
    i;

  while (m) {
    i = Math.floor(random(seed) * m--);

    t = array[m];
    array[m] = array[i];
    array[i] = t;
    ++seed;
  }

  return array;
}

function random(seed: number) {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

export async function GET() {
  const list = shuffle(SpecialsList, 1);
  return NextResponse.json(list);
}
