export function div (val: number, by: number): number {
  return (val - val % by) / by
}
