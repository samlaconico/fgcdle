import { SpecialsList } from "@/data";
import { NextRequest, NextResponse } from "next/server";

interface Special {
  name: string;
  image: string;
  input: string;
}

function shuffle( array: Special[], seed: number ) {
  var m = array.length,
    t,
    i;

  while (m) {
    i = Math.floor(random(seed) * m--); // <-- MODIFIED LINE

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
    ++seed; // <-- ADDED LINE
  }

  return array;
}

function random(seed: number ) {
  var x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

export async function GET(request: NextRequest) {

    const list = shuffle(SpecialsList, 1);
  return NextResponse.json(list);
}
