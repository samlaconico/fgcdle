interface Special {
  name: string;
  image: string;
  input: string;
}

export function shuffle(array: Special[], seed: number) {
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

  return array.splice(0, 5);
}

function random(seed: number) {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}
