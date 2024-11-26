export function useSeededDate(): number {
  const today = new Date();
  const seed = "" + today.getUTCDate() + today.getDay() + today.getMonth();

  return +seed;
}
